// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
import {
  PARAMS_SEARCHER,
  QUERY_SEARCHER,
  urlParser,
} from './models/page.model';

// ---------
// variables
// ---------
const URL_PAGE = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}.html`;
const PATH_FILE_IMAGE = 'src/scraping/images/';
const settingLunch = {
  headless: false,
  slowMo: 0,
  devtools: false,
  defaultViewport: null,
};

(async () => {
  const browser = await puppeteer.launch(settingLunch);
  const page = await browser.newPage();

  await page.goto(URL_PAGE, { waitUntil: 'load' });
  // capture screenshot
  await page.screenshot({ path: PATH_FILE_IMAGE + 'home.png' });

  // inspect the page for extract data
  // extract total result of page filtered
  // $eval = querySelector
  // input: 193 Departamentos en alquiler en Villa Urquiza
  // output: 193
  const totalResult = await page.$eval(
    QUERY_SEARCHER.TOTAL_RESULT,
    (selector) => Number(selector.textContent.split(' ', 1)[0]),
  );

  // average page by total result cosidering 20 page per page
  const pageCountAvg = Math.round(
    totalResult / PARAMS_SEARCHER.QTY_RESULT_DEFAULT,
  );
  console.log('totalResult: ', totalResult); //[x]
  console.log('pageCountAvg: ', pageCountAvg); //[x]

  // $$eval = querySelectorAll
  // extract all url pages per card
  let arrCardlinks = await page.$$eval(QUERY_SEARCHER.CARD_URL, (selector) => {
    const links = [];
    selector.forEach((item) => {
      links.push(item.attributes.getNamedItem('data-to-posting').textContent);
    });
    return links;
  });
  await browser.close();

  // add domain for each endPoint link
  // item: remove first slash from endPoint
  arrCardlinks = arrCardlinks.map(
    (item) => PARAMS_SEARCHER.DOMAIN + item.substring(1),
  );
  console.log('arrCardlinks: ', arrCardlinks); //[x]

  // access to each link
  // open a new browser if required for security of page
  for (const link of arrCardlinks) {
    const browserDet = await puppeteer.launch(settingLunch);
    const pageDet = await browserDet.newPage();

    await pageDet.goto(link, { waitUntil: 'load' });

    //get price
    await pageDet.waitForSelector(QUERY_SEARCHER.PRICE);
    const price = await pageDet.$eval(
      QUERY_SEARCHER.PRICE,
      (selector) => selector?.innerText,
    );
    console.log('price: ', price); //[x]

    // get expense
    // if element not exist, add field with null data
    let expense: string;
    try {
      await pageDet.waitForSelector(QUERY_SEARCHER.EXPENSE, { timeout: 10000 });
      expense = await pageDet.$eval(
        QUERY_SEARCHER.EXPENSE,
        (selector) => selector?.innerText,
      );
    } catch (error) {
      expense = null;
    }
    console.log('expense: ', expense); //[x]

    //get date published and views
    await pageDet.waitForSelector(QUERY_SEARCHER.PUB_VIEW);
    const published = await pageDet.$$eval(
      QUERY_SEARCHER.PUB_VIEW,
      (selector) => selector[0]?.textContent,
    );
    const views = await pageDet.$$eval(
      QUERY_SEARCHER.PUB_VIEW,
      (selector) => selector[1]?.textContent,
    );
    console.log('published: ', published); //[x]
    console.log('views: ', views); //[x]

    //get address
    await pageDet.waitForSelector(QUERY_SEARCHER.ADDRESS);
    const address = await pageDet.$eval(
      QUERY_SEARCHER.ADDRESS,
      (selector) => selector.innerText.split('\n')[0],
    );
    console.log('address: ', address); //[x]

    //get all features
    await pageDet.waitForSelector(QUERY_SEARCHER.FEATURE_DEPT);
    const featuresDept = await pageDet.$$eval(
      QUERY_SEARCHER.FEATURE_DEPT,
      (selector) => {
        const arr = [];
        selector.forEach((item) => {
          arr.push(item.innerText);
        });
        return arr;
      },
    );
    console.log('featuresDept: ', featuresDept); //[x]

    //get all features general
    let featuresGral: string[];
    try {
      await pageDet.waitForSelector(QUERY_SEARCHER.FEATURE_GRAL, {
        timeout: 10000,
      });
      const featuresGral = await pageDet.$$eval(
        QUERY_SEARCHER.FEATURE_GRAL,
        (selector) => {
          const arr = [];
          selector.forEach((item) => {
            arr.push(item.innerText.replace('\n', ''));
          });
          return arr;
        },
      );
      console.log('featuresGral: ', featuresGral); //[x]
    } catch (error) {
      featuresGral = [];
    }

    await browserDet.close();
  }
  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
