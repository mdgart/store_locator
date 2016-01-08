(function() {
  'use strict';

  angular
    .module('storeLocator')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(uiGmapGoogleMapApi, markersUtils) {

    var vm = this;

    // locations array
    vm.locations = [];

    // center Object
    var map_center = {
      latitude: 34.0279895,
      longitude: -118.495155
    }

    // private function to create random markers
    var _createMarker = function(location, counter) {
      var ret = {
        number: counter,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        address: location.address,
        region: location.region,
        description: location.description,
        address_extended: location.address_extended,
        postcode: location.postcode,
        locality: location.locality,
        phone: location.phone,
        website: location.website,
        hours: location.hours,
        order_url: location.order_url,
        additional_info: false,
        manager_name: location.manager_name,
        special_hours: location.special_hours,
        options: {
          labelClass: 'marker_labels',
          labelAnchor: counter > 9 ? '5 25': '2 25',
          labelContent: counter},
        icon: "/assets/images/poi_icon.png"
      };
      ret["id"] = location.id;
      return ret;
    };

    vm.performSearch = function(keyEvent) {
      if (keyEvent.which === 13 && vm.search) {
        markersUtils.getLatLogFromAddress(vm.search).then(function(data){
          var current_location = data.results[0]
          vm.current_location = current_location.formatted_address;
          vm.map.center = {
            latitude: current_location.geometry.location.lat,
            longitude: current_location.geometry.location.lng
          }
          vm.changeZoom = 9;
        }, function(error){
          vm.errors = error;
        });
      }
    }

    vm.changeZoom = function(zoomLevel){
      vm.map.zoom = zoomLevel;
    }

    vm.showAdditionalInfo = function(location) {
      location.additional_info = !location.additional_info;
    }

    uiGmapGoogleMapApi.then(function() {
      // get browser coordinates
      if (navigator.geolocation) {
        //vm.notifications = "Retriving your current location...";
        navigator.geolocation.getCurrentPosition(setNewCoordinates);
      }

      function setNewCoordinates(position) {
        vm.map.center =  {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        vm.notifications = "";
      }

      // initial map setup
      vm.map = {
        center: map_center,
        zoom: 9,
        bounds: {},
        events: {
          idle: function(map) {
            var markers = [];
            var bounds = map.getBounds();
            if (Object.keys(bounds).length) {
              markersUtils.getLocation(bounds).then(function(data){
                var counter = 1;
                data.locations.forEach(function(location){
                  markers.push(_createMarker(location, counter));
                  counter++;
                });
                vm.locations = markers;
              }, function (error) {
                vm.errors = error;
              });
            }
          },
          dragend: function() {
            vm.current_location = "";
            vm.search = "";
          }
        }
      };

      // custom options setup
      vm.options = {
        scrollwheel: false
      };

      vm.showWindow = function(marker_id) {
        var marker = vm.locations[marker_id];
        marker.show = true;
      }

      vm.hideWindow = function(marker_id) {
        var marker = vm.locations[marker_id];
        marker.show = false;
      }

    });
  }
})();
