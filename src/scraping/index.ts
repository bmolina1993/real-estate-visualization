import { DataEstateService } from './services/data.service';

(async () => {
  // instanced service
  const dataService = new DataEstateService();

  const totalResult = await dataService.getTotalResult();
  const totalPage = dataService.getTotalPage(totalResult);
  const arrCardlinks = await dataService.getAllLinksPerPage();

  console.log('totalResult: ', totalResult); //[x]
  console.log('totalPage: ', totalPage); //[x]
  console.log('arrCardlinks: ', arrCardlinks); //[x]

  // access to each link
  // open a new browser if required for security of page
  //[X] [arrCardlinks[0]]
  const alllDataEstate = await dataService.extrallAllData(arrCardlinks);
  console.log('alllDataEstate: ', alllDataEstate); //[x]

  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
