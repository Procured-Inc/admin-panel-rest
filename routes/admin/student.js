var express = require('express');
var router = express.Router();
var http = require('http');
var connection = require('../../connection/mysql');

// // var upcoming = require('./upcoming');
// var details = require('./details');

var app = express();

// app.use('/upcoming', upcoming);
// app.use('/details', details);

var bodyParser = require('body-parser'); // used for manipulating POST
// This portion must be placed before we get to our CRUD and REST.
// This is completely copy and pasted from method-override.
// Using 'use' will make sure that every requests that hits this controller
// will pass through these functions.
router.use(bodyParser.urlencoded({ extended: true }));



router.route('/details')
    .get(function (req, res) {

        connection.query("select * from student_info", function (err, rows) {
            if(err===null){
                res.json(rows);
            }

        });


    });

router.route('/details/:studentID')
    .get(function (req, res) {

        var studentid = req.params.studentID;
        connection.query("select student_info.first_name, student_info.last_name, student_info.score_10, student_info.score_12, student_info.current_cgpa, student_info.email_id, college_details.college_name as college from student_info, college_details where student_info.student_id = ? and student_info.college_id = college_details.college_id", studentid, function (err, rows) {
            console.log("error" , err);
            console.log("result" , rows);

            if(err===null){
                if(rows===null) {
                    console.log("no matching records found!");
                    res.json({message: "no matching records found!"});
                }
                else
                res.json(rows);
            }
            else {
                console.log(err);
                res.json({status: 404, message: "some error, check logs"});
            }

        });


    });






module.exports = router;