"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TripActionsProps = {
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

export default function TripActions({
  bookingId,
  currentStatus,
}: TripActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setLoading(true);

    const { error } = await supabase
    .from("bookings")
    .update({
      booking_status: newStatus,
    })
    .eq("id", bookingId);

    setLoading(false);

    if (error) {
      alert("Failed to update status: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="space-y-2">
      {statusOptions.map((status) => (
        <button
          key={status}
          type="button"
          disabled={loading || status === currentStatus}
          onClick={() => updateStatus(status)}
          className={`block w-full rounded-lg px-4 py-2 text-sm font-semibold ${
            status === currentStatus
              ? "bg-slate-200 text-slate-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : status}
        </button>
      ))}
    </div>
  );
}