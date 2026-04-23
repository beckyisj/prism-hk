import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1zKolQNmY8g_oDPBPiiQLmFeNC6KFmz7xXCNgBvAtWhY";

function loadServiceAccount() {
  const b64 = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_B64;
  if (!b64) throw new Error("GOOGLE_SHEETS_SERVICE_ACCOUNT_B64 is not set");
  const json = Buffer.from(b64, "base64").toString("utf-8");
  return JSON.parse(json);
}

export function getSheetsClient() {
  const sa = loadServiceAccount();
  const auth = new google.auth.JWT({
    email: sa.client_email,
    key: sa.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function readRange(range: string): Promise<string[][]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range });
  return (res.data.values as string[][]) || [];
}

export async function updateCell(sheetName: string, row: number, column: string, value: string | boolean): Promise<void> {
  const sheets = getSheetsClient();
  const range = `${sheetName}!${column}${row}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[String(value)]] },
  });
}

export async function appendRow(sheetName: string, values: (string | number | boolean)[]): Promise<void> {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values.map(String)] },
  });
}

export async function findColumnLetter(sheetName: string, header: string): Promise<string | null> {
  const rows = await readRange(`${sheetName}!1:1`);
  const headers = rows[0] || [];
  const idx = headers.findIndex((h) => h.toLowerCase().trim() === header.toLowerCase().trim());
  if (idx < 0) return null;
  let n = idx;
  let s = "";
  while (n >= 0) {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}

export async function ensureColumn(sheetName: string, header: string): Promise<string> {
  const existing = await findColumnLetter(sheetName, header);
  if (existing) return existing;
  const sheets = getSheetsClient();
  const row = (await readRange(`${sheetName}!1:1`))[0] || [];
  const newCol = row.length;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!${colIndexToLetter(newCol)}1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[header]] },
  });
  return colIndexToLetter(newCol);
}

function colIndexToLetter(n: number): string {
  let s = "";
  while (n >= 0) {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}
