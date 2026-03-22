"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

type TripActionsProps = {
  bookingId: string;
  currentStatus: string;
};

export default function TripActions({
  bookingId,
  currentStatus,
}: TripActionsProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");

  async function updateStatus(nextStatus: string) {
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("bookings")
      .update({ booking_status: nextStatus })
      .eq("id", bookingId);

    if (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    setStatus(nextStatus);
    setMessage(`Status updated to ${nextStatus}.`);
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => updateStatus("In Progress")}
          disabled={loading || status === "In Progress" || status === "Completed"}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && status !== "Completed" ? "Updating..." : "Start Trip"}
        </button>

        <button
          type="button"
          onClick={() => updateStatus("Completed")}
          disabled={loading || status === "Completed"}
          className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && status === "Completed" ? "Updating..." : "Complete Trip"}
        </button>
      </div>

      {message && <p className="text-xs text-slate-600">{message}</p>}
    </div>
  );
}