import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";
import { getBusinessSettings } from "@/lib/business-settings";
import DeletePackageButton from "./delete-package-button";

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

export default async function AdminPackagesPage() {
  const { data, error } = await supabaseServer
    .from("packages")
    .select("*")
    .order("created_at", { ascending: true });

  const packages: PackageRow[] = data ?? [];
  const settings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Packages
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Manage Packages
          </h1>
          <p className="mt-3 text-slate-600">
            This page now loads real package data from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Packages</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Total packages: {packages.length}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
                    Live data from Supabase
                </div>

                <a
                    href="/admin/packages/new"
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    + Add New Package
                </a>
                </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load packages: {error.message}
              </div>
            )}

            {!error && packages.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                No packages found yet.
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="h-48 bg-slate-200">
                    <img
                      src={
                        pkg.image_url ??
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={pkg.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                      {pkg.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {pkg.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {pkg.short_description ?? ""}
                    </p>

                    <div className="mt-4 space-y-1 text-sm text-slate-700">
                      <p>
                        <span className="font-semibold">Price:</span> LKR{" "}
                        {Number(pkg.fixed_price).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold">Included KM:</span>{" "}
                        {pkg.included_km} km
                      </p>
                      <p>
                        <span className="font-semibold">Duration:</span>{" "}
                        {pkg.duration_hours} hour(s)
                      </p>
                      <p>
                        <span className="font-semibold">Slug:</span> {pkg.slug}
                      </p>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <a
                        href={`/admin/packages/${pkg.id}`}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                        >
                        Edit
                        </a>

                      <DeletePackageButton
                        packageId={pkg.id}
                        packageTitle={pkg.title}
                        />
                    </div>
                  </div>
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