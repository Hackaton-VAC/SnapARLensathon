// CountdownController.js
// Version: 0.0.1
// Event: Initialized
// Description: Create a countdown timer.
// Pack: Refinement Pack

//To control the timer from external scripts:
//Start the timer:
//script.api.startTimer();

//Pause timer:
//script.api.pauseTimer();

//Stop timer:
//script.api.stopTimer();

//Global functions:
//global.countdownController.startTimer();
//global.countdownController.pauseTimer();
//global.countdownController.stopTimer();

//@input int totalTime = 10 {"label":"Countdown Time"}

//@ui{"widget":"separator"}
//@input bool playOnStart

//@ui{"widget":"separator"}
//@input Component.Text countdownText {"label":"Text Indicator"}

//@ui{"widget":"separator"}
//@ui{"label":"On Timer End:"}
//@input bool callBehavior
//@input string behaviorTrigger {"showIf":"callBehavior"}
//@input bool callFunction
//@input Component.ScriptComponent callbackScript {"showIf":"callFunction"}
//@input string callbackFunction {"showIf":"callFunction"}

var countdownStarted = false;

initiate();

function initiate() {
    reset();    
    script.createEvent("UpdateEvent").bind(onUpdate);
    script.countdownText.text = global.gameData.currentTime.toFixed(1).toString();
}

if (script.playOnStart) {
    startTimer();
} else {
}

function onUpdate() {
    
    if (countdownStarted) {
        global.gameData.currentTime -= getDeltaTime();
        if (global.gameData.currentTime <= 0) {
            countdownCompleted();
            global.gameData.currentTime = 0;
            countdownStarted = false;
        }
        
        
        if (script.countdownText) {
            script.countdownText.text = global.gameData.currentTime.toFixed(1).toString();        
        }

    }    
}  

function reset() {
    global.gameData.currentTime = script.totalTime;
}

function startTimer() {
    countdownStarted = true;
    global.gameData.currentTime = script.totalTime;
}

function pauseTimer() {
    countdownStarted = false;
}

function stopTimer() {
    countdownStarted = false;
}

function countdownCompleted() {
    if (script.callBehavior && script.behaviorTrigger != "") {
        if (global.behaviorSystem) {
            global.behaviorSystem.sendCustomTrigger(script.behaviorTrigger);
        } else {
            print("CountdownController, ERROR: No Behavior script in the scene.");
        }
    }
    
    if (script.callFunction) {
        if (script.callbackScript && script.callbackFunction != "") {
            script.callbackScript.api[script.callbackFunction]();
        }
    }

}

script.api.startTimer = startTimer;
script.api.pauseTimer = pauseTimer;
script.api.stopTimer = stopTimer;

global.countdownController = script.api;