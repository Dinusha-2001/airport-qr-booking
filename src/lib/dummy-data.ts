import { TravelPackage } from "@/types/package";

export const dummyPackages: TravelPackage[] = [
  {
    id: "1",
    title: "Airport to Colombo",
    slug: "airport-to-colombo",
    category: "Airport Transfer",
    shortDescription: "Comfortable private ride from the airport to Colombo city with fixed pricing.",
    fixedPrice: 8500,
    includedKm: 35,
    durationHours: 1,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Airport to Negombo",
    slug: "airport-to-negombo",
    category: "Airport Transfer",
    shortDescription: "Quick and reliable private transfer from the airport to Negombo area.",
    fixedPrice: 5000,
    includedKm: 15,
    durationHours: 1,
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Colombo City Tour",
    slug: "colombo-city-tour",
    category: "City Tour",
    shortDescription: "Explore top attractions in Colombo with a private driver and flexible schedule.",
    fixedPrice: 12000,
    includedKm: 50,
    durationHours: 6,
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
];