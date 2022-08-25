// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

(async () => {
  //headless: open browser  [temp]
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.es');
  await page.screenshot({ path: 'src/scraping/images/example.png' });

  //await page.waitForTimeout(5000);
  await browser.close();
})();
