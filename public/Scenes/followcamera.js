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
var box;
function createScene(){
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.FollowCamera('camera', new vec3(100, 100, -100), scene)   
    cam.radius = 20;
    cam.heightOffset = 20;
    cam.rotationOffset =0;
    cam.cameraAcceleration = 0.005

    cam.maxCameraSpeed = 10;
    cam.attachControl(canvas, true)


     box = MeshBuilder.CreateBox("box",{width:10,height:10,depth:10},scene);
    box.position.y = 5;
    MeshBuilder.CreateGround("g",{width:30,height:30});

    var sp = new vec3(10,10,0);
    var Rot120 = Matrix.RotationAxis(new vec3(0,1,0),Math.PI*2/4);    

    for(var i = 0;i<4;i++){        
        var light = new BABYLON.PointLight("light"+1,sp,scene);        
        sp =  vec3.TransformCoordinates(sp,Rot120);
    }
    
    cam.lockedTarget = box;

    return scene
}
var ang = 0;
function update(){
    
    ang += Math.PI / 180;
    ang = ang > 2 * Math.PI ? ang - (2 * Math.PI) : ang;
    box.rotation.y = ang;
}

function render(){
    var scene = createScene();
    scene.clearColor = new BABYLON.Color4(0,0,0,1);
    engine.runRenderLoop(function(){
        update();
        scene.render();
    })
}