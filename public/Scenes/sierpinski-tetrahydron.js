var engine,canvas
var vec3 = BABYLON.Vector3
var MeshBuilder = BABYLON.MeshBuilder
var Matrix = BABYLON.Matrix;

function start(en,c){
    engine = en;
    canvas = c;
    render();
}

function CreateTriangle(scene){
    var Rot120 = Matrix.RotationAxis(new vec3(0,1,0),-Math.PI*2/3);
    var v1 = new vec3(0,0,10);    
    var v2 = vec3.TransformCoordinates(v1,Rot120);
    var v3 = vec3.TransformCoordinates(v2,Rot120);
    console.log(v1)
    console.log(v2)
    console.log(v3)
    var TriangleMesh = new BABYLON.Mesh("tri",scene);
    var buffer = new BABYLON.VertexData();
    buffer.positions = [v1.x,v1.y,v1.z,v2.x,v2.y,v2.z,v3.x,v3.y,v3.z];
    buffer.normals=[];
    buffer.indices = [0,1,2];
    var Norms = [];
    BABYLON.VertexData.ComputeNormals(buffer.positions,buffer.indices,buffer.normals);
    
    buffer.applyToMesh(TriangleMesh);
  

    var Mat = new BABYLON.StandardMaterial("mat",scene);    
    TriangleMesh.material = Mat;

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

    var light2 = new BABYLON.PointLight("light2", new vec3(20, 20, 20), scene);

    // var plane = MeshBuilder.CreateGround("ground", {
    //     width: 100,
    //     height: 100,
    // }, scene);

    CreateTriangle(scene);
    



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