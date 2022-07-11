// -----JS CODE-----
// OverlapEvents.js
// Version: 0.1.0
// Event: Initialized
// Description: This script demonstrates basic usage for overlap events 
//@input Component.ScriptComponent myFunctionScript
//@input Component.AudioComponent audioMole
//@input Component.AudioComponent audioTime
//@input Component.AudioComponent audioBomb

var hascollision = false;
//  Know who I am
var obj = script.getSceneObject();
// obj.name

// This is used to add the collision events
var collider = obj.getComponent("Physics.ColliderComponent");


// Update object's color based on Zone Color
function updateCositas() {
    if(hascollision){
        return;
    }
    hascollision = true;
    if(obj.name == "Topo"){
        global.behaviorSystem.sendCustomTrigger("SMASH_MOLE");
        if(!script.audioMole.isPlaying()){           // USAR IS PLaying
            script.audioMole.play(1); 
        }
        // trigger sound (TODO)
    }
    if(obj.name == "Bomb"){
        global.behaviorSystem.sendCustomTrigger("SMASH_BOMB");
        if(!script.audioBomb.isPlaying()){           // USAR IS PLaying
            script.audioBomb.play(1); 
        }
    }
    if(obj.name == "Reloj"){
        global.behaviorSystem.sendCustomTrigger("SMASH_TIMER");
        if(!script.audioTime.isPlaying()){           // USAR IS PLaying
            script.audioTime.play(1); 
        }
    }
    script.myFunctionScript.api.changeState("down");
    //global.logToScreen(script.myFunctionScript.api.state);
}

 //print("[" + obj.name + "] Overlap" + event + "[" + i + "]: id=" + overlap.id + ", collider=" + overlap.collider);

// For API coverage purposes, print every field of overlap events

function overlapEnter(e) { 
    updateCositas();
}


function initialize() {
    
    if (checkInputValues()) {
        // Set Overlap Filter
        collider.overlapFilter.includeIntangible = false;
        collider.overlapFilter.includeDynamic = true;
        collider.overlapFilter.includeStatic = true;
        //global.logToScreen("Inicializando")    
        collider.onOverlapEnter.add(overlapEnter);
        //collider.onOverlapStay.add(overlapEnter);
        //collider.onOverlapExit.add(overlapEnter);
        
        //collider.onCollisionEnter.add(overlapEnter);
    }
    
       
}

function checkInputValues() {
    
    if (collider == null) {
        print("ERROR: Make sure to attach physics body component to this scene object");
        return false;
    }

    return true;
}

initialize();
