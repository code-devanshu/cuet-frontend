/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://cuet-frontend.vercel.app/', // 🔁 Replace with your deployed domain
    generateRobotsTxt: true, // ✅ Also generates robots.txt for you
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin'], // optional, exclude pages like admin or draft
  };
  