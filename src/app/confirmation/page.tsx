import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";

type ConfirmationPageProps = {
  searchParams: Promise<{
    ref?: string;
  }>;
};

type BookingRow = {
  booking_reference: string;
  customer_name: string;
  selected_package: string;
  booking_status: string;
  total_price: number;
  whatsapp_number: string;
};

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const settings = await getBusinessSettings();
  const { ref } = await searchParams;

  let booking: BookingRow | null = null;

  if (ref) {
    const bookingResult = await supabaseServer
      .from("bookings")
      .select(
        "booking_reference, customer_name, selected_package, booking_status, total_price, whatsapp_number"
      )
      .eq("booking_reference", ref)
      .maybeSingle();

    booking = (bookingResult.data as BookingRow | null) ?? null;
  }

  const whatsappLink = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto flex max-w-3xl px-4 py-20">
        <div className="w-full rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-green-600">
            Booking Submitted
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Your booking request was submitted successfully
          </h1>

          <p className="mt-5 leading-7 text-slate-600">
            Thank you for choosing {settings.businessName}. We have received your booking
            request and will contact you shortly.
          </p>

          {booking ? (
            <div className="mt-8 rounded-xl bg-slate-50 p-5 text-left">
              <h2 className="text-lg font-semibold text-slate-900">
                Booking Details
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Booking Ref:</span>{" "}
                  {booking.booking_reference}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Customer:</span>{" "}
                  {booking.customer_name}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Package:</span>{" "}
                  {booking.selected_package}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Status:</span>{" "}
                  {booking.booking_status}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Price:</span>{" "}
                  LKR {Number(booking.total_price).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Customer WhatsApp:</span>{" "}
                  {booking.whatsapp_number}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-left text-sm text-yellow-700">
              Booking details could not be loaded. The booking may still have been saved,
              but no booking reference was found in the page URL.
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Contact on WhatsApp
            </a>

            <Link
              href="/packages"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
            >
              Back to Packages
            </Link>
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}