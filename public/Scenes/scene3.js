var engine, canvas
var vec3 = BABYLON.Vector3
var mBuilder = BABYLON.MeshBuilder;

function start(en, c) {
    engine = en;
    canvas = c;
    render();
}

function createScene() {
    var scene = new BABYLON.Scene(engine);
    var box = BABYLON.MeshBuilder.CreateBox("box", {
        width: 10,
        height: 10,
        depth: 10
    }, scene);

    box.position.x = 20
    box.position.y = 5;

    var sphere = mBuilder.CreateSphere("shpere", {
        diameter: 10
    }, scene);
    sphere.position.y = 5
    sphere.position.z = 40


    var plane = mBuilder.CreateGround("ground", {
        width: 100,
        height: 100,
    }, scene);

   ;;
    var light2 = new BABYLON.PointLight("light2", new vec3(0, 10, 0), scene);
    var cam = new BABYLON.FreeCamera('camera', new vec3(0, 100, -100), scene)
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)
    return scene
}


function render() {
    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    })
}