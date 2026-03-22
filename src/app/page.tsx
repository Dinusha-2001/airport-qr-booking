import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import { supabaseServer } from "@/lib/supabase-server";
import { TravelPackage } from "@/types/package";

type SettingsRow = {
  business_name: string;
  hero_title: string | null;
  hero_subtitle: string | null;
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

export default async function HomePage() {
  const [settingsResult, packagesResult] = await Promise.all([
    supabaseServer
      .from("business_settings")
      .select("business_name, hero_title, hero_subtitle")
      .limit(1)
      .maybeSingle(),
    supabaseServer
      .from("packages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(6),
  ]);

  const settings = settingsResult.data as SettingsRow | null;
  const packageRows = (packagesResult.data ?? []) as PackageRow[];

  const businessName = settings?.business_name ?? "SkyRide Lanka";
  const heroTitle =
    settings?.hero_title ??
    "Safe, Comfortable, and Easy Airport Taxi Booking for Travelers";
  const heroSubtitle =
    settings?.hero_subtitle ??
    "Scan the QR code, view travel packages, and book your ride instantly. Airport transfers, day hire, and city tours all in one place.";

  const packages: TravelPackage[] = packageRows.map((pkg) => ({
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
      <Navbar businessName={businessName} />
      <Hero heroTitle={heroTitle} heroSubtitle={heroSubtitle} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Featured Packages
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Popular Travel Packages
          </h2>
          <p className="mt-4 text-slate-600">
            These package cards are now loaded from Supabase.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
            No packages found yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Why choose {businessName}?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-slate-900">Clear Pricing</h3>
              <p className="mt-2 text-sm text-slate-600">
                Customers can see prices clearly before booking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Private Travel</h3>
              <p className="mt-2 text-sm text-slate-600">
                Safe and comfortable private rides for tourists.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Easy Booking</h3>
              <p className="mt-2 text-sm text-slate-600">
                QR code scanning makes booking simple and fast.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Tour Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Airport pickup, day hire, and city tours in one service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer businessName={businessName} />
    </main>
  );
}