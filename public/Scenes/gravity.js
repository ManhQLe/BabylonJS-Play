var engine,canvas
var vec3 = BABYLON.Vector3
var color3 = BABYLON.Color3;
var MeshBuilder = BABYLON.MeshBuilder
var Matrix = BABYLON.Matrix;
function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function createScene(){
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new vec3(0,-9.81,0);
    var cam = new BABYLON.FreeCamera('camera', new vec3(0, 100, -100), scene)
    cam.keysUp.push(87);    //W
    cam.keysDown.push(83)   //D
    cam.keysLeft.push(65);  //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)
    cam.ellipsoid = new vec3(2,5,2);
    cam.applyGravity = true;

    scene.collisonsEnabled = true
    //scene.workerCollisions  = true;
    var g = MeshBuilder.CreateGround("g",{
        width:2000,
        height:2000,
    },scene);
   
    var box = MeshBuilder.CreateBox("box",{width:10,height:10,depth:10},scene);
    box.position.set(0,5,0);

    var light = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(50,50,10), scene);
    light.intensity = 0.5;

    var light2 = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(-100,100,-10), scene);
    light2.intensity = 0.5;

    box.checkCollisions = cam.checkCollisions =  g.checkCollisions = true;

    return scene;
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