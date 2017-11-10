import express from 'express';
import path from 'path'
//const express = require('express');
//const path = require('path');
const app = express();
const port = 8000;
app.use(express.static(path.join(__dirname,'statics')));


app.listen(port,function(){
    console.log(`App started at port ${port}`);
});
