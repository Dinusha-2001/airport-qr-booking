type FooterProps = {
  businessName: string;
};

export default function Footer({ businessName }: FooterProps) {
  return (
    <footer className="mt-16 border-t bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <h3 className="text-lg font-semibold text-slate-900">{businessName}</h3>
        <p className="mt-2 text-sm text-slate-600">
          Private airport transfer and travel booking service with clear pricing and easy booking.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          © 2026 {businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}