requirejs.config({
  "baseUrl": ".",
  "paths": {
    "app": "js/app",
    "jquery": "js/lib/jquery/dist/jquery",
    "underscore": "js/lib/underscore/underscore",
    "handlebars": "js/lib/handlebars/handlebars.amd",
    "hbs": "js/lib/require-handlebars-plugin/hbs",
    "jquery-ui": "js/lib/jquery-ui/ui/jquery-ui"
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
