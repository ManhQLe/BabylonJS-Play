var engine,canvas
var vec3 = BABYLON.Vector3
function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function createScene(){
    var scene = new BABYLON.Scene(engine);
    
    return scene
}


function render(){
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    })
}