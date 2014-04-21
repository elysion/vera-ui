var static = require('node-static');
var util = require('util');
var http = require('http');

var config = {
  corsProxyPort: 8080,
  staticServerPort: 8090,
  webroot: '.'
};

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer().listen(config.corsProxyPort, function() {
    console.log('Running CORS reverse proxy on http://localhost:%d', config.corsProxyPort);
  });


var fileServer = new(static.Server)(config.webroot);

http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  }).resume();
}).listen(config.staticServerPort);

console.log('Running static http server at http://localhost:%d', config.staticServerPort);
