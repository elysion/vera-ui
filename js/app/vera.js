define(function(require) {
  var $ = require('jquery');
  var _ = require('underscore');

  var config = {
    "host": "vera",
    "protocol": "http"
  };

  var getDataRequestUrl = function() {
    return config.protocol + "://" + config.host + "/port_3480/data_request";
  };

  var getHagRequestUrl = function() {
    return config.protocol + "://" + config.host +"/port_49451/upnp/control/hag";
  };

  var transformParameters = function(parameters) {
    return !parameters ? [] : _.pairs(parameters).map(function(item) {
      return {"name": item[0], "value": item[1]};
    });
  };

  var dataRequest = function(action, parameters) {
    return $.ajax(getDataRequestUrl() + "?id=" + action + "&" + $.param(transformParameters(parameters)));
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
