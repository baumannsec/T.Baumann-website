import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; } .he { opacity: 1 !important; animation: none !important; }' });
await new Promise(r => setTimeout(r, 800));

const snap = async (name, scrollY) => {
  await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 400));
  // capture the current viewport (no clip = current viewport)
  await page.screenshot({ path: path.join(outDir, `sec-${name}.png`) });
  console.log(`Saved sec-${name}.png`);
};

await snap('hero', 0);
await snap('problem', 950);
await snap('compare', 2050);
await snap('engine', 3050);
await snap('diot', 4150);
await snap('metrics', 5000);
await snap('cta', 9999999);

await browser.close();
console.log('All sections captured.');
