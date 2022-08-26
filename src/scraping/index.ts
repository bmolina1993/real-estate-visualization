// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

// ---------
// variables
// ---------
enum PARAMS_PAGE {
  DOMAIN = 'https://www.zonaprop.com.ar/',
  UBICATION = 'villa-urquiza-capital-federal',
}
//const DOMAIN = 'https://www.zonaprop.com.ar/';
//const UBICATION = 'villa-urquiza-capital-federal';
//const URL = `${DOMAIN}departamentos-venta-q-${UBICATION}.html`;
const URL_PAGE = `${PARAMS_PAGE.DOMAIN}departamentos-venta-q-${PARAMS_PAGE.UBICATION}.html`;
const PATH_FILE_IMAGE = 'src/scraping/images/';
//const INPUT_SEARCH = '[data-qa=search-input] input';
//const BUTTON_SEARCH = '[data-qa=search-button]';
//const BUTTON_SEARCH = '.apply-filters button';
//const COMPONENT_CARD = 'postings-container';

(async () => {
  //headless: open browser  [temp]
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL_PAGE);
  // capture screenshot
  await page.screenshot({ path: PATH_FILE_IMAGE + 'home.png' });

  // write in input tag
  //await page.type(INPUT_SEARCH, 'Villa Urquiza, Capital Federal');
  //await new Promise((r) => setTimeout(r, 3000));
  // capture screenshot
  //await page.screenshot({ path: PATH_FILE_IMAGE + 'inputTag.png' });

  // click on button search
  //await page.click(BUTTON_SEARCH);
  //await for appear this selector
  //await page.waitForSelector(COMPONENT_CARD);
  // capture screenshot
  //await page.screenshot({ path: PATH_FILE_IMAGE + 'villa_urquiza.png' });

  //await for specific time for watch the result on navegator
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
})();
