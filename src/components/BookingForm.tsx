"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PackageOption = {
  id: string;
  title: string;
};

type BookingFormProps = {
  packageOptions: PackageOption[];
  defaultSelectedPackage?: string;
  whatsappNumber: string;
};

export default function BookingForm({
  packageOptions,
  defaultSelectedPackage = "",
  whatsappNumber,
}: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [packagePrice, setPackagePrice] = useState<number | null>(null);

  useEffect(() => {
    if (!defaultSelectedPackage || packageOptions.length === 0) return;

    const matched = packageOptions.find(
      (pkg) => pkg.title === defaultSelectedPackage
    );

    if (matched) {
      setSelectedPackageId(matched.id);
    }
  }, [defaultSelectedPackage, packageOptions]);

  useEffect(() => {
    async function loadPackagePrice() {
      if (!selectedPackageId) {
        setPackagePrice(null);
        return;
      }

      const { data, error } = await supabase
        .from("packages")
        .select("fixed_price")
        .eq("id", selectedPackageId)
        .maybeSingle();

      if (error || !data) {
        setPackagePrice(null);
        return;
      }

      setPackagePrice(Number(data.fixed_price));
    }

    loadPackagePrice();
  }, [selectedPackageId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const customerName = String(formData.get("customerName") || "");
    const nationality = String(formData.get("nationality") || "");
    const whatsappNumber = String(formData.get("whatsappNumber") || "");
    const email = String(formData.get("email") || "");
    const flightNumber = String(formData.get("flightNumber") || "");
    const pickupDate = String(formData.get("pickupDate") || "");
    const pickupTime = String(formData.get("pickupTime") || "");
    const pickupLocation = String(formData.get("pickupLocation") || "");
    const dropLocation = String(formData.get("dropLocation") || "");
    const passengerCount = Number(formData.get("passengerCount") || 1);
    const luggageCount = Number(formData.get("luggageCount") || 0);
    const notes = String(formData.get("notes") || "");

    const selectedPackage = packageOptions.find(
      (pkg) => pkg.id === selectedPackageId
    );

    if (!selectedPackage) {
      setErrorMessage("Please select a valid package.");
      setLoading(false);
      return;
    }

    const bookingReference = `SKY-${Date.now()}`;
    const totalPrice = packagePrice ?? 0;

    const { error } = await supabase.from("bookings").insert([
      {
        booking_reference: bookingReference,
        package_id: selectedPackage.id,
        selected_package: selectedPackage.title,
        customer_name: customerName,
        nationality,
        whatsapp_number: whatsappNumber,
        email,
        flight_number: flightNumber,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        pickup_location: pickupLocation,
        drop_location: dropLocation,
        passenger_count: passengerCount,
        luggage_count: luggageCount,
        notes,
        booking_status: "Pending",
        total_price: totalPrice,
      },
    ]);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push(`/confirmation?ref=${encodeURIComponent(bookingReference)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Book Your Ride</h2>
        <p className="mt-2 text-sm text-slate-600">
          This form now saves booking data to Supabase and stores the package ID.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            name="customerName"
            type="text"
            placeholder="John Smith"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nationality
          </label>
          <input
            name="nationality"
            type="text"
            placeholder="British"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            WhatsApp Number
          </label>
          <input
            name="whatsappNumber"
            type="text"
            placeholder="+44 7123 456789"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Arrival Date
          </label>
          <input
            name="pickupDate"
            type="date"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Arrival Time
          </label>
          <input
            name="pickupTime"
            type="time"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Flight Number
          </label>
          <input
            name="flightNumber"
            type="text"
            placeholder="UL123"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Selected Package
          </label>
          <select
            required
            value={selectedPackageId}
            onChange={(e) => setSelectedPackageId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select a package</option>
            {packageOptions.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.title}
              </option>
            ))}
          </select>

          {selectedPackageId && (
            <p className="mt-2 text-sm text-slate-600">
              Current package price:{" "}
              <span className="font-semibold text-slate-900">
                {packagePrice !== null
                  ? `LKR ${packagePrice.toLocaleString()}`
                  : "Loading..."}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Pickup Location
          </label>
          <input
            name="pickupLocation"
            type="text"
            placeholder="Bandaranaike International Airport"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Drop Location
          </label>
          <input
            name="dropLocation"
            type="text"
            placeholder="Colombo 03"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Number of Passengers
          </label>
          <input
            name="passengerCount"
            type="number"
            min="1"
            defaultValue="1"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Number of Luggage Items
          </label>
          <input
            name="luggageCount"
            type="number"
            min="0"
            defaultValue="0"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Additional Notes
        </label>
        <textarea
          name="notes"
          rows={5}
          placeholder="Example: Need hotel stop, extra luggage, child seat, late-night pickup..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving Booking..." : "Submit Booking"}
        </button>

        <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
        >
        Chat on WhatsApp
        </a>
      </div>
    </form>
  );
}