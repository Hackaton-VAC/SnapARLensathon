// -----JS CODE-----
// Every S seconds spawns an object
// @input int cooldown

// @input int probmole
// @input int probbomb
// @input int probtime

// @input Asset.ObjectPrefab mole
// @input Asset.ObjectPrefab bomb
// @input Asset.ObjectPrefab time


var startTime = Math.floor(Math.random() * script.cooldown);
script.createEvent("UpdateEvent").bind(onUpdate);

/**/
function getRandomStartTime(){
    return Math.floor(Math.random() * (7-3) + 3) //script.cooldown;//Math.floor(Math.random() * 7)
}

function createObjectFromPrefab(myPrefab){
    if(myPrefab){
        var instanceObject = myPrefab.instantiate(script.getSceneObject());
        instanceObject.getTransform().setLocalPosition(new vec3(0,0,0));
        instanceObject.enabled = true;
        //print(instanceObject.getTransform().getWorldPosition())
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
        startTime = getRandomStartTime();
        //print(startTime)
    }
    if(startTime <= 0 && script.getSceneObject().getChildrenCount() <= 0){
        if(hasToSpawnObject()){
            var prefab = getRandObj()
            createObjectFromPrefab(prefab); 
            //print("Creado")
        }

        startTime = getRandomStartTime(); //script.cooldown;//Math.floor(Math.random() * script.cooldown)
    }
}

function fill(total, obj){
    var arr = [];
    for (var i = 0; i < total; i++) {
      arr.push(obj);
    }
    return arr;
}

function hasToSpawnObject(){
    //return true;
    return Math.round(Math.random()) == 1;
}

function getRandObj(){
    var arrmole = fill(script.probmole, script.mole);//
    var arrbomb = fill(script.probbomb, script.bomb);//
    var arrtime = fill(script.probtime, script.time);//
    var elements = arrmole.concat(arrbomb, arrtime)
    var randidx = Math.floor(Math.random() * elements.length);
    //print(elements[randidx].name)
    return elements[randidx];
    
}
