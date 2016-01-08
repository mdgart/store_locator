(function() {
  'use strict';

  angular
    .module('storeLocator')
    .service('markersUtils', markersUtils);

  function markersUtils(GOOGLE_API_KEY, GOOGLE_GEOCODE_URL, Restangular) {

    this.getLatLogFromAddress = function(address) {
      return Restangular.oneUrl('geocode', GOOGLE_GEOCODE_URL)
        .get({
          "key": GOOGLE_API_KEY,
          "address": address
        });
    }

    this.getLocation = function(bounds) {
      var locations = Restangular.one('search_locations');
      return locations.get({
        "minlat": bounds.Ha.G,
        "maxlat": bounds.Ha.j,
        "minlng": bounds.Aa.G,
        "maxlng": bounds.Aa.j,
        "account_id": "52965f7bd6116c23fb0617af"
      });
    }
  }
})();
