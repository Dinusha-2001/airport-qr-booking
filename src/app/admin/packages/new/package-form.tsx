"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PackageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const title = String(formData.get("title") || "");
    const category = String(formData.get("category") || "");
    const shortDescription = String(formData.get("shortDescription") || "");
    const fixedPrice = Number(formData.get("fixedPrice") || 0);
    const includedKm = Number(formData.get("includedKm") || 0);
    const durationHours = Number(formData.get("durationHours") || 1);
    const imageUrl = String(formData.get("imageUrl") || "");

    const slug = createSlug(title);

    const { error } = await supabase.from("packages").insert([
      {
        title,
        slug,
        category,
        short_description: shortDescription,
        fixed_price: fixedPrice,
        included_km: includedKm,
        duration_hours: durationHours,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccessMessage("Package created successfully.");
    setLoading(false);

    setTimeout(() => {
      router.push("/admin/packages");
    }, 1000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-sm"
    >
      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Package Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="Airport to Kandy"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>
        <input
          name="category"
          type="text"
          placeholder="Airport Transfer"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Short Description
        </label>
        <textarea
          name="shortDescription"
          rows={4}
          placeholder="Comfortable private ride from the airport to Kandy."
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Fixed Price
          </label>
          <input
            name="fixedPrice"
            type="number"
            min="0"
            placeholder="15000"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Included KM
          </label>
          <input
            name="includedKm"
            type="number"
            min="0"
            placeholder="120"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Duration Hours
          </label>
          <input
            name="durationHours"
            type="number"
            min="1"
            placeholder="4"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Image URL
        </label>
        <input
          name="imageUrl"
          type="text"
          placeholder="https://images.unsplash.com/..."
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create Package"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/packages")}
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}