/*
    Detector assumes that if using front camera, palms are somewhat facing camera, 
    and if using back camera, palms mostly are facing away from camera
    
    Once the detector detects left or right, it will not reset until 
    hand tracking is lost or LRHandDetector.reset() is called
*/

var LRHandDetector = script.getSceneObject().getParent().getComponent("Component.ScriptComponent").api.LRHandDetector
var textField = script.getSceneObject().getChildrenCount() > 0 ? script.getSceneObject().getChild(0).getComponent("Component.Text") : undefined

//set to a number between 0 and 1 -- 0 is instant determination but has a small chance of error
LRHandDetector.minConfidence = 0.0

script.createEvent("UpdateEvent").bind(function() { 
    var text = "No Hands Detected"
    if (LRHandDetector.leftHandDetected()) {
        text = "Left Hand Detected"
    } else if (LRHandDetector.rightHandDetected()) {
        text = "Right Hand Detected"
    } else {
        //no hands detected
    }
    
    if (textField != undefined) {
        textField.text = text
    }
    
});