// -----JS CODE-----
// @input SceneObject menuScene
// @input SceneObject gameScene
// @input SceneObject endScene
// @input Component.Text scoreText {"label": "Game Over OwnScore"}
// @input Component.Text opponentScoreText {"label": "Game Over OpponentScore"}
// @input Component.Text opponentScoreTitle {"label": "Game Over OpponentTitle"}

global.behaviorSystem.addCustomTriggerResponse("START_GAME", startGame);
global.behaviorSystem.addCustomTriggerResponse("GAME_OVER", finishGame);
global.behaviorSystem.addCustomTriggerResponse("GO_MENU", goToMenu);

var store = global.persistentStorageSystem.store;

global.gameData = {"startGame": false, "ownScore": 0, 
                "opponentScore": 0, "currentTime": 0,
                "multiplayer": false};

function startGame() {
    print("start")
    global.gameData.gameStarted = true;
    script.menuScene.enabled = false; 
    script.gameScene.enabled = true;
    global.gameData = {"startGame": false, "ownScore": 0, 
                "opponentScore": 0, "currentTime": 0, "multiplayer": false};
    global.scoreController.resetScorer();
    global.countdownController.startTimer();
    
}

function finishGame() {
    global.gameData.gameStarted = false;
    var event = script.createEvent("DelayedCallbackEvent");
    event.bind(function(){
        if (global.gameData.multiplayer) {
            script.opponentScoreText.enabled = true;
            script.opponentScoreTitle.enabled = true;
        } else {
            script.opponentScoreText.enabled = false;
            script.opponentScoreTitle.enabled = false;
        }
        script.gameScene.enabled = false;
        script.endScene.enabled = true;
        script.scoreText.text = global.gameData["ownScore"].toString();
        // Aqui va el de la BD remota
        //script.opponentScoreText.text = global.gameData["ownScore"].toString();
        var highScore = store.getInt("highScore");
        if (highScore < global.gameData.ownScore) {
            store.putInt("highScore", global.gameData.ownScore);
        }
        
    });
    event.reset(0.5);
}

function goToMenu() {
    script.endScene.enabled = false;
    script.menuScene.enabled = true;
    
}

script.createEvent("UpdateEvent").bind(function(){
    if (global.gameData.gameStarted) {
        //print("JUGANDO");
    }
});