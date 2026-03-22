import Link from "next/link";

type HeroProps = {
  heroTitle: string;
  heroSubtitle: string;
};

export default function Hero({ heroTitle, heroSubtitle }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="mb-3 text-sm uppercase tracking-widest text-blue-200">
          Reliable Airport Travel Service
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          {heroTitle}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-200">
          {heroSubtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/packages"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
          >
            View Packages
          </Link>

          <Link
            href="/booking"
            className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-slate-900"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}