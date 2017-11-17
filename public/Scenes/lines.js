var engine,canvas
var vec3 = BABYLON.Vector3
var MeshBuilder =BABYLON.MeshBuilder;
function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function createScene(){
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.FreeCamera('camera', new vec3(0, 100, -100), scene)
    cam.keysUp.push(87);    //W
    cam.keysDown.push(83)   //D
    cam.keysLeft.push(65);  //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)




    var Points = [new vec3(-10,0,0),new vec3(10,0,0),new vec3(0,1,10)];
    var lines =MeshBuilder.CreateLines("lines",{points:Points},scene);

    var dPoints = [new vec3(-10,0,0),new vec3(-10,10,0),new vec3(0,1,10)];
    var dashLines = MeshBuilder.CreateDashedLines("lines2",{points:dPoints},scene);

    
    return scene
}


function render(){
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    })
}