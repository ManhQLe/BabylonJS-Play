const express = require('express')
const path = require('path')
var router = express.Router()
const fs = require('fs');

router.get('/:scene',function(req,res){
    var scenePath = path.join(__dirname,'public/scenes',req.params.scene+".js");
    
    fs.readFile(scenePath,function(err,data){

    })
})

module.exports = router;