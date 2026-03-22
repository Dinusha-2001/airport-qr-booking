import AdminSidebar from "@/components/AdminSidebar";
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

type PackageRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string | null;
  fixed_price: number;
  included_km: number;
  duration_hours: number;
  image_url: string | null;
  created_at: string;
};

export default async function AdminDashboardPage() {
  const [
    bookingsResult,
    packagesResult,
    completedBookingsResult,
    recentBookingsResult,
    recentPackagesResult,
  ] = await Promise.all([
    supabaseServer.from("bookings").select("*", { count: "exact", head: true }),
    supabaseServer.from("packages").select("*", { count: "exact", head: true }),
    supabaseServer
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("booking_status", "Completed"),
    supabaseServer
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseServer
      .from("packages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(6),
  ]);

  const totalBookings = bookingsResult.count ?? 0;
  const totalPackages = packagesResult.count ?? 0;
  const completedTrips = completedBookingsResult.count ?? 0;

  const recentBookings: BookingRow[] = recentBookingsResult.data ?? [];
  const recentPackages: PackageRow[] = recentPackagesResult.data ?? [];

  const totalRevenue = recentBookings
    .filter((booking) => booking.booking_status === "Completed")
    .reduce((sum, booking) => sum + Number(booking.total_price), 0);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Manage Your Travel Business
          </h1>
          <p className="mt-3 text-slate-600">
            This dashboard now loads real data from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Total Bookings</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {totalBookings}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Total Packages</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {totalPackages}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Completed Trips</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {completedTrips}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Revenue (recent loaded)</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  LKR {totalRevenue.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Recent Bookings
                </h2>
                <a
                  href="/admin/bookings"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all
                </a>
              </div>

              {recentBookings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  No bookings found yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
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
                            <span className="font-semibold text-slate-900">Price:</span>{" "}
                            LKR {Number(booking.total_price).toLocaleString()}
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
                            Contact
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

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Current Packages
                </h2>
                <a
                  href="/admin/packages"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Manage packages
                </a>
              </div>

              {recentPackages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  No packages found yet.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {recentPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        {pkg.category}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-slate-900">
                        {pkg.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {pkg.short_description ?? ""}
                      </p>
                      <div className="mt-4 space-y-1 text-sm text-slate-700">
                        <p>LKR {Number(pkg.fixed_price).toLocaleString()}</p>
                        <p>{pkg.included_km} km included</p>
                        <p>{pkg.duration_hours} hour(s)</p>
                      </div>
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