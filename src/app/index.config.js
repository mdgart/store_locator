(function() {
  'use strict';

  angular
    .module('storeLocator')
    .config(config);

  /** @ngInject */
  function config($logProvider, uiGmapGoogleMapApiProvider, GOOGLE_API_KEY,
    RestangularProvider, API_HOST) {
    // Enable log
    $logProvider.debugEnabled(true);
    uiGmapGoogleMapApiProvider.configure({
        key: GOOGLE_API_KEY,
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    RestangularProvider
    .setBaseUrl(API_HOST);
  }

})();
