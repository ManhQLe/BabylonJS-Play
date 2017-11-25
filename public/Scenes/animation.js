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
    var cam = new BABYLON.FreeCamera('camera', new vec3(0, 100, -100), scene)
    cam.keysUp.push(87);    //W
    cam.keysDown.push(83)   //D
    cam.keysLeft.push(65);  //A
    cam.keysRight.push(68); //S
    cam.setTarget(vec3.Zero());
    cam.attachControl(canvas, false)

    var sp = new vec3(80,10,0)
    var rotMat = Matrix.RotationAxis(new vec3(0,1,0),2*Math.PI/5)
    var g = MeshBuilder.CreateGround("ground",{width:200,height:200},scene)        
    var box = MeshBuilder.CreateBox("box",{width:10,height:10,depth:10},scene);

    var anim1 = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keys = []; 
    
    //At the animation key 0, the value of scaling is "1"
      keys.push({
        frame: 0,
        value: 1
      });
    
      //At the animation key 20, the value of scaling is "0.2"
      keys.push({
        frame: 20,
        value: 0.2
      });
    
      //At the animation key 100, the value of scaling is "1"
      keys.push({
        frame: 100,
        value: 1
      });

    anim1.setKeys(keys);
    box.animations.push(anim1);
    scene.beginAnimation(box, 0, 100, true);
    for(var i=0;i<5;i++){        
        var pl = new BABYLON.PointLight("light"+i,sp,scene);                
        //pl.includedOnlyMeshes.push(g)        
        sp = vec3.TransformCoordinates(sp,rotMat);

    }
    var material = new BABYLON.StandardMaterial("mat", scene);
    g.material = material;
    material.maxsimultaneousLights = 6;
    

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