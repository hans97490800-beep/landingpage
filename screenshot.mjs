import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000';

async function scrollAndCapture(page, path) {
  await page.goto(url, { waitUntil: 'networkidle' });

  // 전체 높이 구하기
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);

  // 천천히 스크롤하여 모든 IntersectionObserver 트리거
  let scrollY = 0;
  while (scrollY < totalHeight) {
    scrollY += 400;
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(80);
  }

  // 맨 위로 돌아가기
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.screenshot({ path, fullPage: true });
  console.log('✓ ' + path);
}

const browser = await chromium.launch();
const page = await browser.newPage();

// 데스크탑
await page.setViewportSize({ width: 1280, height: 900 });
await scrollAndCapture(page, 'screenshot-desktop.png');

// 모바일
await page.setViewportSize({ width: 390, height: 844 });
await scrollAndCapture(page, 'screenshot-mobile.png');

await browser.close();
