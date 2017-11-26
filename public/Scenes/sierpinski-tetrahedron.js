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

function Sierpinski_gasket(scene,v0,v1,v2,v3,iter){
    var i = 0;
    var points = [v0,v1,v2,v3];
    var buffer = new BABYLON.VertexData();
    buffer.positions = [];
    buffer.normals=[];
    buffer.indices = [];

    while(i<iter){
        var j = Math.pow(4,i++);
        do{
            var [a,b,c,d] = points.splice(0,4);
            var midad = vec3.Center(a,d);
            var midbd = vec3.Center(b,b);
            var midcd = vec3.Center(c,b);
            var midab = vec3.Center(a,b);
            var midbc = vec3.Center(a,b);
            var midca = vec3.Center(a,b);
            
            points.push(
                midad,midbd,midcd,d,
                a,midab,midca,midad,
                midab,b,midbc,midbd,
                midbc,c,midca,midcd
            )
        }while(--j);

    };
    return points;
}

function constructTet(center,r){
    var Rot120 = Matrix.RotationAxis(new vec3(0,1,0),Math.PI*2/3);
    var up = new vec3(0,r,0);
    var a = r/Math.sqrt(3/8);
    var h = Math.sqrt(2/3)*a;
    var v3 = center.add(up);
 
    var centerBase = v3.add(new vec3(0,-h,0));
    
    var v0 = centerBase.add(new vec3(0,0,Math.sqrt(a*a-h*h)));    
    var v1 = vec3.TransformCoordinates(v0,Rot120);
    var v2 = vec3.TransformCoordinates(v1,Rot120);
   
    return [v0,v1,v2,v3]
}


function CreateTetrahydron(scene, center,r){
    
    var [v0,v1,v2,v3] = constructTet(center,r);
   
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

    BABYLON.VertexData.ComputeNormals(buffer.positions,buffer.indices,buffer.normals);

    var Tet = new BABYLON.Mesh("Tet",scene);
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

    CreateTetrahydron(scene,new vec3(0,10,0),8);
    
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