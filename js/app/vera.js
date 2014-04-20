define(function(require) {
  var $ = require('jquery');
  var _ = require('underscore');

  var config = {
    "domain": "vera",
    "protocol": "http"
  };

  var getDataRequestUrl = function() {
    return config.protocol + "://" + config.domain + "/port_3480/data_request";
  };

  var transformParameters = function(parameters) {
    return !parameters ? [] : _.pairs(parameters).map(function(item) {
      return {"name": item[0], "value": item[1]};
    });
  };

  var dataRequest = function(action, parameters) {
    return $.ajax(getDataRequestUrl() + "?id=" + action + "&" + $.param(transformParameters(parameters)));
  };

  return {
    "dataRequest": dataRequest
  };
});
