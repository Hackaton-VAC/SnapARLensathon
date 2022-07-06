// -----JS CODE-----
// @input SceneObject menuScene
// @input SceneObject gameScene
// @input SceneObject waitingScene
// @input SceneObject endScene
// @input Component.Text scoreText {"label": "Game Over OwnScore"}
// @input Component.Text opponentScoreText {"label": "Game Over OpponentScore"}
// @input Component.Text opponentScoreTitle {"label": "Game Over OpponentTitle"}

global.behaviorSystem.addCustomTriggerResponse("START_GAME", startGame);
global.behaviorSystem.addCustomTriggerResponse("GAME_OVER", finishGame);
global.behaviorSystem.addCustomTriggerResponse("GO_MENU", goToMenu);

var store = global.persistentStorageSystem.store;

global.gameData = {"startGame": false, "ownScore": 0, 
                "opponentScore": 0, "currentTime": 0}

global.players = {
    "myUserId": undefined,
    "opponentUserId": undefined
};



// Connected Controller
var cc = global.connectedController.api;

// El onStateChange se llama cada vez que la libreria de Connected
// cambia el estado del flujo (FlowState). Para efectos del juego,
// solo necesitamos hacer handle del estatdo "DONE"
//
// El argumento 'state' tiene la siguiente estructura:
//{
//    flowState: FlowState.NOT_SET,
//    mapBuildingProgress: 0,
//    errorMessage: "",
//    snapCodeTexture: null,
//    sessionType: SessionType.NOT_SET,
//    multiplayerSession: null,
//    hasJoined: false,
//    userId: ""
//};
cc.onStateChange(function(state) {
    // Verificamos que el estado del flujo sea DONE, que significa que ya creó la sesion
    if (state.flowState == cc.FlowState.DONE){
        print("Entro: " + state.flowState + " " + state.sessionType)
        
        // Si el estado tiene SessionType = NOT_SET, significa que juega solo
        // Solo llamamos startGame()
        if (state.sessionType == cc.SessionType.NOT_SET) {
            startGame();
        } 
        // Por el contrario, si el SessionType es REMOTE, es una partida multiplayer
        // y debemos esperar por el jugador 2. Activamos la escena intermedia "waitingScene"
        // que nos dice que esta esperando por un jugador.
        else if (state.sessionType == cc.SessionType.REMOTE) {
            script.menuScene.enabled = false;
            script.waitingScene.enabled = true;
            global.players .myUserId = state.userId;
            
            
            
            // --BORRAR-- Simulando que entra un jugador despues de 3 segundos
            var event = script.createEvent("DelayedCallbackEvent");
            event.bind(function(){
                cc.events.trigger(
                    cc.EventType.USER_JOINED_SESSION,
                    {
                        "userInfo": "123456789", 
                        "displayName": "Pepe"
                    }
                );                
            });
            event.reset(3);
            // --END BORRAR--
            
        }
    }
})

function activeUserCount() {
    if (cc.getState().multiplayerSession){
        return cc.getState().multiplayerSession.activeUserCount    
    }
    return 0
}

// Evento que se ejecuta cuando entra el segundo jugador
// Se revisa si la sesion dice que solo hay 1 usuario conectado
//
// El argumento userInfo tiene el userId y el displayName
cc.events.on(cc.EventType.USER_JOINED_SESSION, function(userInfo) {
    if (activeUserCount() == 1){
        global.players.opponentUserId = userInfo.userId;
        // Iniciamos el juego. startGame() quita la escene 'waitingPlayer' que se colocó
        // previamente
        startGame();   
        global.logToScreen(cc.getState().hasJoined)
        global.logToScreen(activeUserCount())
    } else {
        print("Este else significa que ya estan jugando 2 personas")
    }
})

// Handlear cuando el oponente se desconecta
cc.events.on(cc.EventType.USER_LEFT_SESSION, function(userInfo) {
    print("Se desconecto el oponente");
    finishGame()
})


function startGame() {
    print("start")
    global.gameData.gameStarted = true;
    script.menuScene.enabled = false;
    script.waitingScene.enabled = false; 
    script.gameScene.enabled = true;
    global.gameData = {"startGame": false, "ownScore": 0, 
                "opponentScore": 0, "currentTime": 0};
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
    script.waitingScene.enabled = false;
    script.menuScene.enabled = true;
    cc.actions.setFlowState(cc.FlowState.SESSION_TYPE_SELECT);
}

script.createEvent("UpdateEvent").bind(function(){
    if (global.gameData.gameStarted) {
        //print("JUGANDO");
    }
});

global.startGame = startGame;