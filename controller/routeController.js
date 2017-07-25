var query = require('./queryController');
var Cookies = require('cookies');
var DBdata = require('../model/data');

module.exports = function(app) {
    query(app);

    function grabData(data, callback) {
        DBdata.Emp.findOne({ "ID": data }, function(err, emp) {
            if (err) console.log(err);

            //obj = data;
            if (emp != null) {
                //console.log(emp.ID);
                var obj = {
                    dom: 'Employee',
                    data: emp
                };
                callback(obj);
            } else {
                DBdata.Stud.findOne({ "ID": data }, function(err, stud) {
                    if (err) console.log(err);

                    if (stud != null) {
                        //console.log(stud.ID);
                        var obj = {
                            dom: 'Student',
                            data: stud
                        };
                        callback(obj);
                    } else {
                        console.log("No Data Found");
                        return null;
                    }

                })
            }
        });

    }
    app.get('/', function(req, res) {
        var title = 'Login';

        var cookie = new Cookies(req, res);
        var user = cookie.get('UserLoggedIn');
        var User;

        if (user != null) {
            grabData(user, function(User) {
                if (User.dom == 'Student') {
                    res.render('studDash', { data: User.data, title: 'Student' });
                } else if (User.dom == 'Employee') {
                    res.render('empDash', { data: User.data, title: 'Employee' });
                } else {
                    console.log("No Data Found!!!");
                    res.render('index', { title: title });
                }
            });

            /**/
        } else {
            console.log("No user login info found");
            res.render('index', { title: title });
        }

    });

    app.get('/logout', function(req, res) {
        res.cookie('UserLoggedIn', '', { expires: new Date(0) });
        res.redirect('/');
    });

    app.get('/emp', function(req, res) {
        var title = 'Employee';
        res.render('empDash', { title: title });
    });

    app.get('/stud', function(req, res) {
        var title = 'Student';
        res.render('studDash', { title: title });
    });

    app.get('*', function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send("Hell there. Unfortunately the url: " + req.url + " has not been set up yet.");
    });
}