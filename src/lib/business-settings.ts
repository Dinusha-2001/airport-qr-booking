import { supabaseServer } from "@/lib/supabase-server";

export type BusinessSettings = {
  businessName: string;
  contactPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  heroTitle: string;
  heroSubtitle: string;
};

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const { data } = await supabaseServer
    .from("business_settings")
    .select(
      "business_name, contact_phone, whatsapp_number, contact_email, hero_title, hero_subtitle"
    )
    .limit(1)
    .maybeSingle();

  return {
    businessName: data?.business_name ?? "SkyRide Lanka",
    contactPhone: data?.contact_phone ?? "+94 77 000 0000",
    whatsappNumber: data?.whatsapp_number ?? "+94 77 000 0000",
    contactEmail: data?.contact_email ?? "info@skyridelanka.com",
    heroTitle:
      data?.hero_title ??
      "Safe, Comfortable, and Easy Airport Taxi Booking for Travelers",
    heroSubtitle:
      data?.hero_subtitle ??
      "Scan the QR code, view travel packages, and book your ride instantly. Airport transfers, day hire, and city tours all in one place.",
  };
}