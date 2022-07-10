// -----JS CODE-----
//@input Asset.ObjectPrefab myPrefab
// @input int height
// @input int width
// @input int margin
// @input int topo_N


script.createEvent("OnStartEvent").bind(onTouchStart);

function onTouchStart(e){
    var points = getRandomPoints();
    for(var i = 0; i < points.length; i++){
        var mySceneObject = createObjectFromPrefab();
        mySceneObject.getTransform().setWorldPosition(points[i]);
    }
}

function createObjectFromPrefab(){
    if(script.myPrefab){
        var instanceObject = script.myPrefab.instantiate(script.getSceneObject());
        return instanceObject;
    }
    else{
        return undefined;
    }
}

function getRandomPoints(){
    var points = [];
    if(script.height && script.width && script.margin && script.topo_N){
        for(var i = 0; i< script.topo_N; i++){
            var maximum_x = Math.ceil(script.width/2);
            var minimum_x = Math.floor(-script.width/2);
            var maximum_y = Math.ceil(script.height/2);
            var minimum_y = Math.floor(-script.height/2);
            var x = Math.random() * (maximum_x - minimum_x) + minimum_x;
            var y = Math.random() * (maximum_y - minimum_y) + minimum_y;
            points.push(new vec3(x*script.margin ,0,y*script.margin))
        }
    }
    return points;
}