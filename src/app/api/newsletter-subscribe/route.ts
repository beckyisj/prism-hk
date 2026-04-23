import { NextRequest, NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/sheets-auth";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1zKolQNmY8g_oDPBPiiQLmFeNC6KFmz7xXCNgBvAtWhY";
const TAB = "Newsletter Subscribers";

async function ensureTab() {
  const sheets = getSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const exists = meta.data.sheets?.some((s) => s.properties?.title === TAB);
  if (exists) return;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { requests: [{ addSheet: { properties: { title: TAB } } }] },
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [["Email", "Subscribed At", "Source"]] },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await ensureTab();

    const sheets = getSheetsClient();
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${TAB}!A:A`,
    });
    const emails = (existing.data.values || []).flat().map((e) => String(e).toLowerCase().trim());
    if (emails.includes(email.toLowerCase().trim())) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${TAB}!A:C`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[email, new Date().toISOString(), source || "footer"]] },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
