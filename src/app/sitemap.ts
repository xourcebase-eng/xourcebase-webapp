// app/sitemap.ts
export default function sitemap() {
  const baseUrl = 'https://xourcebase.com';

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/plans-pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/workshops`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/help-support`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/teach-xourcebase`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/tech-career-accelerator`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/communication-support-excellence`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/xourcebase-business`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/terms-conditions`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), priority: 0.5 },
  ];
}