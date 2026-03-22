import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";

export default async function AdminLoginPage() {
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
            Admin Login
          </h1>
          <p className="mt-3 text-slate-600">
            Enter the admin access code to open the admin dashboard.
          </p>

          <form method="POST" action="/api/auth/admin-login" className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Admin Access Code
              </label>
              <input
                name="accessCode"
                type="password"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Enter Admin Panel
            </button>
          </form>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}