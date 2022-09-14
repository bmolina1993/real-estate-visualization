import { dataSource } from '../database/dataSource';
//import { DataEstateService } from './services/data.service';
//import { DataEstateInsertService } from './services/dataInsert.service';
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
  const repository = await dataSource.initialize();
  const data = await repository
    .getRepository(DataEstate)
    .createQueryBuilder('DataEstate')
    .getMany();
  console.log('🚀 ~ file: index.ts ~ line 26 ~ data', data);

  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
