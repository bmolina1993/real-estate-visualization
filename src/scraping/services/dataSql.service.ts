import { readFileSync } from 'fs';
import { resolve } from 'path';

import { Singleton } from './dbConection.service';
import { IDataSqlModelService } from '../models/dataSql.model';
import { DataEstate } from '../../database/entities/dataEstate.entity';
import { IDataEstate } from '../dtos/dataEstate.dto';

export class DataSql implements IDataSqlModelService {
  private PATH_FILE_DATA = resolve('./src/scraping/data/data.json');

  async getAll() {
    const dataSource = await Singleton.getInstance();
    return await dataSource
      .getRepository(DataEstate)
      .createQueryBuilder('dataEstate')
      .getMany();
  }

  async setAll() {
    const dataSource = await Singleton.getInstance();
    const dataJson: IDataEstate[] = JSON.parse(
      readFileSync(this.PATH_FILE_DATA, 'utf-8'),
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
        })
        .execute();
    });
  }
}
