import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";
import { DatabasePackage } from "@/types/database";
import Link from "next/link";

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const settings = await getBusinessSettings();
  const { slug } = await params;

  const { data, error } = await supabaseServer
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar businessName={settings.businessName} />
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Package not found</h1>
          <p className="mt-4 text-slate-600">
            The package you are looking for does not exist.
          </p>
          <Link
            href="/packages"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Packages
          </Link>
        </section>
        <Footer businessName={settings.businessName} />
      </main>
    );
  }

  const pkg = data as DatabasePackage;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img
              src={
                pkg.image_url ??
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              }
              alt={pkg.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {pkg.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              {pkg.title}
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              {pkg.short_description ?? ""}
            </p>

            <div className="mt-8 space-y-3 text-slate-700">
              <p>
                <span className="font-semibold">Fixed Price:</span> LKR{" "}
                {Number(pkg.fixed_price).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Included Distance:</span>{" "}
                {pkg.included_km} km
              </p>
              <p>
                <span className="font-semibold">Estimated Duration:</span>{" "}
                {pkg.duration_hours} hour{pkg.duration_hours > 1 ? "s" : ""}
              </p>
              <p>
                <span className="font-semibold">Vehicle Type:</span> Toyota Prius
              </p>
              <p>
                <span className="font-semibold">Driver:</span> Umith
              </p>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                What is included
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Private vehicle service</li>
                <li>• Friendly local driver</li>
                <li>• Clear pricing with no hidden charges</li>
                <li>• Comfortable travel for tourists</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/booking?package=${encodeURIComponent(pkg.title)}`}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Book This Package
              </Link>

              <Link
                href="/packages"
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Back to Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}