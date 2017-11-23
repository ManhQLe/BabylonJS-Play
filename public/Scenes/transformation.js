var engine, canvas
var vec3 = BABYLON.Vector3
var MeshBuilder = BABYLON.MeshBuilder

function start(en, c) {
    engine = en;
    canvas = c;
    render();
}

var light2, box,box2

function createScene() {
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.FreeCamera('camera', new vec3(100, 100, 100), scene)
    cam.keysUp.push(87); //W
    cam.keysDown.push(83) //D
    cam.keysLeft.push(65); //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)

    light2 = new BABYLON.PointLight("light2", new vec3(-20, 30, 20), scene);

    var plane = MeshBuilder.CreateGround("ground", {
        width: 100,
        height: 100,
    }, scene);

    box = MeshBuilder.CreateBox("box", {
        width: 10,
        height: 10,
        depth: 10
    }, scene);
    box.position.y = 20

    box2 = MeshBuilder.CreateBox("box2",{
        width: 10,
        height: 10,
        depth: 10
    })
    box2.position.set(20,30,10)
    box2.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new vec3(0,1,0),Math.PI/4)
    box2.addRotation(Math.PI/3,0,0);
    return scene
}

var ang = 0;

function update() {
    
    ang += Math.PI / 180;
    ang = ang > 2 * Math.PI ? ang - (2 * Math.PI) : ang;
    box.rotation.x = ang;
}

function render() {
    var scene = createScene();
    engine.runRenderLoop(function () {
        update();
        scene.render();
    })
}