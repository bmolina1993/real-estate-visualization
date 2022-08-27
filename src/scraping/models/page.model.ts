enum PARAMS_SEARCHER {
  DOMAIN = 'https://www.zonaprop.com.ar/',
  UBICATION = 'villa-urquiza',
  ALQUILER = 'alquiler',
  VENTA = 'venta',
  DEPARTAMENTOS = 'departamentos',
}

// ^ represent that start with the value and the rest wildcard
enum QUERY_SEARCHER {
  TOTAL_RESULT = '[class^=postingsTitle__Title]',
  CARD_URL = '[class^=components__CardContainer] [data-to-posting]',
}

export { PARAMS_SEARCHER, QUERY_SEARCHER };
