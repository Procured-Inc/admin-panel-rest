var express = require('express');
var router = express.Router();
var http = require('http');
var details = require('./details');

var bcrypt = require('bcrypt-nodejs');
var connection = require('../../connection/mysql');




var bodyParser = require('body-parser'); // used for manipulating POST




// This portion must be placed before we get to our CRUD and REST.
// This is completely copy and pasted from method-override.
// Using 'use' will make sure that every requests that hits this controller
// will pass through these functions.

router.use(bodyParser.urlencoded({ extended: true }));
// router.use(methodOverride(function(req, res){
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         // look in urlencoded POST bodies and delete it
//         var method = req.body._method;
//         delete req.body._method;
//         return method;
//     }
// }));



router.post('/', function(req, res) {
    var email = req.body.company_email;
    var password = req.body.password;
    console.log(email);
    connection.query('select password from company_info where comp_email=?', email, function (err, rows) {
        console.log(err);
        if (rows.length === 0) {
            res.format({
                //JSON response will show all blobs in JSON format
                json: function(){
                    console.log("wrong username");
                    res.json({ message: 'wrong username'});
                }
            });

        }
        else {
            console.log(rows);
            bcrypt.compare( password, rows[0].password, function(err, response) {
                if (response) {
                    // res.redirect(__dirname+'/details/' + email);
                    connection.query("SELECT comp_id, comp_email, comp_name, comp_logo, comp_desc,hr_number, hr_name, hr_email from company_info where comp_email=?",email, function (err, rows, fields) {
                        console.log(err);
                        console.log(rows);
                        res.format({

                            json: function(){
                                console.log("correct password");
                                res.json(rows);
                            }
                        });
                    });

                }
                else {
                    res.format({

                        json: function(){
                            console.log("wrong password");
                            res.json({ message : "wrong uname/password" });
                        }
                    });
                }

            })

        }
    })

    });








module.exports = router;