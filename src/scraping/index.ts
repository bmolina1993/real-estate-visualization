import { DataEstateService } from './services/data.service';
import { connectionSource } from '../database/dataSource';
import { DataEstate } from '../database/entities/dataEstate.entity';
(async () => {
  // instanced service
  /*
  const dataService = new DataEstateService();
  
  
  const totalResult = await dataService.getTotalResult();
  const totalPage = dataService.getTotalPage(totalResult);
  const alllDataEstate = await dataService.extrallAllData(totalPage);

  console.log('totalResult: ', totalResult); //[x]
  console.log('totalPage: ', totalPage); //[x]
  console.log('alllDataEstate: ', alllDataEstate[0]); //[x]
*/

  //QueryBuilder
  const dataSource = connectionSource;
  /*
  const sql = await dataSource
    .createQueryBuilder()
    .select()
    .from(DataEstate, 'dataEstate')
    .getMany();
  */
  const sql = await dataSource
    .getRepository(DataEstate)
    .createQueryBuilder('dataEstate')
    .getMany();

  console.log('🚀 ~ file: index.ts ~ line 18 ~ sql: ', sql);

  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
