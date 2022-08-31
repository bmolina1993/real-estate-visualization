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
  //const alllDataEstate = await dataService.extrallAllData(arrCardlinks);
  //console.log('alllDataEstate: ', alllDataEstate); //[x]

  /*
  const alllDataEstate: IDataEstate[] = [];
  for (const link of arrCardlinks) {
    const browserDet = await puppeteer.launch(settingLunch);
    const pageDet = await browserDet.newPage();

    await pageDet.goto(link, { waitUntil: 'load' });


    //get price
    await pageDet.waitForSelector(QUERY_SEARCHER.PRICE);
    const price = await pageDet.$eval(
      QUERY_SEARCHER.PRICE,
      (selector: HTMLElement) => selector?.innerText,
    );
    //console.log('price: ', price); //[x]


    // get expense
    // if element not exist, add field with null data
    let expense: string;
    try {
      await pageDet.waitForSelector(QUERY_SEARCHER.EXPENSE, { timeout: 10000 });
      expense = await pageDet.$eval(
        QUERY_SEARCHER.EXPENSE,
        (selector: HTMLElement) => selector?.innerText,
      );
    } catch (error) {
      expense = null;
    }
    //console.log('expense: ', expense); //[x]


    //get date published and views
    await pageDet.waitForSelector(QUERY_SEARCHER.PUB_VIEW);
    const published = await pageDet.$$eval(
      QUERY_SEARCHER.PUB_VIEW,
      (selector: HTMLElement[]) => selector[0]?.textContent,
    );
    const views = await pageDet.$$eval(
      QUERY_SEARCHER.PUB_VIEW,
      (selector: HTMLElement[]) => selector[1]?.textContent,
    );
    //console.log('published: ', published); //[x]
    //console.log('views: ', views); //[x]
    

    //get address
    await pageDet.waitForSelector(QUERY_SEARCHER.ADDRESS);
    const address = await pageDet.$eval(
      QUERY_SEARCHER.ADDRESS,
      (selector: HTMLElement) => selector.innerText.split('\n')[0],
    );
    //console.log('address: ', address); //[x]

    //get all features
    await pageDet.waitForSelector(QUERY_SEARCHER.FEATURE_DEPT);
    const featuresDept = await pageDet.$$eval(
      QUERY_SEARCHER.FEATURE_DEPT,
      (selector: HTMLElement[]) => {
        const arr = [];
        selector.forEach((item) => {
          arr.push(item.innerText);
        });
        return arr;
      },
    );
    //console.log('featuresDept: ', featuresDept); //[x]

    //get all features general
    let featuresGral: string[];
    try {
      await pageDet.waitForSelector(QUERY_SEARCHER.FEATURE_GRAL, {
        timeout: 10000,
      });
      featuresGral = await pageDet.$$eval(
        QUERY_SEARCHER.FEATURE_GRAL,
        (selector: HTMLElement[]) => {
          const arr = [];
          selector.forEach((item) => {
            arr.push(item.innerText.replace('\n', ''));
          });
          return arr;
        },
      );
    } catch (error) {
      featuresGral = [];
    }
    //console.log('featuresGral: ', featuresGral); //[x]

    // get url google map from tag
    await pageDet.waitForSelector(QUERY_SEARCHER.GEOLOCATION);
    const linkMap = await pageDet.$eval(
      QUERY_SEARCHER.GEOLOCATION,
      (selector: HTMLImageElement) => selector.src,
    );
    //console.log('linkMap: ', linkMap); //[x]


    // save all data
    alllDataEstate.push({
      price: price,
      expense: expense,
      published: published,
      views: views,
      address: address,
      featureDept: featuresDept,
      featureGral: featuresGral,
      linkMap: linkMap,
    });

    await browserDet.close();
  }
  console.log('alllDataEstate: ', alllDataEstate); //[x]
*/
  //await for specific time for watch the result on navegator
  //await new Promise((r) => setTimeout(r, 60000));
})();
