import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

// Auto-increment filename
let n = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${n}${label}.png`))) n++;
const outFile = path.join(screenshotDir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: (await import('puppeteer')).executablePath?.() ?? undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Force all scroll-reveal elements visible
await page.addStyleTag({
  content: '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }'
});

// Scroll through page to trigger any JS-based reveals, then return to top
await page.evaluate(async () => {
  await new Promise(resolve => {
    const total = document.body.scrollHeight;
    let pos = 0;
    const step = () => {
      pos += 500;
      window.scrollTo(0, pos);
      if (pos < total) setTimeout(step, 60);
      else resolve();
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 600));

await page.screenshot({ path: outFile, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outFile}`);
