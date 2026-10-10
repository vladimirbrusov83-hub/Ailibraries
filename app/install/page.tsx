import type { Metadata } from "next";
import InstallHelp from "@/components/install/install-help";
import { qrSvgPath } from "@/lib/qr";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-in-academic-libraries.vercel.app";

export const metadata: Metadata = {
  title: "Install the app",
  description:
    "Add AI for Academic Libraries to your phone's home screen or your computer's dock, step by step for your device.",
};

export default function InstallPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-stone-900 mb-4">Install the app</h1>
        <p className="text-xl text-stone-600 leading-relaxed">
          Put AI for Academic Libraries on your home screen or dock. It&apos;s the same free curriculum, one tap away.
        </p>
      </header>
      <InstallHelp phoneQr={qrSvgPath(`${SITE_URL}/install`)} siteUrl={SITE_URL} />
    </div>
  );
}
