import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const services = [
    "events",
    "exhibitions",
    "workshops",
    "activations",
    "consultancy",
  ];

  const serviceEntries: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${site.domain}/expertise/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: site.domain,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${site.domain}/expertise`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceEntries,
    {
      url: `${site.domain}/experiences`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.domain}/approach`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.domain}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
