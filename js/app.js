requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "app": "../app",
    "jquery": "jquery/dist/jquery",
    "underscore": "underscore/underscore",
    "handlebars": "handlebars/handlebars.amd",
    "hbs": "require-handlebars-plugin/hbs"
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

requirejs(["app/main"], function(app) {
  app.init();
});
