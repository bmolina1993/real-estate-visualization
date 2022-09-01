import { DataEstateService } from './services/data.service';

(async () => {
  // instanced service
  const dataService = new DataEstateService();

  const totalResult = await dataService.getTotalResult();
  const totalPage = dataService.getTotalPage(totalResult);
  const alllDataEstate = await dataService.extrallAllData(totalPage);

  console.log('totalResult: ', totalResult); //[x]
  console.log('totalPage: ', totalPage); //[x]
  console.log('alllDataEstate: ', alllDataEstate); //[x]

  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
