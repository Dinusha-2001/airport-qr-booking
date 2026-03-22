import Link from "next/link";

export default function DriverSidebar() {
  return (
    <aside className="rounded-2xl bg-slate-900 p-6 text-white">
      <h2 className="text-2xl font-bold">Driver Panel</h2>
      <p className="mt-2 text-sm text-slate-300">SkyRide Lanka Driver Dashboard</p>

      <nav className="mt-8 space-y-3">
        <Link
          href="/driver"
          className="block rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          href="/driver/bookings"
          className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          My Bookings
        </Link>
      </nav>

      <form
        action="/"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/";
        }}
        className="mt-8"
      >
        <button
          type="submit"
          className="w-full rounded-lg border border-slate-600 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Logout
        </button>
      </form>
    </aside>
  );
}