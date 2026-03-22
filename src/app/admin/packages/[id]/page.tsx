import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import { supabaseServer } from "@/lib/supabase-server";
import EditPackageForm from "./edit-package-form";

type EditPackagePageProps = {
  params: Promise<{
    id: string;
  }>;
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
};

export default async function EditPackagePage({
  params,
}: EditPackagePageProps) {
  const settings = await getBusinessSettings();
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("packages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const pkg = data as PackageRow | null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Packages / Edit
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Edit Package
          </h1>
          <p className="mt-3 text-slate-600">
            Update package information and save changes to Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="lg:col-span-3">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load package: {error.message}
              </div>
            ) : !pkg ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700 shadow-sm">
                Package not found.
              </div>
            ) : (
              <EditPackageForm pkg={pkg} />
            )}
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}