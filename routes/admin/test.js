var express = require('express');
var router = express.Router();

var app = express();
var connection = require('../../connection/mysql');


var bodyParser = require('body-parser'); // used for manipulating POST
// This portion must be placed before we get to our CRUD and REST.
// This is completely copy and pasted from method-override.
// Using 'use' will make sure that every requests that hits this controller
// will pass through these functions.
router.use(bodyParser.urlencoded({ extended: true }));


router.route('/testid/all')
    .get( function(req, res) {

        connection.query("select test_id from test_details", function (err, rows) {
            if(!err) {
                res.json(rows);
            }
        });

    });

router.route('/create')
    .post( function(req, res) {
        var randomnumber = Math.floor((Math.random() * 100393) + 433334);
        var post = {

            test_id: randomnumber,
            company_id: req.body.company_id,
            college_id: req.body.college_id,
            test_date: req.body.test_date,
            test_det: JSON.stringify(req.body.test_details),
            test_users: req.body.test_users,
            test_dur: req.body.test_duration,
            test_done: req.body.test_done
        };

        console.log(post);

        connection.query('INSERT test_details SET ? ', post, function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if(!err) {
                res.json({status: "true", testid: randomnumber});
            }
            else {
                res.json({status: "false"});
            }

        });

        console.log(post);


    });


router.route('/create/:testid/start')
    .get( function(req, res) {
        var testid = req.params.testid;
        var post = {
            done: 1
        };
        console.log(testid);
        console.log(post);
        connection.query('UPDATE test_details SET ? WHERE test_id = ?', [post, testid], function (rows, err) {
            console.log(err);
            console.log(rows);
            if(err.length===0) {
                res.json({status: "true", testid: test_id, message: "test stop"});
            }
            else {
                res.json({status: "false"});
            }


        });

    });


router.route('/create/:testid/stop')
    .get( function(req, res) {
        var testid = req.params.testid;
        var post = {
            done: 2
        };
        console.log(testid);
        console.log(post);
        connection.query('UPDATE test_details SET ? WHERE test_id = ?', [post, testid], function (rows, err) {
            console.log(err);
            console.log(rows);
            if(err.length===0) {
                res.json({status: "true", testid: test_id, message: "test stop"});
            }
            else {
                res.json({status: "false"});
            }


        });

    });



module.exports = router;



