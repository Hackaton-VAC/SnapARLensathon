// -----JS CODE-----
// OverlapEvents.js
// Version: 0.1.0
// Event: Initialized
// Description: This script demonstrates basic usage for overlap events 
//@input Component.ScriptComponent myFunctionScript


//  Know who I am
var obj = script.getSceneObject();
// obj.name

// This is used to add the collision events
var collider = obj.getComponent("Physics.ColliderComponent");


// Update object's color based on Zone Color
function updateCositas() {
    if(obj.name == "Topo"){
        // update my animation 
        // update score (TODO)
        // trigger sound (TODO)
    }
    if(obj.name == "Bomb"){
        
    }
    if(obj.name == "Time"){
        
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
