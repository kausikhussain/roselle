import { MetadataRoute } from "next";
import { ROSELLE_SHADES } from "@/data/shades";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://roselleliplab.com";

  // Static routes
  const routes = [
    "",
    "/shop",
    "/finder",
    "/reels",
    "/about",
    "/edit",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/shipping",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = ROSELLE_SHADES.map((shade) => ({
    url: `${baseUrl}/product/${shade.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...routes, ...productRoutes];
}
