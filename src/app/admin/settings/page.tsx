import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabaseServer } from "@/lib/supabase-server";
import SettingsForm from "./settings-form";
import { getBusinessSettings } from "@/lib/business-settings";

type SettingsRow = {
  id: string;
  business_name: string;
  contact_phone: string | null;
  whatsapp_number: string | null;
  contact_email: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
};

export default async function AdminSettingsPage() {
  const businessSettings = await getBusinessSettings();

  const { data, error } = await supabaseServer
    .from("business_settings")
    .select(
      "id, business_name, contact_phone, whatsapp_number, contact_email, hero_title, hero_subtitle"
    )
    .maybeSingle();

  const formSettings = data as SettingsRow | null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={businessSettings.businessName} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Admin / Settings
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Business Settings
          </h1>
          <p className="mt-3 text-slate-600">
            This page now loads and saves real business settings from Supabase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>

          <div className="lg:col-span-3">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                Failed to load settings: {error.message}
              </div>
            ) : !formSettings ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700 shadow-sm">
                No settings row found in Supabase. Please insert one row into
                the <strong> business_settings </strong> table first.
              </div>
            ) : (
              <SettingsForm settings={formSettings} />
            )}
          </div>
        </div>
      </section>

      <Footer businessName={businessSettings.businessName} />
    </main>
  );
}