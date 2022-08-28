enum PARAMS_SEARCHER {
  DOMAIN = 'https://www.zonaprop.com.ar/',
  QTY_RESULT_DEFAULT = 20,
  UBICATION = 'villa-urquiza',
  ALQUILER = 'alquiler',
  VENTA = 'venta',
  DEPARTAMENTOS = 'departamentos',
}

// ^ represent that start with the value and the rest wildcard
enum QUERY_SEARCHER {
  TOTAL_RESULT = '[class^=postingsTitle__Title]',
  CARD_URL = '[class^=components__CardContainer] [data-to-posting]',
  PRICE = '.price-items span',
  EXPENSE = '[class^=block-expensas] span',
  PUB_VIEW = '#user-views p',
  ADDRESS = '.title-location',
  FEATURE_DEPT = '.section-icon-features .icon-feature',
  FEATURE_GRAL = '#reactGeneralFeatures [data-element=accordionContent] li',
  GEOLOCATION = '#article-map #static-map',
}

enum KeyValue {
  KEY = 'key',
  VALUE = 'value',
}

enum UrlQuery {
  CENTER = 'center',
  ZOOM = 'zoom',
  MARKERS = 'markers',
  KEY = 'key',
  SIZE = 'size',
  SENSOR = 'sensor',
  SCLAE = 'scale',
  SIGNATURE = 'signature',
  CHANNEL = 'channel',
}
interface IGeolocation {
  position?: string;
  latitude?: string;
  longitude?: string;
}

interface IUrlQuery {
  center?: string;
  zoom?: string;
  markers?: string;
  geolocation?: IGeolocation;
  key?: string;
  size?: string;
  sensor?: string;
  scale?: string;
  signature?: string;
  channel?: string;
}

const getKeyValue = (data: string, output: string): string => {
  // separate data for extract key/value
  const arrData = data.split('=');

  switch (output) {
    case KeyValue.KEY:
      return arrData[0].toString();
    case KeyValue.VALUE:
      return arrData[1].toString();
    default:
      return '';
  }
};

const urlParser = (data: string) => {
  //const obj ={}
  const obj: IUrlQuery = {};
  // get query params
  data = data.substring(data.indexOf('?') + 1);
  // remove text for concatenate
  data = data.replaceAll('&amp', '');
  // separate data per ";" simbol
  const arrData = data.split(';');

  // save data with specific fields
  arrData.forEach((item) => {
    switch (getKeyValue(item, KeyValue.KEY)) {
      case UrlQuery.CENTER:
        obj.center = getKeyValue(item, KeyValue.VALUE);
      case UrlQuery.MARKERS:
        obj.markers = getKeyValue(item, KeyValue.VALUE);
      case UrlQuery.SIZE:
        obj.size = getKeyValue(item, KeyValue.VALUE);
    }
  });

  // format geolocation data
  // only if exist data on "center" or "markers"  fields
  if (obj.markers) {
    obj.geolocation = {
      position: obj.markers,
      latitude: obj.markers.split(',')[0],
      longitude: obj.markers.split(',')[1],
    };
  }
  return obj;
};

interface IDataEstate {
  price?: string;
  expense?: string;
  published?: string;
  views?: string;
  address?: string;
  featureDept?: string[];
  featureGral?: string[];
  geolocation?: IGeolocation;
}

export { PARAMS_SEARCHER, QUERY_SEARCHER, urlParser, IDataEstate };
