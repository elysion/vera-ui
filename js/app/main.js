define(function(require) {
  return {
    init: function() {
      var $ = require('jquery');
      var _ = require('underscore');
      var upnpDeviceTemplate = require('hbs!./templates/upnp-device');

      var DeviceStatus = require('./device-status');
      var UpnpDevice = require('./upnp-device');
      var Vera = require('./vera');

      var log = function() {
        console.log(arguments);
      };

      var createDeviceElement = function(device) {
        return upnpDeviceTemplate({ name: device.name, id: device.id });
      };

      var appendToDevicesList = function(device) {
        var element = $(createDeviceElement(device)).appendTo('.devices');
        element.find('.js-on-button').click(_.partial(UpnpDevice.setDeviceStatus, device, DeviceStatus.ON));
        element.find('.js-off-button').click(_.partial(UpnpDevice.setDeviceStatus, device, DeviceStatus.OFF));
      };

      var showDevices = function(data) {
        $('.devices').empty();
        _.chain(data.devices).filter(UpnpDevice.isUpnpDevice).each(appendToDevicesList);
      };

      Vera.dataRequest("user_data")
        .done(showDevices)
        .error(log);
    }
  };
});