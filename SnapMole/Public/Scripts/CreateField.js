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
    var dimension = script.width * script.height;   
    var positions = [];
    for (var i = 0; i < dimension; i++) {
        positions.push(i);
    }
    //var positions = Array.from(Array(dimension).keys());      // Positions from 0 to N (width*height)
    shuffle(positions);
    var half = script.width / 2 
    if(script.height && script.width && script.margin && script.topo_N){
        for(var i = 0; i< script.topo_N; i++){
            /*Vector*/
            /*
            var x = i;
            var y = -0.4;
            points.push(new vec3(x*script.margin ,0,y*script.margin))
            */
            /*Matrix*/
            
            var factor = positions[i] <= half ? -1 : 1;
            var x = factor * (positions[i] % script.width); // 
            var z = Math.floor(positions[i]/script.width);
            var offset = 0.4;
            points.push(new vec3(x*script.margin ,0, offset + z*-script.margin))
            
        }
    }
    //print(positions)
    //print(points)
    return points;
}

function shuffle(array) {
  array.sort(function () {Math.random() - 0.5});
}