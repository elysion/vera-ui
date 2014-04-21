requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "app": "../app",
    "jquery": "jquery/dist/jquery",
    "underscore": "underscore/underscore",
    "handlebars": "handlebars/handlebars.amd",
    "hbs": "require-handlebars-plugin/hbs",
    "jquery-ui": "jquery-ui/ui/jquery-ui"
  },
  "shim": {
    "underscore": {
      "exports": '_'
    },
    "jquery-ui": {
      "deps": ["jquery"],
      "exports": "$"
    }
  }
});

requirejs(["app/main"], function(app) {
  app.init();
});
