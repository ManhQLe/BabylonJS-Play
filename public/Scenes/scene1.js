var engine,canvas
var vec3 = BABYLON.Vector3
function start(en,c){
    engine = en;
    canvas = c;
    render();
}



function createScene(){
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.FreeCamera('camera',new vec3(0,5,-10),scene);

    cam.setTarget(vec3.Zero());

    cam.attachControl(canvas,false)

    var light = new BABYLON.HemisphericLight('light',new vec3(0,1,0),scene);

    var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere',{segments:16,diameter:2},scene)

    sphere.position.y = 1;

    var ground = BABYLON.Mesh.CreateGround('ground1',6,6,2,scene);

    return scene
}

function render(){
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    })
}