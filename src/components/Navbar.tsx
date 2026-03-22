import Link from "next/link";

type NavbarProps = {
  businessName: string;
};

export default function Navbar({ businessName }: NavbarProps) {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{businessName}</h1>
          <p className="text-sm text-slate-500">Airport Taxi & Tour Packages</p>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/packages" className="hover:text-blue-600">
            Packages
          </Link>
          <Link href="/booking" className="hover:text-blue-600">
            Booking
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}