export type DatabasePackage = {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string | null;
  fixed_price: number;
  included_km: number;
  duration_hours: number;
  image_url: string | null;
  created_at: string;
};