//import { DataEstateService } from './services/data.service';
import { DataSql } from './services/dataSql.service';

(async () => {
  // ---------------------------------------------
  // instanced service for data insert to database
  // ---------------------------------------------
  const dataSql = new DataSql();

  // get all data from table [public.data_estate]
  //const data = await dataSql.getAll();
  //console.log('🚀 ~ file: dataSql.index.ts ~ line 12 ~ data:', data);

  // insert all data .jdon to table [public.data_estate]
  await dataSql.setAll();
})();
