import { ProccessDB } from './services/proccessDB.service';

(async () => {
  // -----------------
  // instanced service
  // -----------------
  const dataSql = new ProccessDB();

  // -------------
  // feature_depto
  // -------------

  // fuction
  await dataSql.postFnCleansingFeatureDepto();

  // trigger
  await dataSql.postTrCleansingFeatureDepto();

  // -----------
  // geolocation
  // -----------

  // fuction
  await dataSql.postFnCleansingGeolocation();

  // trigger
  await dataSql.postTrCleansingGeolocation();

  // -----------
  // data_estate
  // -----------

  // fuction
  await dataSql.postFnArraySetElement();

  // fuction
  await dataSql.postFnProcessesDataEstate();

  // trigger
  await dataSql.postTrProcessesDataEstate();

  // fuction
  await dataSql.postFnPrice();

  // view
  await dataSql.postVwFullData();
})();
