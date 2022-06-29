// -----JS CODE-----
// @input SceneObject menuScene
// @input SceneObject gameScene
// @input SceneObject endScene

global.behaviorSystem.addCustomTriggerResponse("START_GAME", startGame);
global.behaviorSystem.addCustomTriggerResponse("GAME_OVER", finishGame);

var gameStarted = false;

function startGame() {
    print("start")
    gameStarted = true;
    script.menuScene.enabled = false; 
    script.gameScene.enabled = true; 
}

function finishGame() {
    gameStarted = false;
    script.gameScene.enabled = false;
    script.endScene.enabled = true;
}

script.createEvent("UpdateEvent").bind(function(){
    if (gameStarted) {
            
    }
});