import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import SiteQrCode from "@/components/site-qr-code";

export const metadata: Metadata = {
  title: "Contact - AI for Academic Libraries",
  description:
    "Questions about the curriculum, speaking or workshop inquiries, collaboration - send a message and we'll get back to you.",
};

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-stone-100 border border-stone-200 rounded-2xl p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Contact</h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          Questions about the curriculum, speaking or workshop inquiries, collaboration - send a message and we&apos;ll get back to you.
        </p>
        <ContactForm />
      </div>
      <SiteQrCode />
    </div>
  );
}
