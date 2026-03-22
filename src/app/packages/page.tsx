import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";
import { DatabasePackage } from "@/types/database";
import { TravelPackage } from "@/types/package";

export default async function PackagesPage() {
  const settings = await getBusinessSettings();

  const { data, error } = await supabaseServer
    .from("packages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar businessName={settings.businessName} />
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Failed to load packages
          </h1>
          <p className="mt-4 text-slate-600">{error.message}</p>
        </section>
        <Footer businessName={settings.businessName} />
      </main>
    );
  }

  const packages: TravelPackage[] = (data as DatabasePackage[]).map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    category: pkg.category,
    shortDescription: pkg.short_description ?? "",
    fixedPrice: Number(pkg.fixed_price),
    includedKm: pkg.included_km,
    durationHours: pkg.duration_hours,
    imageUrl:
      pkg.image_url ??
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  }));

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            All Packages
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Browse Travel Packages
          </h1>
          <p className="mt-4 text-slate-600">
            These packages are now loaded from your Supabase database.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}