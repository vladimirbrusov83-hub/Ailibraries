import type { MetadataRoute } from "next";
import { modules } from "@/content/modules";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-in-academic-libraries.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/curriculum`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/level/foundations`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/level/applied`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/level/advanced`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/professional-development.html`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = modules
    .filter((m) => m.status === "published")
    .map((m) => ({
      url: `${SITE_URL}/module/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...moduleRoutes];
}
