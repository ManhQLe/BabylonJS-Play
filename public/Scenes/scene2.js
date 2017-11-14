var engine,canvas
var vec3 = BABYLON.Vector3
function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function createScene(){
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera",Math.PI/2,Math.PI/2,2,vec3.Zero(),scene);
    camera.attachControl(canvas,true);

    var light1 = new BABYLON.HemisphericLight("ligh1",new vec3(1,1,0),scene);
    var light2 = new BABYLON.PointLight("light2",new vec3(0,1,-1),scene);

    var sphere = new BABYLON.MeshBuilder.CreateSphere("sphere",{},scene);
    return scene
}


function render(){
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    })
}