"use client";

import { useState } from "react";

type SyncResult = {
  success: boolean;
  listings?: {
    rows_processed: number;
    rows_upserted: number;
    errors: { row: number; error: string }[];
    duration_ms: number;
  };
  error?: string;
};

export default function AdminSyncPage() {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "syncing" | "done" | "error">("idle");
  const [result, setResult] = useState<SyncResult | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  async function handleSync() {
    if (!secret) return;
    setStatus("syncing");
    setResult(null);
    setLog([]);
    addLog("Starting sync...");
    addLog("Fetching sheets & upserting to Supabase...");

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({}),
      });

      const data: SyncResult = await res.json();
      setResult(data);

      if (data.success && data.listings) {
        const l = data.listings;
        addLog(`Processed ${l.rows_processed} rows from Google Sheets`);
        addLog(`Upserted ${l.rows_upserted} listings to Supabase`);
        if (l.errors.length > 0) {
          addLog(`${l.errors.length} error(s):`);
          l.errors.forEach((e) => addLog(`  Row ${e.row}: ${e.error}`));
        }
        addLog(`Done in ${(l.duration_ms / 1000).toFixed(1)}s`);
        setStatus("done");
      } else {
        addLog(`Error: ${data.error || "Unknown error"}`);
        setStatus("error");
      }
    } catch (err) {
      addLog(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-3xl font-bold mb-2">Sync Dashboard</h1>
      <p className="text-sm text-[#6B6890] mb-8">
        Sync listings from Google Sheets to Supabase. This will update all
        directory, testing services, and emergency services data.
      </p>

      {/* Secret input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1E1B3A] mb-1">
          Sync Secret
        </label>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter sync secret"
          className="w-full px-4 py-2.5 bg-white border border-[#E8E6F0] rounded-xl text-sm focus:outline-none focus:border-[#7B68EE] focus:ring-1 focus:ring-[#7B68EE]"
        />
      </div>

      {/* Sync button */}
      <button
        onClick={handleSync}
        disabled={!secret || status === "syncing"}
        className={`w-full px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all ${
          status === "syncing"
            ? "bg-[#A78BFA] cursor-wait"
            : status === "done"
              ? "bg-[#22C55E] hover:bg-[#16A34A]"
              : status === "error"
                ? "bg-[#EF4444] hover:bg-[#DC2626]"
                : "bg-[#7B68EE] hover:bg-[#6B5CE7]"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === "syncing"
          ? "Syncing..."
          : status === "done"
            ? "Sync Complete — Run Again?"
            : status === "error"
              ? "Sync Failed — Retry?"
              : "Run Sync"}
      </button>

      {/* Progress / Results */}
      {log.length > 0 && (
        <div className="mt-6 bg-[#1E1B3A] rounded-xl p-4 font-mono text-xs leading-relaxed overflow-auto max-h-80">
          {log.map((line, i) => (
            <div
              key={i}
              className={
                line.includes("Error") || line.includes("error")
                  ? "text-red-400"
                  : line.includes("Done")
                    ? "text-green-400"
                    : "text-gray-300"
              }
            >
              {line}
            </div>
          ))}
          {status === "syncing" && (
            <div className="text-[#A78BFA] animate-pulse">...</div>
          )}
        </div>
      )}

      {/* Summary card */}
      {result?.success && result.listings && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#E8E6F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#7B68EE]">
              {result.listings.rows_processed}
            </div>
            <div className="text-xs text-[#6B6890] mt-1">Rows Processed</div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8E6F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#22C55E]">
              {result.listings.rows_upserted}
            </div>
            <div className="text-xs text-[#6B6890] mt-1">Upserted</div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8E6F0] p-4 text-center">
            <div className="text-2xl font-bold text-[#1E1B3A]">
              {(result.listings.duration_ms / 1000).toFixed(1)}s
            </div>
            <div className="text-xs text-[#6B6890] mt-1">Duration</div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 text-xs text-[#6B6890] space-y-1">
        <p>Auto-sync runs daily at 6:00 AM HKT via Vercel cron.</p>
        <p>
          Google Sheet:{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1zKolQNmY8g_oDPBPiiQLmFeNC6KFmz7xXCNgBvAtWhY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7B68EE] hover:underline"
          >
            Open Sheet
          </a>
        </p>
      </div>
    </div>
  );
}
