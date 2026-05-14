import { createFileRoute } from "@tanstack/react-router";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/rooms", priority: "0.9", changefreq: "weekly" },
  { path: "/packages", priority: "0.9", changefreq: "weekly" },
  { path: "/dining", priority: "0.7", changefreq: "monthly" },
  { path: "/culture", priority: "0.7", changefreq: "monthly" },
  { path: "/tour", priority: "0.8", changefreq: "weekly" },
  { path: "/gallery", priority: "0.6", changefreq: "weekly" },
  { path: "/blog", priority: "0.6", changefreq: "weekly" },
  { path: "/booking", priority: "0.9", changefreq: "weekly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/faq", priority: "0.4", changefreq: "monthly" },
  { path: "/privacy", priority: "0.2", changefreq: "yearly" },
  { path: "/terms", priority: "0.2", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ROUTES.map((r) =>
          `  <url>\n    <loc>${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
