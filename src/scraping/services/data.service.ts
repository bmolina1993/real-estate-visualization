import puppeteer from 'puppeteer';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

import { IDataModelService } from '../models/data.model';
import { PARAMS_SEARCHER, QUERY_SEARCHER } from '../models/page.model';
import { IDataEstate } from '../dtos/dataEstate.dto';

class DataEstateService implements IDataModelService {
  //private URL_PAGE = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}-${PARAMS_SEARCHER.PAGINA}.html`;
  private URL_PATH = `${PARAMS_SEARCHER.DOMAIN}${PARAMS_SEARCHER.DEPARTAMENTOS}-${PARAMS_SEARCHER.ALQUILER}-${PARAMS_SEARCHER.UBICATION}`;
  private URL_PAGE = `${this.URL_PATH}-${PARAMS_SEARCHER.PAGINA}1.html`;
  private PATH_FILE_IMAGE = 'src/scraping/images/';
  private settingLunch = {
    headless: false,
    executablePath:
      'C:\\Users\\Braian\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    slowMo: 0,
    //slowMo: 500,
    devtools: false,
    defaultViewport: null,
  };
  private PATH_FILE_DATA = resolve('./src/scraping/data/data.json');

  async openBrowser() {
    const browser = await puppeteer.launch(this.settingLunch);
    return browser;
  }

  async openPage(url: string, browser: puppeteer.Browser) {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
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
    const totalPageByResult = Math.ceil(
      total / PARAMS_SEARCHER.QTY_RESULT_DEFAULT,
    );
    return totalPageByResult;
  }

  // $$eval = querySelectorAll
  // extract all url pages per card
  async getAllLinksPerPage(URL_PAGE: string) {
    const browser = await this.openBrowser();
    const page = await this.openPage(URL_PAGE, browser);
    let arrCardlinks: string[] | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.CARD_URL, { timeout: 10000 });
      arrCardlinks = await page.$$eval(
        QUERY_SEARCHER.CARD_URL,
        (selector: HTMLElement[]) => {
          const links: string[] = [];
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
      //ordena valores
      arrCardlinks.sort((a, z) => a.localeCompare(z));
    } catch (error) {
      arrCardlinks = null;
    }

    await browser.close();
    return arrCardlinks;
  }

  async getPrice(page: puppeteer.Page) {
    let price: string | null;

    try {
      await page.waitForSelector(QUERY_SEARCHER.PRICE, { timeout: 10000 });
      price = await page.$eval(
        QUERY_SEARCHER.PRICE,
        (selector: HTMLElement) => selector?.innerText,
      );
    } catch (error) {
      price = error;
    }

    return price;
  }

  async getExpense(page: puppeteer.Page) {
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

    return expense;
  }

  async getDatePublished(page: puppeteer.Page) {
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

    return published;
  }

  async getViews(page: puppeteer.Page) {
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

    return views;
  }

  async getAddress(page: puppeteer.Page) {
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

    return address;
  }

  async getFeatureDept(page: puppeteer.Page) {
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

    return featuresDept;
  }

  async getFeatureGral(page: puppeteer.Page) {
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

    return featuresGral;
  }

  async getLinkMap(page: puppeteer.Page) {
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

    return linkMap;
  }

  async extrallAllData(totalPage: number) {
    const alllDataEstate: IDataEstate[] = [];

    for (let index = 1; index <= totalPage; index++) {
      const URL_PAGE = `${this.URL_PATH}-${PARAMS_SEARCHER.PAGINA}${index}.html`;
      const links = await this.getAllLinksPerPage(URL_PAGE);
      console.log('links: ', links);

      //[links[0]] : get all links of first page [X]
      //links : get all links of all page [X]
      for (const link of [links[0]]) {
        const browser = await this.openBrowser();
        const page = await this.openPage(link, browser);

        const price = await this.getPrice(page);
        const expense = await this.getExpense(page);
        const published = await this.getDatePublished(page);
        const views = await this.getViews(page);
        const address = await this.getAddress(page);
        const featuresDept = await this.getFeatureDept(page);
        const featuresGral = await this.getFeatureGral(page);
        const linkMap = await this.getLinkMap(page);

        // insert data
        alllDataEstate.unshift({
          price: price,
          expense: expense,
          published: published,
          views: views,
          address: address,
          featureDept: featuresDept,
          featureGral: featuresGral,
          linkMap: linkMap,
          linkBase: URL_PAGE,
          linkDepto: link,
          createDate: new Date().toLocaleString('es-ar'),
        });

        // if exist the file, add new data to the file
        // if not exist, create the file data.json
        if (existsSync(this.PATH_FILE_DATA)) {
          // read json file
          const prevDataJson: IDataEstate[] = JSON.parse(
            readFileSync(this.PATH_FILE_DATA, 'utf-8'),
          );

          // add new data
          prevDataJson.unshift({
            price: price,
            expense: expense,
            published: published,
            views: views,
            address: address,
            featureDept: featuresDept,
            featureGral: featuresGral,
            linkMap: linkMap,
            linkBase: URL_PAGE,
            linkDepto: link,
            createDate: new Date().toLocaleString('es-ar'),
          });

          // transform data
          const dataJson = JSON.stringify(prevDataJson);

          // save data
          writeFileSync(this.PATH_FILE_DATA, dataJson);
        } else {
          // transform data
          const dataJson = JSON.stringify(alllDataEstate);
          // save data
          writeFileSync(this.PATH_FILE_DATA, dataJson);
        }

        await browser.close();
      }
    }
    return alllDataEstate;
  }
}

export { DataEstateService };
