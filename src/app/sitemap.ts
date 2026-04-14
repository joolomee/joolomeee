import type { MetadataRoute } from "next";

const BASE_URL = "https://www.joolomee.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          pt: BASE_URL,
          en: `${BASE_URL}?lang=en`,
          es: `${BASE_URL}?lang=es`,
          fr: `${BASE_URL}?lang=fr`,
          de: `${BASE_URL}?lang=de`,
        },
      },
    },
  ];
}
