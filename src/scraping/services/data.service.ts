import { IDataModelService } from '../models/data.model';
import puppeteer from 'puppeteer';
import { PARAMS_SEARCHER, QUERY_SEARCHER } from '../models/page.model';
import { IDataEstate } from '../dtos/dataEstate.dto';

// ---------
// variables
// ---------
//const URL_PAGE = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}.html`;
//const PATH_FILE_IMAGE = 'src/scraping/images/';
// const settingLunch = {
//   headless: false,
//   slowMo: 0,
//   devtools: false,
//   defaultViewport: null,
// };

class DataEstateService implements IDataModelService {
  private URL_PAGE = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}.html`;
  private PATH_FILE_IMAGE = 'src/scraping/images/';
  private settingLunch = {
    headless: false,
    slowMo: 0,
    devtools: false,
    defaultViewport: null,
  };

  async openBrowser() {
    const browser = await puppeteer.launch(this.settingLunch);
    return browser;
  }

  async openPage(url: string, browser: puppeteer.Browser) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    return page;
  }

  // inspect the page for extract data
  // extract total result of page filtered
  async getTotalResult() {
    const browser = await this.openBrowser();
    const page = await this.openPage(this.URL_PAGE, browser);
    let totalResult: number | null;

    // capture screenshot
    await page.screenshot({ path: this.PATH_FILE_IMAGE + 'home.png' });

    // $eval = querySelector
    // input: 193 Departamentos en alquiler en Villa Urquiza
    // output: 193
    try {
      await page.waitForSelector(QUERY_SEARCHER.TOTAL_RESULT, {
        timeout: 10000,
      });
      totalResult = await page.$eval(
        QUERY_SEARCHER.TOTAL_RESULT,
        (selector: HTMLElement) =>
          Number(selector.textContent.split(' ', 1)[0]),
      );
    } catch (error) {
      totalResult = null;
    }

    await browser.close();
    return totalResult;
  }

  // average page by total result cosidering 20 page per page
  getTotalPage(total: number) {
    const totalPageByResult = Math.round(
      total / PARAMS_SEARCHER.QTY_RESULT_DEFAULT,
    );
    return totalPageByResult;
  }

  // $$eval = querySelectorAll
  // extract all url pages per card
  async getAllLinksPerPage() {
    const browser = await this.openBrowser();
    const page = await this.openPage(this.URL_PAGE, browser);
    let arrCardlinks: string[] | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.CARD_URL, { timeout: 10000 });
      arrCardlinks = await page.$$eval(
        QUERY_SEARCHER.CARD_URL,
        (selector: HTMLElement[]) => {
          const links = [];
          selector.forEach((item) => {
            links.push(
              item.attributes.getNamedItem('data-to-posting').textContent,
            );
          });
          return links;
        },
      );

      // add domain for each endPoint link
      // item: remove first slash from endPoint
      arrCardlinks = arrCardlinks.map(
        (item) => PARAMS_SEARCHER.DOMAIN + item.substring(1),
      );
    } catch (error) {
      arrCardlinks = null;
    }

    await browser.close();
    return arrCardlinks;
  }

  async getPrice(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let price: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.PRICE, { timeout: 10000 });
      price = await page.$eval(
        QUERY_SEARCHER.PRICE,
        (selector: HTMLElement) => selector?.innerText,
      );
    } catch (error) {
      price = null;
    }

    await browser.close();
    return price;
  }

  async getExpense(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let expense: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.EXPENSE, { timeout: 10000 });
      expense = await page.$eval(
        QUERY_SEARCHER.EXPENSE,
        (selector: HTMLElement) => selector?.innerText,
      );
    } catch (error) {
      expense = null;
    }

    await browser.close();
    return expense;
  }

  async getDatePublished(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let published: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.PUB_VIEW, { timeout: 10000 });
      published = await page.$$eval(
        QUERY_SEARCHER.PUB_VIEW,
        (selector: HTMLElement[]) => selector[0]?.textContent,
      );
    } catch (error) {
      published = null;
    }

    await browser.close();
    return published;
  }

  async getViews(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let views: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.PUB_VIEW, { timeout: 10000 });
      views = await page.$$eval(
        QUERY_SEARCHER.PUB_VIEW,
        (selector: HTMLElement[]) => selector[1]?.textContent,
      );
    } catch (error) {
      views = null;
    }

    await browser.close();
    return views;
  }

  async getAddress(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let address: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.ADDRESS, { timeout: 10000 });
      address = await page.$eval(
        QUERY_SEARCHER.ADDRESS,
        (selector: HTMLElement) => selector.innerText.split('\n')[0],
      );
    } catch (error) {
      address = null;
    }
    await browser.close();
    return address;
  }

  async getFeatureDept(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let featuresDept: string[] | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.FEATURE_DEPT);
      featuresDept = await page.$$eval(
        QUERY_SEARCHER.FEATURE_DEPT,
        (selector: HTMLElement[]) => {
          const arr = [];
          selector.forEach((item) => {
            arr.push(item.innerText);
          });
          return arr;
        },
      );
    } catch (error) {
      featuresDept = null;
    }

    await browser.close();
    return featuresDept;
  }

  async getFeatureGral(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let featuresGral: string[] | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.FEATURE_GRAL, {
        timeout: 10000,
      });
      featuresGral = await page.$$eval(
        QUERY_SEARCHER.FEATURE_GRAL,
        (selector: HTMLElement[]) => {
          const arr = [];
          selector.forEach((item) => {
            arr.push(item.innerText.replace('\n', ''));
          });
          return arr;
        },
      );
    } catch (error) {
      featuresGral = null;
    }

    await browser.close();
    return featuresGral;
  }

  async getLinkMap(link: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(link, browser);
    let linkMap: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.GEOLOCATION);
      linkMap = await page.$eval(
        QUERY_SEARCHER.GEOLOCATION,
        (selector: HTMLImageElement) => selector.src,
      );
    } catch (error) {
      linkMap = null;
    }

    await browser.close();
    return linkMap;
  }

  async extrallAllData(links: string[]) {
    const alllDataEstate: IDataEstate[] = [];

    for (const link of links) {
      const price = await this.getPrice(link);
      const expense = await this.getExpense(link);
      const published = await this.getDatePublished(link);
      const views = await this.getViews(link);
      const address = await this.getAddress(link);
      const featuresDept = await this.getFeatureDept(link);
      const featuresGral = await this.getFeatureGral(link);
      const linkMap = await this.getLinkMap(link);

      //insert all data
      alllDataEstate.push({
        price: price,
        expense: expense,
        published: published,
        views: views,
        address: address,
        featureDept: featuresDept,
        featureGral: featuresGral,
        linkMap: linkMap,
      });
    }

    return alllDataEstate;
  }
}

export { DataEstateService };
