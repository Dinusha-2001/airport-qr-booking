import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import PackageForm from "./package-form";

export default async function NewPackagePage() {
  const settings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Packages / New
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Add New Package
          </h1>
          <p className="mt-3 text-slate-600">
            Create a new travel package and save it to Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="lg:col-span-3">
            <PackageForm />
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}