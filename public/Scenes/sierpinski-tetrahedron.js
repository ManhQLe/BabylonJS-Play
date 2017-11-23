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

function CreateTetrahydron(scene){
    var Rot120 = Matrix.RotationAxis(new vec3(0,1,0),Math.PI*2/3);
    var v0 = new vec3(0,0,10);    
    var v1 = vec3.TransformCoordinates(v0,Rot120);
    var v2 = vec3.TransformCoordinates(v1,Rot120);

    var v3 = vec3.Zero();
    console.log(v3)
    v3.addInPlace(v0);
    v3.addInPlace(v1);
    v3.addInPlace(v2);
    v3.scaleInPlace(3);

    var h = vec3.Distance(v0,v1)*Math.sqrt(2/3);
    var up = vec3.Up();
    up.scaleInPlace(h);
    v3.addInPlace(up);

    var Tet = new BABYLON.Mesh("Tet",scene);
    var buffer = new BABYLON.VertexData();
    buffer.positions = [
        v0.x,v0.y,v0.z,v1.x,v1.y,v1.z,v2.x,v2.y,v2.z,
        v3.x,v3.y,v3.z
    ];

    buffer.normals=[];
    buffer.indices = [
        0,1,2,
        0,3,1,
        1,3,2,
        3,0,2
    ];
    var Norms = [];
    BABYLON.VertexData.ComputeNormals(buffer.positions,buffer.indices,buffer.normals);
    
    buffer.applyToMesh(Tet);
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    pbr.baseColor = new color3( 0.329412, 0.223529, 0.027451 )
    pbr.metallic = 1
    pbr.roughness = 0.5;
    Tet.material = pbr;
}



function createScene(){
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.FreeCamera('camera', new vec3(50, 100, 10), scene)
    cam.keysUp.push(87);    //W
    cam.keysDown.push(83)   //D
    cam.keysLeft.push(65);  //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)
    
    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(.5, .5, .5);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.groundColor = new BABYLON.Color3(0, 0, 0);

    var light2 = new BABYLON.PointLight("light2", new vec3(20, 20, 20), scene);

    light2.diffuse = new color3(.5,.5,.5);
    light2.specular = new color3(1,1,1);
    light2.range = 100;
    
    
    var plane = MeshBuilder.CreateGround("ground", {
        width: 100,
        height: 100,
    }, scene);

    CreateTetrahydron(scene);
    
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