// -----JS CODE-----
// @input Component.Text scoreText

var currentScore = 0;
const MOLE_POINTS = 10;
const BOMB_POINTS = 10;

initiate();

function initiate() {
    script.createEvent("UpdateEvent").bind(onUpdate);
    script.scoreText.text = currentScore.toString();
}

function onUpdate() {
    /* Aquí debería verse si colisionó con mole o con la bomba 
        para saber si se resta o suma al contador del score    
    */
    var tempResult = currentScore + MOLE_POINTS;
    script.scoreText.text = tempResult.toString();
}