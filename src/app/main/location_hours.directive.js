(function() {
  'use strict';

  angular
    .module('storeLocator')
    .directive('locationHours', locationHours);

  function locationHours() {
    return {
      scope: {
        hours: '=hours'
      },
      replace: true,
      templateUrl: "app/main/location_hours.directive.html",
      link: function(scope, element, attr) {
        if (scope.hours) {
          var hours_array = [];
          var _hours_array = scope.hours.split(";");
          _hours_array.forEach(function(hour){
            hours_array.push(hour.split(","));
          });
          scope.hours = hours_array;
        }
      }
    }
  }
})();
