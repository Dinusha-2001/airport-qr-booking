import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";

type SettingsRow = {
  business_name: string;
  contact_phone: string | null;
  whatsapp_number: string | null;
  contact_email: string | null;
};

export default async function ContactPage() {
  const { data } = await supabaseServer
    .from("business_settings")
    .select("business_name, contact_phone, whatsapp_number, contact_email")
    .limit(1)
    .maybeSingle();

  const settings = data as SettingsRow | null;

  const businessName = settings?.business_name ?? "SkyRide Lanka";
  const contactPhone = settings?.contact_phone ?? "+94 77 000 0000";
  const whatsappNumber = settings?.whatsapp_number ?? "+94 77 000 0000";
  const contactEmail = settings?.contact_email ?? "info@skyridelanka.com";

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  const phoneLink = `tel:${contactPhone.replace(/\s/g, "")}`;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={businessName} />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Contact Us
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-slate-600">
            Contact us for airport pickup, city tours, and custom travel packages.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Contact Details</h2>

            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Business Name:</span>{" "}
                {businessName}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Driver Name:</span>{" "}
                Umith
              </p>
              <p>
                <span className="font-semibold text-slate-900">Phone:</span>{" "}
                {contactPhone}
              </p>
              <p>
                <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
                {whatsappNumber}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                {contactEmail}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Location:</span>{" "}
                Colombo, Sri Lanka
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                Chat on WhatsApp
              </a>

              <a
                href={phoneLink}
                className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Call Now
              </a>

              <a
                href="/booking"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100"
              >
                Go to Booking Page
              </a>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Services Available
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Airport pickup and drop</li>
                <li>• Colombo city tours</li>
                <li>• Full day hire</li>
                <li>• Custom travel packages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer businessName={businessName} />
    </main>
  );
}