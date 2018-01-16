var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

/*var userAuthDetails = [{
    'email': 'admin@gmail.com',
    'password': 'admin',
    'token': '25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX'
}];
*/

const encode = require('nodejs-base64-encode');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/* Function to read file  */
function readFile() {
    fs.readFile("credentials.json", 'utf8', function(err, contents) {
        console.log(contents);
    });

}
//readFile();
/* Function to write file  */
function writeFile(jsonStr) {

    var jsonStr = "[{'email' : 'admin@gmail.com','password' : 'admin','token' : '25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX'}]";
    fs.writeFile("credentials.json", jsonStr, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

}

/* API for reset password token */
app.post('/api/v1/resetPwdToken', function(req, res) {

    var uEmail = req.body.userEmail;
    fs.readFile("credentials.json", 'utf8', function(err, contents) {
        userAuthDetails = JSON.parse(contents);

        var a = {
            'res': 'failure'
        };
        for (i = 0; i < userAuthDetails.length; i++) {
            if ((userAuthDetails[i].email == uEmail)) {
                a = {
                    'res': 'success',
                    'token': userAuthDetails[i].token
                };
            }
        }
        res.send(a);
    });
});

/* API for reset password */

app.post('/api/v1/resetPwd', function(req, res) {

    var token = req.body.token;
    var resPwd = req.body.resPwd;

    var a = {
        'res': 'error'
    };
    fs.readFile("credentials.json", 'utf8', function(err, contents) {

        userAuthDetails = JSON.parse(contents);


        for (i = 0; i < userAuthDetails.length; i++) {
            if ((userAuthDetails[i].token == token)) {
                userAuthDetails[i].password = encode.decode(resPwd, 'base64');
            }
        }

        var jsonStr = JSON.stringify(userAuthDetails);
        console.log(jsonStr);
        fs.writeFile("credentials.json", jsonStr, function(err) {
            if (err) {
                return console.log(err);
                res.send(a);
            } else {
                var a = {
                    'res': 'success'
                };
                res.send(a);
            }
        });
    });
});

/* API for Login*/
app.post('/api/v1/login', function(req, res) {

    var uEmail = req.body.userEmail;
    var uPwd = encode.decode(req.body.userPwd, 'base64');

    var a = {
        'res': 'failure'
    };

    fs.readFile("credentials.json", 'utf8', function(err, contents) {

        userAuthDetails = JSON.parse(contents);


        for (i = 0; i < userAuthDetails.length; i++) {
            if ((userAuthDetails[i].email == uEmail) && (userAuthDetails[i].password == uPwd)) {
                var a = {
                    'res': 'success',
                    'token': userAuthDetails[i].token
                };
            }
        }
        res.send(a);
    });
});

app.listen(3001);