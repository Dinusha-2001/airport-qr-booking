import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import DriverLoginForm from "./driver-login-form";

export default async function DriverLoginPage() {
  const settings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-xl px-4 py-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Secure Access
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Driver Login
          </h1>
          <p className="mt-3 text-slate-600">
            Enter the driver access code to open the driver dashboard.
          </p>

          <DriverLoginForm />
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}