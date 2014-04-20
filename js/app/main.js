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

      var appendToDevicesList = function(device) {
        console.log($('.devices'));
        var element = $(createDeviceElement(device)).appendTo('.devices');
        element.find('.js-on-button').click(_.partial(switchOnDevice, device));
      };

      var switchOnDevice = function(device) {
        vera.dataRequest("lu_action", {
          "output_format": "json",
          "DeviceNum": device.id,
          "serviceId": "urn:upnp-org:serviceId:SwitchPower1",
          "action": "SetTarget",
          "newTargetValue": "1",
          "rand": Math.random()
        }).done(log)
          .error(log);
      };

      var showDevices = function(data) {
        $('.devices').empty();
        _.chain(data.devices).filter(isUpnpDevice).each(appendToDevicesList);
      };

      vera.dataRequest("user_data")
        .done(showDevices)
        .error(log);
    }
  };
});