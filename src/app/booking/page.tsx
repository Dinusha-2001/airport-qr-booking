import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";

type BookingPageProps = {
  searchParams: Promise<{
    package?: string;
  }>;
};

type PackageOption = {
  id: string;
  title: string;
};

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const settings = await getBusinessSettings();
  const { package: selectedPackageFromUrl } = await searchParams;

  const packagesResult = await supabaseServer
    .from("packages")
    .select("id, title")
    .order("created_at", { ascending: true });

  const packageOptions: PackageOption[] = packagesResult.error
    ? []
    : packagesResult.data;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Booking Page
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Reserve Your Travel Package
          </h1>
          <p className="mt-4 text-slate-600">
            Fill in your travel details below. This form now saves booking data to Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm
            packageOptions={packageOptions}
            defaultSelectedPackage={selectedPackageFromUrl ?? ""}
            whatsappNumber={settings.whatsappNumber}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Quick Support</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Need help before booking? Contact our driver directly through WhatsApp.
              </p>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
              >
                WhatsApp Driver
              </a>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Business Info</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Business:</span>{" "}
                  {settings.businessName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Driver:</span>{" "}
                  Umith
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Vehicle:</span>{" "}
                  Toyota Prius
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Phone:</span>{" "}
                  {settings.contactPhone}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Available Packages</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {packageOptions.length > 0 ? (
                  packageOptions.map((pkg) => <p key={pkg.id}>• {pkg.title}</p>)
                ) : (
                  <p>No packages available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}