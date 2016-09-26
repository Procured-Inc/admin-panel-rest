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

// router.route('/:college_id')
//     .get(function (req, res, next) {
//
//         var college_id = req.params.college_id;
//         console.log(college_id);
//         connection.query('SELECT college_email, college_name, poc_name, poc_phno, poc_name, poc_email from college_detals where college_id=?', college_id, function (err, rows, fields) {
//             console.log(err);
//             console.log(rows);
//             if(rows.length===0) {
//                 res.format({
//
//                     json: function () {
//                         console.log("no data ");
//                         res.json({message: "404 : no records"});
//                     }
//
//                 });
//             }
//             else {
//                 res.format({
//
//                     json: function () {
//                         console.log("correct password");
//                         res.json(rows);
//                     }
//                 });
//             }
//         });
//     });


router.route('/add')
    .post(function (req, res, next) {

        var college_id = req.body.college_id;
        console.log(college_id);
        var post = {
            college_id: college_id,
            college_name: req.body.college_name,
            college_email: req.body.college_email,
            college_city: req.body.college_city,
            poc_phno: req.body.poc_number,
            poc_name: req.body.poc_name,
            poc_email: req.body.poc_email
        };

        connection.query('INSERT college_details SET ? ', post, function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if(!err) {
                res.format({

                    json: function () {
                        console.log("no error ");
                        res.json({message: "Success"});
                    }

                });
            }
            else {
                res.format({

                    json: function () {
                        console.log("fail");
                        console.log(err);
                        res.json(err);

                    }
                });
            }
        });
    });



router.route('/details/all')
    .get(function (req, res, next) {


        connection.query('SELECT college_id, college_email, college_name, poc_name, poc_phno, poc_name, poc_email from college_details', function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if(rows.length===0) {
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




router.route('/details/cids')
    .get( function (req, res, next) {

        connection.query("SELECT college_id from college_details", function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if(rows.length===0) {
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





router.route('/details/cids/:cid')
    .get(function (req, res, next) {

        var col_id = req.params.cid;
        connection.query('SELECT college_email, college_name, poc_name, poc_phno, poc_name, poc_email ' +
            'from college_details where college_id = ?', col_id, function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if(rows.length===0) {
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

router.route('/upcoming/:company_id')
    .get(function (req, res, next) {

        var company_id = req.params.company_id;
        console.log(company_id);
        connection.query('SELECT college_details.college_name as name, college_details.college_city as city, college_details.poc_name, college_details.poc_email, college_details.poc_phno, test_details.test_date as date_of_test, test_details.test_users, test_details.test_dur' +
            ' FROM visited_college, college_details, test_details, company_info' +
            ' WHERE company_info.comp_id =?'+
            ' AND college_details.college_id = visited_college.college_id'+
            ' AND test_details.test_id = visited_college.test_id'+
            ' AND visited_college.done = 0', company_id, function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            var post = {
                company1: [],
                company2: rows
            };
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
                        console.log("data served");
                        res.json(post);
                    }
                });
            }
        });
    });


module.exports = app;
module.exports = router;