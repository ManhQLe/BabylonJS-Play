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
    var cam = new BABYLON.ArcRotateCamera('camera',0,0,80,new vec3(0,0,0), scene);       
    cam.attachControl(canvas, true)

    var amLight = new BABYLON.HemisphericLight("hemi",new vec3(0,1,0),scene);
    amLight.groundColor = new vec3(.4,.5,.4);

    var box = MeshBuilder.CreateBox("plan1",{width:20,height:20,depth:20},scene);

    var light = new BABYLON.PointLight("light",new vec3(40,20,30),scene);
    

    light.diffuse = new color3(1,0,0);
    light.specular = new color3(1,1,1);

    var light2 = new BABYLON.PointLight("light2",new vec3(10,20,-30),scene);
    light2.diffuse = new color3(0,1,0);  
    light2.specular = new color3(1,1,1);


    var light3 = new BABYLON.PointLight("light3",new vec3(-20,20,30),scene);
    light3.diffuse = new color3(0,0,1);  
    light3.specular = new color3(1,1,1);

    var material = new BABYLON.StandardMaterial("mat",scene);
    material.diffuseColor = new color3(1,0,.4);
    material.specularColor = new color3(.5,.5,.5);

    box.material = material;

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