import DriverSidebar from "@/components/DriverSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";
import TripActions from "./trip-actions";
import { getBusinessSettings } from "@/lib/business-settings";

function getStatusClasses(status: string) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Accepted":
      return "bg-blue-100 text-blue-700";
    case "In Progress":
      return "bg-purple-100 text-purple-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

type BookingRow = {
  id: string;
  booking_reference: string;
  customer_name: string;
  selected_package: string;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  drop_location: string;
  whatsapp_number: string;
  booking_status: string;
  total_price: number;
  notes: string | null;
  created_at: string;
};

export default async function DriverBookingsPage() {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .neq("booking_status", "Cancelled")
    .order("created_at", { ascending: false });

  const bookings: BookingRow[] = data ?? [];
  const settings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Driver / Bookings
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            My Bookings
          </h1>
          <p className="mt-3 text-slate-600">
            This page now loads real booking data from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <DriverSidebar />
          </div>

          <div className="space-y-4 lg:col-span-3">
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load bookings: {error.message}
              </div>
            )}

            {!error && bookings.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                No bookings found.
              </div>
            )}

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {booking.booking_reference}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-900">
                      {booking.customer_name}
                    </h3>
                    <p className="mt-2 text-slate-600">{booking.selected_package}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {booking.pickup_date} at {booking.pickup_time}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">From:</span>{" "}
                      {booking.pickup_location}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">To:</span>{" "}
                      {booking.drop_location}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
                      {booking.whatsapp_number}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Price:</span>{" "}
                      LKR {Number(booking.total_price).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 xl:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        booking.booking_status
                      )}`}
                    >
                      {booking.booking_status}
                    </span>

                    <div className="space-y-3">
                    <a
                        href={`/driver/bookings/${booking.id}`}
                        className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                        View
                    </a>

                    <TripActions
                        bookingId={booking.id}
                        currentStatus={booking.booking_status}
                    />

                    <a
                        href={`https://wa.me/${booking.whatsapp_number.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        Contact Customer
                    </a>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Notes</p>
                    <p className="mt-1 text-sm text-slate-600">{booking.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}