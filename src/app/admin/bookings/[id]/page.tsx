import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";

type BookingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type BookingRow = {
  id: string;
  booking_reference: string;
  package_id: string | null;
  selected_package: string;
  customer_name: string;
  nationality: string | null;
  whatsapp_number: string;
  email: string | null;
  flight_number: string | null;
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

export default async function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const settings = await getBusinessSettings();
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const booking = data as BookingRow | null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Bookings / Details
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Booking Details
          </h1>
          <p className="mt-3 text-slate-600">
            View all information for a single booking.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="lg:col-span-3">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load booking: {error.message}
              </div>
            ) : !booking ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700 shadow-sm">
                Booking not found.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {booking.booking_reference}
                      </p>
                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {booking.customer_name}
                      </h2>
                      <p className="mt-2 text-slate-600">
                        {booking.selected_package}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                        booking.booking_status
                      )}`}
                    >
                      {booking.booking_status}
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Customer Information
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Name:</span>{" "}
                        {booking.customer_name}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Nationality:</span>{" "}
                        {booking.nationality ?? "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
                        {booking.whatsapp_number}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Email:</span>{" "}
                        {booking.email ?? "-"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Travel Information
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Flight Number:</span>{" "}
                        {booking.flight_number ?? "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Pickup Date:</span>{" "}
                        {booking.pickup_date}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Pickup Time:</span>{" "}
                        {booking.pickup_time}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Package:</span>{" "}
                        {booking.selected_package}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Route Information
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Pickup Location:</span>{" "}
                        {booking.pickup_location}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Drop Location:</span>{" "}
                        {booking.drop_location}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Passengers:</span>{" "}
                        {booking.passenger_count}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Luggage:</span>{" "}
                        {booking.luggage_count}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">
                      Booking Information
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-900">Booking Ref:</span>{" "}
                        {booking.booking_reference}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Package ID:</span>{" "}
                        {booking.package_id ?? "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Status:</span>{" "}
                        {booking.booking_status}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Price:</span>{" "}
                        LKR {Number(booking.total_price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900">Additional Notes</h3>
                  <p className="mt-4 text-sm text-slate-600">
                    {booking.notes?.trim() ? booking.notes : "No additional notes."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/admin/bookings"
                    className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    Back to Bookings
                  </Link>

                  <a
                    href={`https://wa.me/${booking.whatsapp_number.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    Contact Customer
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}