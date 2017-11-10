const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const route = require('./router');

app.use(route);
app.use('/public',express.static(path.join(__dirname,'statics')));

app.listen(port,function(){
    console.log(`App started at port ${port}`);
});
