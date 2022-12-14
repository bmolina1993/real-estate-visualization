import { DataEstateService } from './services/data.service';

(async () => {
  // --------------------------------------------
  // instanced service for data scrapping extract
  // --------------------------------------------
  const dataService = new DataEstateService();

  const totalResult = await dataService.getTotalResult();
  const totalPage = dataService.getTotalPage(totalResult);
  const alllDataEstate = await dataService.extrallAllData(totalPage);

  console.log('totalResult: ', totalResult); //[x]
  console.log('totalPage: ', totalPage); //[x]
  console.log('alllDataEstate: ', alllDataEstate[0]); //[x]
})();
