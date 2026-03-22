import Link from "next/link";
import { TravelPackage } from "@/types/package";

type PackageCardProps = {
  pkg: TravelPackage;
};

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="h-48 bg-slate-200">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          {pkg.category}
        </p>

        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          {pkg.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {pkg.shortDescription}
        </p>

        <div className="mt-4 space-y-1 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Price:</span> LKR{" "}
            {pkg.fixedPrice.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Included KM:</span> {pkg.includedKm} km
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {pkg.durationHours} hours
          </p>
        </div>

        <div className="mt-5">
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}