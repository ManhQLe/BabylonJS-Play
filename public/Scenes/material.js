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
    var cam = new BABYLON.FreeCamera('camera', new vec3(0, 100, -100), scene)
    cam.keysUp.push(87);    //W
    cam.keysDown.push(83)   //D
    cam.keysLeft.push(65);  //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)

    //var light2 = new BABYLON.PointLight("light2", new vec3(-20, 30, 20), scene);
    var light  = new BABYLON.HemisphericLight("light",new color3(0,1,0),scene);
    light.diffuse = new color3(1,1,1);
    light.specular = new color3(1,1,1);
    light.groundColor = new BABYLON.Color3(1, 1, 1);
    var Ground = MeshBuilder.CreatePlane("ground",{
        width:100,
        height:100
    },scene)

    Ground.rotation.x = -Math.PI/2;
    Ground.position.y =100;

    var Box = MeshBuilder.CreateBox("box",{
        width:10,
        height:10,
        depth:10
    },scene)


    Box.position.set(0,20,0)

    var mat = new BABYLON.StandardMaterial("mat1",scene);
    mat.diffuseColor = new color3(1,0,0);
    mat.specularColor = new color3(1,1,1);
    mat.emissiveColor = new color3(0,0,0);
    mat.ambientColor = new color3(0.2,0.2,0.2);

    Box.material = mat;

    //scene.ambientColor = new color3(1,1,1);

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