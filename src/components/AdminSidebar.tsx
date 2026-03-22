export default function AdminSidebar() {
  return (
    <aside className="rounded-2xl bg-slate-900 p-6 text-white">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <p className="mt-2 text-sm text-slate-300">SkyRide Lanka Dashboard</p>

      <nav className="mt-8 space-y-3">
        <a
          href="/admin"
          className="block rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium hover:bg-slate-700"
        >
          Dashboard
        </a>

        <a
          href="/admin/packages"
          className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Manage Packages
        </a>

        <a
          href="/admin/bookings"
          className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Manage Bookings
        </a>

        <a
          href="/admin/settings"
          className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Settings
        </a>
      </nav>
    </aside>
  );
}