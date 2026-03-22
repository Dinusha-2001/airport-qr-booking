"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

type SettingsFormProps = {
  settings: {
    id: string;
    business_name: string;
    contact_phone: string | null;
    whatsapp_number: string | null;
    contact_email: string | null;
    hero_title: string | null;
    hero_subtitle: string | null;
  };
};

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const businessName = String(formData.get("businessName") || "");
    const contactPhone = String(formData.get("contactPhone") || "");
    const whatsappNumber = String(formData.get("whatsappNumber") || "");
    const contactEmail = String(formData.get("contactEmail") || "");
    const heroTitle = String(formData.get("heroTitle") || "");
    const heroSubtitle = String(formData.get("heroSubtitle") || "");

    const { error } = await supabase
      .from("business_settings")
      .update({
        business_name: businessName,
        contact_phone: contactPhone,
        whatsapp_number: whatsappNumber,
        contact_email: contactEmail,
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccessMessage("Settings saved successfully.");
    setLoading(false);
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Business Name
          </label>
          <input
            name="businessName"
            type="text"
            defaultValue={settings.business_name}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contact Phone
          </label>
          <input
            name="contactPhone"
            type="text"
            defaultValue={settings.contact_phone ?? ""}
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
            defaultValue={settings.whatsapp_number ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Contact Email
          </label>
          <input
            name="contactEmail"
            type="email"
            defaultValue={settings.contact_email ?? ""}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Hero Title
        </label>
        <input
          name="heroTitle"
          type="text"
          defaultValue={settings.hero_title ?? ""}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Hero Subtitle
        </label>
        <textarea
          name="heroSubtitle"
          rows={4}
          defaultValue={settings.hero_subtitle ?? ""}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}