import { qrSvgPath } from "@/lib/qr";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-in-academic-libraries.vercel.app";

const DISPLAY_URL = SITE_URL.replace(/^https?:\/\//, "");

export default function SiteQrCode() {
  const qr = qrSvgPath(SITE_URL);
  return (
    <section className="card-soft sm:hidden mt-8 bg-white border border-stone-200 rounded-2xl p-8 text-center">
      <h2 className="text-sm font-semibold text-stone-900 mb-1">Share this site</h2>
      <p className="text-xs text-stone-500 leading-relaxed mb-5">
        Point a camera at the code to open the curriculum.
      </p>
      <div className="inline-block bg-white border border-stone-200 rounded-xl p-3">
        <svg
          viewBox={`0 0 ${qr.viewBox} ${qr.viewBox}`}
          shapeRendering="crispEdges"
          className="w-40 h-40 block"
          role="img"
          aria-label={`QR code linking to ${SITE_URL}`}
        >
          <rect width="100%" height="100%" fill="#ffffff" />
          <path fill="#1c1917" d={qr.d} />
        </svg>
      </div>
      <p className="mt-4 text-xs text-stone-500 break-all">{DISPLAY_URL}</p>
    </section>
  );
}
