enum PARAMS_SEARCHER {
  DOMAIN = 'https://www.zonaprop.com.ar/',
  QTY_RESULT_DEFAULT = 20,
  UBICATION = 'villa-urquiza',
  ALQUILER = 'alquiler',
  VENTA = 'venta',
  DEPARTAMENTOS = 'departamentos',
  PAGINA = 'pagina-',
}

// ^ represent that start with the value and the rest wildcard
enum QUERY_SEARCHER {
  //TOTAL_RESULT = '[class^=postingsTitle__Title]',[OLD version, changed in the page]
  //CARD_URL = '[class^=components__CardContainer] [data-to-posting]',[OLD version, changed in the page]
  TOTAL_RESULT = 'body h1',
  CARD_URL = '[data-to-posting]',
  PRICE = '.price-items span',
  EXPENSE = '[class^=block-expensas] span',
  PUB_VIEW = '#user-views p',
  ADDRESS = '.title-location',
  FEATURE_DEPT = '.section-icon-features .icon-feature',
  FEATURE_GRAL = '#reactGeneralFeatures [data-element=accordionContent] li',
  GEOLOCATION = '#article-map #static-map',
}

export { PARAMS_SEARCHER, QUERY_SEARCHER };
