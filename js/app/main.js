define(function(require) {
  return {
    init: function() {
      var $ = require('jquery');
      var _ = require('underscore');
      require('jquery-ui');

      var deviceTemplate = require('hbs!./templates/device');
      var sceneTemplate = require('hbs!./templates/scene');

      var DeviceStatus = require('./device-status');
      var UpnpDevice = require('./upnp-device');
      var Scene = require('./scene');
      var Vera = require('./vera');

      var log = function() {
        console.log(arguments);
      };

      var isDimmable = function(device) {
        return !device.device_type ? false : device.device_type.indexOf("urn:schemas-upnp-org:device:DimmableLight") !== -1;
      };

      var createDeviceElement = function(device) {
        return deviceTemplate({ name: device.name, id: device.id, dimmable: isDimmable(device) });
      };

      var createSceneTemplate = function(scene) {
        return sceneTemplate({ name: scene.name, id: scene.id });
      };

      var getInitialDimmerLevel = function(device) {
        var deviceDimmingState = _.findWhere(device.states, {
          "service": "urn:upnp-org:serviceId:Dimming1",
          "variable": "LoadLevelStatus"
        });

        return deviceDimmingState ? deviceDimmingState.value : 0;
      };

      var setDimmerLevelFromSlider = function(deviceId) {
        UpnpDevice.setDimmerLevel(deviceId, $(this).slider('value'));
      };

      var appendToDevicesList = function(device) {
        var element = $(createDeviceElement(device)).appendTo('.devices');
        element.find('.js-on-button').click(_.partial(UpnpDevice.setDeviceStatus, device.id, DeviceStatus.ON));
        element.find('.js-off-button').click(_.partial(UpnpDevice.setDeviceStatus, device.id, DeviceStatus.OFF));

        var slider = element.find('.slider').slider({
          "value": getInitialDimmerLevel(device),
          "change": _.partial(setDimmerLevelFromSlider, device.id)
        });
      };

      var appendToScenesList = function(scene) {
        var element = $(createSceneTemplate(scene)).appendTo('.scenes');
        element.find('.js-activate-button').click(_.partial(Scene.runScene, scene.id));
      };

      var showDevices = function(data) {
        $('.devices').empty();
        _.chain(data.devices).filter(UpnpDevice.isUpnpDevice).each(appendToDevicesList);
      };

      var showScenes = function(data) {
        $('.scenes').empty();
        _.chain(data.scenes).each(appendToScenesList);
      };

      Vera.dataRequest("user_data")
        .done(showDevices)
        .done(showScenes)
        .error(log);
    }
  };
});
