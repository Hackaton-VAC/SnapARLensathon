// -----JS CODE-----
// Every S seconds spawns an object
// @input int cooldown

// @input int probmole
// @input int probbomb
// @input int probtime

// @input Asset.ObjectPrefab mole
// @input Asset.ObjectPrefab bomb
// @input Asset.ObjectPrefab time


var startTime = script.cooldown;
script.createEvent("UpdateEvent").bind(onUpdate);


function createObjectFromPrefab(myPrefab){
    if(myPrefab){
        print(myPrefab.name)
        var instanceObject = myPrefab.instantiate(script.getSceneObject());
        instanceObject.getTransform().setLocalPosition(new vec3(0,0,0));
        instanceObject.enabled = true;
        print(instanceObject.getTransform().getWorldPosition())
        return instanceObject;
    }
    else{
        return undefined;
    }
}

//script.createEvent("OnStartEvent").bind(OnStartEvent);

function onUpdate(eventData){  
    //print("updating")
    //print(startTime);
    startTime -= getDeltaTime();
    //print("actu")
    if(script.getSceneObject().getChildrenCount() > 0){
        startTime = script.cooldown;
        print(1)
    }
    if(startTime <= 0 && script.getSceneObject().getChildrenCount() <= 0){
        print("Creating something")
        var prefab = getRandObj()
        createObjectFromPrefab(prefab);
        startTime = script.cooldown;
    }
}

function fill(total, obj){
    var arr = [];
    for (var i = 0; i < total; i++) {
      arr.push(obj);
    }
    return arr;
}

function getRandObj(){
    var arrmole = fill(script.probmole, script.mole);//
    var arrbomb = fill(script.probbomb, script.bomb);//
    var arrtime = fill(script.probtime, script.time);//
    var elements = arrmole.concat(arrbomb, arrtime)
    var randidx = Math.floor(Math.random() * elements.length);
    return elements[randidx];
    
}
