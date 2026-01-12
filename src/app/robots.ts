// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/workshop-checkout',
          '/workshop-success',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://xourcebase.com/sitemap.xml',
  };
}