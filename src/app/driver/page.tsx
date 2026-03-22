import DriverSidebar from "@/components/DriverSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";
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

const settings = await getBusinessSettings();

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

export default async function DriverDashboardPage() {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .neq("booking_status", "Cancelled")
    .order("created_at", { ascending: false });

  const bookings: BookingRow[] = data ?? [];

  const activeBookings = bookings.filter(
    (booking) =>
      booking.booking_status === "Pending" ||
      booking.booking_status === "Accepted" ||
      booking.booking_status === "In Progress"
  );

  const todayJobs = activeBookings.length;
  const pendingJobs = bookings.filter(
    (booking) => booking.booking_status === "Pending"
  ).length;
  const completedJobs = bookings.filter(
    (booking) => booking.booking_status === "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Driver Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Welcome, Umith
          </h1>
          <p className="mt-3 text-slate-600">
            This dashboard now loads real booking data from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <DriverSidebar />
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Today’s Jobs</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {todayJobs}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Pending Jobs</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {pendingJobs}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Completed Jobs</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {completedJobs}
                </h2>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load driver bookings: {error.message}
              </div>
            )}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Assigned Trips
                </h2>

                <a
                  href="/driver/bookings"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all
                </a>
              </div>

              {activeBookings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  No assigned bookings yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {booking.booking_reference}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-slate-900">
                            {booking.customer_name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {booking.selected_package}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {booking.pickup_date} at {booking.pickup_time}
                          </p>
                        </div>

                        <div className="text-sm text-slate-600">
                          <p>
                            <span className="font-semibold text-slate-900">From:</span>{" "}
                            {booking.pickup_location}
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold text-slate-900">To:</span>{" "}
                            {booking.drop_location}
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
                            {booking.whatsapp_number}
                          </p>
                        </div>

                        <div className="flex flex-col items-start gap-3 md:items-end">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              booking.booking_status
                            )}`}
                          >
                            {booking.booking_status}
                          </span>

                          <a
                            href={`https://wa.me/${booking.whatsapp_number.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                          >
                            Contact Customer
                          </a>
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
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}