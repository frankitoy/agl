const PROXY_CONFIG = {
  '/api/*': {
    'target': 'http://agl-developer-test.azurewebsites.net',
    'logLevel': 'debug',
    'changeOrigin': true,
    'secure': false,
  }
};

module.exports = PROXY_CONFIG;
