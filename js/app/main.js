define(function(require) {
  return {
    init: function() {
      var $ = require('jquery');
      var _ = require('underscore');
      var hbs = require('handlebars');
      var upnpDeviceTemplate = require('hbs!./templates/upnp-device');

      var vera = require('vera');

      var log = function() {
        console.log(arguments);
      };

      var isUpnpDevice = function(device){
        return device.device_type.indexOf("urn:schemas-upnp-org:device") !== -1;
      };

      var createDeviceElement = function(device) {
        return upnpDeviceTemplate({ name: device.name, id: device.id });
      };

      var appendElementToDevicesList = function(deviceElement) {
        $('.devices').append(deviceElement);
      };

      var showDevices = function(data) {
        $('.devices').empty();
        _.chain(data.devices).filter(isUpnpDevice).map(createDeviceElement).each(appendElementToDevicesList);
        $('.js-on-button').click(function(event) {
          console.log(event)
          var deviceId = event.target.attributes["data-device-id"].value

          vera.dataRequest("lu_action", {
            "output_format": "json",
            "DeviceNum": deviceId,
            "serviceId": "urn:upnp-org:serviceId:Dimming1",
            "action": "SetLoadLevelTarget",
            "newLoadlevelTarget": "100",
            "rand": "0.2725291810929775"
          })
        })
      };

      vera.dataRequest("user_data")
        .done(showDevices)
        .error(log);
    }
  };
});