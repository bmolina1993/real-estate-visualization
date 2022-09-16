//import { DataEstateService } from './services/data.service';
import { DataSql } from './services/dataSql.service';

(async () => {
  // ---------------------------------------------------
  // instanced service for data scrapping extract - [01]
  // ---------------------------------------------------
  /*
  const dataService = new DataEstateService();

  
  const totalResult = await dataService.getTotalResult();
  const totalPage = dataService.getTotalPage(totalResult);
  const alllDataEstate = await dataService.extrallAllData(totalPage);

  console.log('totalResult: ', totalResult); //[x]
  console.log('totalPage: ', totalPage); //[x]
  console.log('alllDataEstate: ', alllDataEstate[0]); //[x]
*/

  // ----------------------------------------------------
  // instanced service for data insert to database - [02]
  // ----------------------------------------------------
  const dataSql = new DataSql();
  //const data = await dataSql.getAll();
  //console.log('🚀 ~ file: index.ts ~ line 21 ~ data', data);

  dataSql.setAll();
})();
