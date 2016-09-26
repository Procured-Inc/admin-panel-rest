var express = require('express');
var router = express.Router();

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





router.route('/')
    .get( function (req, res) {

        connection.query('select * from result_info' , function (err, rows) {
            console.log(err);
            // console.log(rows);
            if(!rows) {
                res.format({

                    json: function () {
                        console.log("no data ");
                        res.json({message: "404 : no records"});
                    }

                });
            }
            else {
                res.format({

                    json: function () {
                        console.log(rows);
                        console.log("data fetched");
                        res.send(rows);
                    }
                });
            }
        });
    });




router.route('/:testID')
    .get( function (req, res) {
        var testid =  req.params.testID;
        connection.query('select * from result_info where result_info.test_id = ?', testid, function(err, rows) {
            console.log(err);
            console.log(rows);
            if(!rows) {
                res.format({

                    json: function () {
                        console.log("no data ");
                        res.json({message: "404 : no records"});
                    }

                });
            }
            else {
                res.format({

                    json: function () {
                        console.log("data fetched");
                        res.json(rows);
                    }

                });
            }
        });
    });







module.exports = router;