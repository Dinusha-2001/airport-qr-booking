export const dynamic = "force-dynamic";
import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";
import StatusForm from "./status-form";
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
  nationality: string | null;
  whatsapp_number: string;
  email: string | null;
  flight_number: string | null;
  selected_package: string;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  drop_location: string;
  passenger_count: number;
  luggage_count: number;
  notes: string | null;
  booking_status: string;
  total_price: number;
  created_at: string;
};

export default async function AdminBookingsPage() {
  const settings = await getBusinessSettings();
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings: BookingRow[] = data ?? [];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Bookings
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Manage Bookings
          </h1>
          <p className="mt-3 text-slate-600">
            This page now loads real booking data from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">All Bookings</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Total bookings: {bookings.length}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
                  Live data from Supabase
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load bookings: {error.message}
              </div>
            )}

            {!error && bookings.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                No bookings found yet. Submit a booking from the booking form first.
              </div>
            )}

            <div className="space-y-4">
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
                      <p className="mt-2 text-slate-600">
                        {booking.selected_package}
                      </p>
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
                        <span className="font-semibold text-slate-900">Passengers:</span>{" "}
                        {booking.passenger_count}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Luggage:</span>{" "}
                        {booking.luggage_count}
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
                        href={`/admin/bookings/${booking.id}`}
                        className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                        View
                    </a>

                    <a
                        href={`https://wa.me/${booking.whatsapp_number.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        Contact
                    </a>

                    <StatusForm
                        bookingId={booking.id}
                        currentStatus={booking.booking_status}
                    />
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
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}