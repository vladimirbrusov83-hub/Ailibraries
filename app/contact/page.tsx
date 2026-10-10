import type { Metadata } from "next";
import ContactPanel from "@/components/contact-panel";
import SiteQrCode from "@/components/site-qr-code";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about the curriculum, speaking or workshop inquiries, collaboration - send a message and we'll get back to you.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <ContactPanel
        as="h1"
        title="Contact"
        intro="Questions about the curriculum, speaking or workshop inquiries, collaboration - send a message and we'll get back to you."
      />
      <SiteQrCode />
    </div>
  );
}
