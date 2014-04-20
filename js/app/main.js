define(function(require) {
  return {
    init: function() {
      var $ = require('jquery');
      var _ = require('underscore');
      var deviceTemplate = require('hbs!./templates/device');
      var sceneTemplate = require('hbs!./templates/scene');

      var DeviceStatus = require('./device-status');
      var UpnpDevice = require('./upnp-device');
      var Scene = require('./scene');
      var Vera = require('./vera');

      var log = function() {
        console.log(arguments);
      };

      var createDeviceElement = function(device) {
        return deviceTemplate({ name: device.name, id: device.id });
      };

      var createSceneTemplate = function(scene) {
        return sceneTemplate({ name: scene.name, id: scene.id });
      };

      var appendToDevicesList = function(device) {
        var element = $(createDeviceElement(device)).appendTo('.devices');
        element.find('.js-on-button').click(_.partial(UpnpDevice.setDeviceStatus, device.id, DeviceStatus.ON));
        element.find('.js-off-button').click(_.partial(UpnpDevice.setDeviceStatus, device.id, DeviceStatus.OFF));
      };

      var appendToScenesList = function(scene) {
        var element = $(createSceneTemplate(scene)).appendTo('.scenes');
        element.find('.js-on-button').click(_.partial(Scene.runScene, scene.id));
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
