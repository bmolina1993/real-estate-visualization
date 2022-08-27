// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
import { PARAMS_SEARCHER, QUERY_SEARCHER } from './models/page.model';

// ---------
// variables
// ---------
const URL_PAGE = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}.html`;
const PATH_FILE_IMAGE = 'src/scraping/images/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 0,
    devtools: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto(URL_PAGE);
  // capture screenshot
  await page.screenshot({ path: PATH_FILE_IMAGE + 'home.png' });

  // inspect the page for extract data
  // extract total result of page filtered
  // $eval = querySelector
  // input: 193 Departamentos en alquiler en Villa Urquiza
  // output: 193
  const totalResult = await page.$eval(
    QUERY_SEARCHER.TOTAL_RESULT,
    (document) => Number(document.textContent.split(' ', 1)[0]),
  );

  console.log("totalResult: ", totalResult) //[x]
  // $$eval = querySelectorAll

  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
})();
