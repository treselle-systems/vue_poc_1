var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));

//app.use('/src', express.static(path.join(__dirname + '/src')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000);