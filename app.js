const express  =require('express');
const path =require('path');
const fileservice = require('fs');
const httpserver  = require('http');
const logger  = require('morgan');
//Set the Express Object 
const app  = express();
const port = 3000;
app.port=port;
app.use(logger('short'));
app.use(function(req,res,next){
    // checming user login detausl

    console.log('Request URl is :'+req.url);
    console.log('Date is '+new Date());
    next();
});

app.use (function(req,res,next){
const filePath  = path.join(__dirname,'public',req.url);
    fileservice.stat(filePath,function(err,fileInfo){
        if (err)
        {
            console.log('error to get file on path of '+filePath);
            next();
            return;
        }
        if (fileInfo.isFile)
        {
            res.sendFile(filePath);
            
        }
        else
        {
            next();
        }
    });
});
app.use(function(req,res){
    res.status(404).send('File not Found');
});
// create the server

httpserver.createServer(app).listen(port,function(){
    console.log('server started ..');
});
