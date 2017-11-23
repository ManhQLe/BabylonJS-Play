var engine,canvas
var vec3 = BABYLON.Vector3
var color3 = BABYLON.Color3;
var MeshBuilder = BABYLON.MeshBuilder
function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function createScene(){
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.UniversalCamera("UniCam",new vec3(50,10,10),scene)
    camera.setTarget(new vec3(0,0,0));
    camera.attachControl(canvas)

    var Ground = MeshBuilder.CreateGround("ground", {width:50,height:50},scene);
    
    var Light = new BABYLON.PointLight("Point",new vec3(20,20,-10),scene);

    return scene
}

function update(){

}

function render(){
    var scene = createScene();
    scene.clearColor = new BABYLON.Color4(0,0,0,1);
    engine.runRenderLoop(function(){
        update();
        scene.render();
    })
}