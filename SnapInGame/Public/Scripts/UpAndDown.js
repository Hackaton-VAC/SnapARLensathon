// -----JS CODE-----
//@input float moveToSpeedAmount = 0.05;
//@input float arriveThreshold = 1;
//@input vec3 ceiling;
//@input vec3 ground;
//@input float timeStay = 10;
//@input Component.AudioComponent audio
global.UpAndDownScript = script;
var state = "up" // up, down, still
var obj = script.getSceneObject();
var objTransform = obj.getTransform();
var startTime = script.timeStay;
script.api.state = state;
var newPoint = new vec3(0,0,0);

script.api.changeState = function (auxilio){
    script.api.state = auxilio
}

function onUpdate(eventData){  
    var oldY = objTransform.getWorldPosition().y;
    //print(objTransform.getWorldPosition())
    if(script.api.state == "up"){
        // TODO: Trigger Sound (appears)
        print("SONANDO")
        script.audio.play(1);
        newPoint = script.ceiling;
        if(Math.abs(oldY - newPoint.y) < script.arriveThreshold){
            script.api.state = "stay";
        }
    }
    else if(script.api.state == "stay"){
        newPoint = script.ceiling;
        startTime -= getDeltaTime();
        if(startTime <= 0){
            script.api.state = "down"
        }
    }
    else if(script.api.state == "down"){
        newPoint = script.ground;
        if(Math.abs(oldY - newPoint.y) < script.arriveThreshold){
            print("destruir")
            obj.destroy();
        }
    }
    
    newPoint.x = objTransform.getWorldPosition().x
    newPoint.z = objTransform.getWorldPosition().z
    moveToDestination(objTransform, newPoint);
}

function moveToDestination(object, toPosition){
    var toPosition = vec3.lerp(object.getWorldPosition(), toPosition, script.moveToSpeedAmount);    
    object.setWorldPosition(toPosition);
}

script.createEvent("UpdateEvent").bind(onUpdate);
