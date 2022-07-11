// -----JS CODE-----
// @input Component.Text scoreText
// @input Component.Text highScoreText
// @input Component.Text timerText
// @input int MOLE_POINTS;
// @input int BOMB_POINTS;
// @input int TIMER_SEC;

global.behaviorSystem.addCustomTriggerResponse("SMASH_MOLE", onSmashMole);
global.behaviorSystem.addCustomTriggerResponse("SMASH_BOMB", onSmashBomb);
global.behaviorSystem.addCustomTriggerResponse("SMASH_TIMER", onSmashTimer);

var store = global.persistentStorageSystem.store;

function initiate() {
    script.scoreText.text = global.gameData["ownScore"].toString();
    script.highScoreText.text = store.getInt("highScore").toString();
}

function onSmashMole() {
    global.gameData["ownScore"] += script.MOLE_POINTS;
    script.scoreText.text = global.gameData["ownScore"].toString();
}

function onSmashTimer() {
    global.gameData["currentTime"] += script.TIMER_SEC;
    script.timerText.text = global.gameData["currentTime"].toFixed(1).toString();
}

function onSmashBomb() {
    global.gameData["ownScore"] -= script.BOMB_POINTS;
    global.gameData["ownScore"] = global.gameData["ownScore"] < 0 ? 0 : global.gameData["ownScore"];
    script.scoreText.text = global.gameData["ownScore"].toString();
}

script.api.resetScorer = initiate;
global.scoreController = script.api;