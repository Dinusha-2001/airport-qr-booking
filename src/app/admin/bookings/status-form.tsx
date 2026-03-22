"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

type StatusFormProps = {
  bookingId: string;
  currentStatus: string;
};

const statusOptions = [
  "Pending",
  "Accepted",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function StatusForm({
  bookingId,
  currentStatus,
}: StatusFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("bookings")
      .update({
        booking_status: status,
      })
      .eq("id", bookingId);

    if (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage("Status updated successfully.");
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>

      {message && (
        <p className="text-xs text-slate-600">{message}</p>
      )}
    </div>
  );
}