define(function(require) {
  var log = function() {
    console.log(arguments);
  };

  var vera = require("./vera");

  var isUpnpDevice = function(device){
    return device.device_type.indexOf("urn:schemas-upnp-org:device") !== -1;
  };

  var setDeviceStatus = function(deviceId, status) {
    vera.dataRequest("lu_action", {
      "output_format": "json",
      "DeviceNum": deviceId,
      "serviceId": "urn:upnp-org:serviceId:SwitchPower1",
      "action": "SetTarget",
      "newTargetValue": status.toString(),
      "rand": Math.random()
    }).error(log);
  };

  var setDimmerLevel = function(deviceId, level) {
    vera.dataRequest("lu_action", {
      "output_format": "json",
      "DeviceNum": deviceId,
      "serviceId": "urn:upnp-org:serviceId:Dimming1",
      "action": "SetLoadLevelTarget",
      "newLoadlevelTarget": level.toString(),
      "rand": Math.random()
    }).error(log);
  };

  return {
    isUpnpDevice: isUpnpDevice,
    setDeviceStatus: setDeviceStatus,
    setDimmerLevel: setDimmerLevel
  };
});
