import puppeteer from 'puppeteer';
import { IDataEstate } from '../dtos/dataEstate.dto';

interface IDataModelService {
  openBrowser(): Promise<puppeteer.Browser>;
  openPage(url: string, browser: puppeteer.Browser): Promise<puppeteer.Page>;
  getTotalResult(): Promise<number | null>;
  getTotalPage(total: number): number;
  getAllLinksPerPage(URL_PAGE: string): Promise<string[] | null>;
  getPrice(page: puppeteer.Page): Promise<string | null>;
  getExpense(page: puppeteer.Page): Promise<string | null>;
  getDatePublished(page: puppeteer.Page): Promise<string | null>;
  getViews(page: puppeteer.Page): Promise<string | null>;
  getAddress(page: puppeteer.Page): Promise<string>;
  getFeatureDept(page: puppeteer.Page): Promise<string[] | null>;
  getFeatureGral(page: puppeteer.Page): Promise<string[] | null>;
  getLinkMap(page: puppeteer.Page): Promise<string | null>;
  extrallAllData(totalPage: number): Promise<IDataEstate[]>;
}

export { IDataModelService };
