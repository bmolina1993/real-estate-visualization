export interface IProccessDBModelService {
  postFnCleansingFeatureDepto(): Promise<void>;
  postTrCleansingFeatureDepto(): Promise<void>;
  postFnCleansingGeolocation(): Promise<void>;
  postTrCleansingGeolocation(): Promise<void>;
  postFnArraySetElement(): Promise<void>;
  postFnProcessesDataEstate(): Promise<void>;
  postTrProcessesDataEstate(): Promise<void>;
  postFnPrice(): Promise<void>;
  postVwFullData(): Promise<void>;
}
