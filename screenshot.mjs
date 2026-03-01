import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000';

const browser = await chromium.launch();
const page = await browser.newPage();

// 데스크탑
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshot-desktop.png', fullPage: true });
console.log('✓ screenshot-desktop.png');

// 모바일
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshot-mobile.png', fullPage: true });
console.log('✓ screenshot-mobile.png');

await browser.close();
