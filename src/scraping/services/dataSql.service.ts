import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

import { Singleton } from './dbConection.service';
import { IDataSqlModelService } from '../models/dataSql.model';
import { DataEstate } from '../../database/entities/dataEstate.entity';
import { IDataEstate } from '../dtos/dataEstate.dto';

export class DataSql implements IDataSqlModelService {
  private PATH_FOLDER_DATA = resolve('./src/scraping/data/');

  async getAll() {
    const dataSource = await Singleton.getInstance();
    return await dataSource
      .getRepository(DataEstate)
      .createQueryBuilder('dataEstate')
      .getMany();
  }

  async setAll() {
    const dataSource = await Singleton.getInstance();
    const arrFolder = readdirSync(this.PATH_FOLDER_DATA);
    // get the last date folder created
    const lastFolderDate = [...arrFolder].sort(
      (a, z) => new Date(z).getTime() - new Date(a).getTime(),
    )[0];
    const PATH_FILE_DATA = resolve(
      `${this.PATH_FOLDER_DATA}/${lastFolderDate}/data.json`,
    );

    const dataJson: IDataEstate[] = JSON.parse(
      readFileSync(PATH_FILE_DATA, 'utf-8'),
    );

    dataJson.forEach(async (item) => {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(DataEstate)
        .values({
          price: item.price,
          expense: item.expense,
          published: item.published,
          views: item.views,
          address: item.address,
          featureDept: item.featureDept,
          featureGral: item.featureGral,
          linkMap: item.linkMap,
          linkBase: item.linkBase,
          linkDepto: item.linkDepto,
          createDttm: item.createDttm,
        })
        .execute();
    });
  }
}
