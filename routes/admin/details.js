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


router.route('/:email')
    .get(function (req, res, next) {

        var email = req.params.email;
        console.log(email);
        connection.query('SELECT comp_id, comp_email, comp_name, comp_logo, comp_desc, hr_number, hr_name, hr_email from company_info where comp_email=?', email, function (err, rows, fields) {
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
                        console.log("correct password");
                        res.json(rows);
                    }
                });
            }
        });
    });





router.put('/:email/edit', function (req, res) {
    var email = req.params.email;

    var post = {
        comp_name: req.body.comp_name,
        comp_logo: req.body.comp_logo,
        comp_desc: req.body.comp_desc,
        hr_number: req.body.hr_number,
        hr_name: req.body.hr_name,
        hr_email: req.body.hr_email
    };

    console.log(post);

    connection.query('UPDATE company_info SET ? WHERE comp_email = ?', [post, email], function (err, rows, fields) {
        console.log(err);
        console.log(rows);
        
    });

    console.log(post);
    if(err.length===0) {
        res.json({status: "true"});
    }
    else {
        res.json({status: "false"});
    }

});


// module.exports = details;
module.exports = router;