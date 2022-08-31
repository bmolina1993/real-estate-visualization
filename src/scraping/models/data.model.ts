import puppeteer from 'puppeteer';
import { IDataEstate } from '../dtos/dataEstate.dto';

interface IDataModelService {
  openBrowser(): Promise<puppeteer.Browser>;
  openPage(url: string, browser: puppeteer.Browser): Promise<puppeteer.Page>;
  getTotalResult(): Promise<number | null>;
  getTotalPage(total: number): number;
  getAllLinksPerPage(): Promise<string[] | null>;
  getPrice(link: string): Promise<string | null>;
  getExpense(link: string): Promise<string | null>;
  getDatePublished(link: string): Promise<string | null>;
  getViews(link: string): Promise<string | null>;
  getAddress(link: string): Promise<string>;
  getFeatureDept(link: string): Promise<string[] | null>;
  getFeatureGral(link: string): Promise<string[] | null>;
  getLinkMap(link: string): Promise<string | null>;
  extrallAllData(links: string[]): Promise<IDataEstate[]>;
}

export { IDataModelService };
