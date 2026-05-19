import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://revaprocess.in';
const API_URL = process.env.VITE_API_URL || 'http://127.0.0.1:8000';
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Predefined static pages with priorities and frequencies
const staticPages = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/about', priority: '0.9', freq: 'monthly' },
  { path: '/services', priority: '0.9', freq: 'monthly' },
  { path: '/career', priority: '0.6', freq: 'monthly' },
  { path: '/contact', priority: '0.6', freq: 'yearly' },
  { path: '/privacy', priority: '0.5', freq: 'yearly' },
  { path: '/terms', priority: '0.5', freq: 'yearly' },
  
  // Static Service sub-pages
  { path: '/services/feasibility', priority: '0.8', freq: 'monthly' },
  { path: '/services/basic-engineering', priority: '0.8', freq: 'monthly' },
  { path: '/services/detailed', priority: '0.8', freq: 'monthly' },
  { path: '/services/procurement', priority: '0.8', freq: 'monthly' },
  { path: '/services/basic', priority: '0.8', freq: 'monthly' },
  { path: '/services/site', priority: '0.8', freq: 'monthly' },
  { path: '/services/project', priority: '0.8', freq: 'monthly' }
];

// Fallback lists of dynamic pages in case backend API is unreachable at build time
const fallbackTechs = [
  'bioremediation', 'amine', 'biogas', 'crude-distillation', 'environmental', 'permits',
  'flue-gas', 'fly-ash', 'hazardous', 'hydrotreatment', 'iset', 'evaporate', 'resin',
  'solvent', 'tank-farm', 'oil-refining', 'wastewater'
];

const fallbackProducts = [
  'boilers', 'basket-filters', 'distillation-column', 'column-internals', 'hopper-bins-silos',
  'heat-exchangers', 'pressure-vessels', 'prefab-piping', 'process-skids', 'reactors',
  'scrubbers', 'structural-construction', 'storage-tanks'
];

const fallbackArticles = [
  'article-1', 'article-3', 'article-4', 'article-9', 'article-17', 'article-20', 'article-21',
  'article-22', 'article-23', 'article-24', 'article-25', 'article-26', 'article-27', 'article-28',
  'article-29', 'article-30', 'article-66', 'article-67', 'article-68', 'article-69', 'article-70',
  'article-71', 'article-72', 'article-73', 'article-74', 'article-75'
];

// Fetch dynamic items from API with timeout
const fetchFromApi = async (endpoint) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
  
  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    // Silent catch, will fallback gracefully
  }
  clearTimeout(timeoutId);
  return null;
};

const generateSitemap = async () => {
  console.log('Generating dynamic sitemap...');
  
  let techSlugs = [...fallbackTechs];
  let productPaths = [...fallbackProducts];
  let articleSlugs = [...fallbackArticles];

  // Try to query active endpoints from API
  try {
    const activeTechs = await fetchFromApi('/technologies/list');
    if (activeTechs && Array.isArray(activeTechs)) {
      techSlugs = Array.from(new Set(['bioremediation', ...activeTechs.map(t => t.slug)]));
    }

    const activeProducts = await fetchFromApi('/products/list');
    if (activeProducts && Array.isArray(activeProducts)) {
      productPaths = Array.from(new Set(activeProducts.map(p => p.path.replace(/^\//, ''))));
    }
    
    const activeNews = await fetchFromApi('/news/active'); // Or similar news endpoint
    if (activeNews && Array.isArray(activeNews)) {
      articleSlugs = Array.from(new Set(activeNews.map(n => n.slug)));
    }
  } catch (err) {
    console.log('API unreachable. Standardizing sitemap with build fallbacks...');
  }

  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Core & Service Static Pages
  xml += `  <!-- Main Core Pages -->\n`;
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.freq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Dynamic Technology Pages
  xml += `\n  <!-- Technologies -->\n`;
  techSlugs.forEach((slug) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/technology/${slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // 3. Dynamic Product Pages
  xml += `\n  <!-- Products -->\n`;
  productPaths.forEach((pathSegment) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/product/${pathSegment}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // 4. Dynamic News/Blog Pages
  xml += `\n  <!-- News & Articles -->\n`;
  articleSlugs.forEach((slug) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/news/${slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`Dynamic sitemap generated successfully at: ${SITEMAP_PATH}`);
};

generateSitemap().catch(err => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
