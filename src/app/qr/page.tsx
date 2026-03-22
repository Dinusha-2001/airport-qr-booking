import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBusinessSettings } from "@/lib/business-settings";
import QRCode from "react-qr-code";

export default async function QrPage() {
  const settings = await getBusinessSettings();

  // Temporary URL (will change after deployment)
  const baseUrl = "http://localhost:3000";

  const packagesUrl = `${baseUrl}/packages`;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar businessName={settings.businessName} />

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Scan & Book
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Explore Travel Packages
        </h1>

        <p className="mt-4 text-slate-600">
          Scan this QR code to view available travel packages and book your ride instantly.
        </p>

        {/* QR Code */}
        <div className="mt-10 flex justify-center">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <QRCode value={packagesUrl} size={260} />
          </div>
        </div>

        {/* URL (optional display) */}
        <p className="mt-6 break-all text-sm text-slate-500">
          {packagesUrl}
        </p>

        {/* Instructions */}
        <div className="mt-10 rounded-2xl bg-white p-6 text-left shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            How it works
          </h2>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>1. Scan the QR code using your phone camera</p>
            <p>2. Browse available travel packages</p>
            <p>3. Select your preferred package</p>
            <p>4. Fill the booking form</p>
            <p>5. Confirm your trip instantly</p>
          </div>
        </div>
      </section>

      <Footer businessName={settings.businessName} />
    </main>
  );
}