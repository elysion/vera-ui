define(function(require) {
  var log = function() {
    console.log(arguments);
  };

  var vera = require("./vera");

  var isUpnpDevice = function(device){
    return device.device_type.indexOf("urn:schemas-upnp-org:device") !== -1;
  };

  var setDeviceStatus = function(device, status) {
    vera.dataRequest("lu_action", {
      "output_format": "json",
      "DeviceNum": device.id,
      "serviceId": "urn:upnp-org:serviceId:SwitchPower1",
      "action": "SetTarget",
      "newTargetValue": status.toString(),
      "rand": Math.random()
    }).error(log);
  };

  return {
    isUpnpDevice: isUpnpDevice,
    setDeviceStatus: setDeviceStatus
  };
});
