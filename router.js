const express = require('express')
const path = require('path')
const async8 = require('async8');
var router = express.Router()
const fs = require('fs');

router.get('/:scene', function (req, res) {

    const htmlpath = path.join(__dirname, 'scene.html');
    fs.readFile(htmlpath, 'utf8', function (err, data) {
        if (err)
            res.status(500).send(err)
        else {
            res
            .type(".html")
            .send(data.replace("[[SCENE]]",req.params.scene));
        }
    })
})



module.exports = router;