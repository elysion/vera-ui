define(function(require) {
  var vera = require("./vera");
  var runSceneTemplate = require("hbs!./templates/run-scene");

  var log = function() {
    console.log(arguments);
  };

  var runScene = function(sceneId) {
    vera.hagRequest("urn:schemas-micasaverde-org:service:HomeAutomationGateway:1#RunScene",
      runSceneTemplate({scene_number: sceneId})).done(log);
  };

  return {
    runScene: runScene
  };
});
