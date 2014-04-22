define(function(require) {
  var $ = require('jquery');
  var _ = require('underscore');

  var config = {
    veraIp: "192.168.1.105",
    corsProxyUrl: "raspi:8080"
  };

  var getCorsProxiedPath = function(path) {
    return "http://" + config.corsProxyUrl + "/" + config.veraIp + path;
  };

  var getDataRequestUrl = function() {
    return getCorsProxiedPath("/port_3480/data_request");
  };

  var getHagRequestUrl = function() {
    return getCorsProxiedPath("/port_49451/upnp/control/hag");
  };

  var dataRequest = function(action, parameters) {
    return $.ajax(getDataRequestUrl() + "?id=" + action + "&" + $.param(parameters));
  };

  var hagRequest = function(action, data) {
    return $.ajax({
      url: getHagRequestUrl(),
      method: "POST",
      contentType: "text/xml",
      data: data,
      headers: {"SOAPACTION": '"' + action + '"', "MIME-Version": "1.0", "X-Prototype-Version": "1.7"}
    });
  };

  return {
    "dataRequest": dataRequest,
    "hagRequest": hagRequest
  };
});
