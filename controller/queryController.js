var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
var hex = require('sha256');
var Cookies = require('cookies');
var DBdata = require('../model/data');


module.exports = function(app) {
    function chkPwd(dbData, rqData) {
        var hash = hex(rqData.pword);
        var uname = parseInt(rqData.uname);
        for (var i = 0; i < dbData.length; i++) {
            if (dbData[i].ID == uname || dbData[i].pword == hash) {
                return dbData[i];
            }
        }

        return null;
    }

    function grabData(data, obj) {
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].empID + " : " + obj.ID);
            if (data[i].ID == obj.ID) {
                return data[i];
            }

        }

        return null;
    }
    app.post('/', urlcp, function(req, res) {
        //res.send("Hello there " + req.body.uname + ". You shouldn't just throw your password: " + req.body.pword + " around so freely.");
        var empPwdObj;
        var studPwdObj;
        var obj;
        DBdata.EmpPwd.find({}, function(err, data) {
            if (err) console.log(err);

            empPwdObj = data;
            DBdata.StudPwd.find({}, function(err, data) {
                if (err) console.log(err);

                studPwdObj = data;

                if ((obj = chkPwd(empPwdObj, req.body)) != null) {

                    DBdata.Emp.findOne({ "ID": obj.ID }, function(err, data) {
                        if (err) console.log(err);

                        var cookie = new Cookies(req, res);
                        cookie.set('UserLoggedIn', data.ID, { expires: new Date(Date.now() * (1000 * 60 * 60 * 24 * 365 * 3)) });
                        //res.cookie('UserLoggedIn', data.ID, { expires: new Date(0) });
                        res.render('empDash', { data: data, title: 'Employee' });

                    });
                } else if ((obj = chkPwd(studPwdObj, req.body)) != null) {
                    DBdata.Stud.findOne({ "ID": obj.ID }, function(err, data) {
                        if (err) console.log(err);

                        var cookie = new Cookies(req, res);
                        cookie.set('UserLoggedIn', data.ID, { expires: new Date(Date.now() * (1000 * 60 * 60 * 24 * 365 * 3)) });
                        //res.cookie('UserLoggedIn', data.ID, { expires: new Date(0) });
                        res.render('studDash', { data: data, title: 'Student' });
                    });
                } else {
                    console.log("ERROR!!: No Match found!!");
                }
            });
        });

    });
    /*console.log("Processing Request");
            for (var i = 0; i < data.length; i++) {
                if (data[i].empID == req.body.uname) {
                    var empObj = data[i];
                    EmpPwd.find({}, function(err, pwd) {
                        if (err) console.log(err);

                        var hashpwd = require('sha256')(req.body.pword);
                        console.log(hashpwd)
                        var pchk = false;
                        console.log("Processing password");
                        for (var x = 0; x < pwd.length; x++) {
                            if (pwd[x].empID == empObj.empID && pwd[x].pword == hashpwd) {
                                console.log("Password found");
                                pchk = true;
                                break;
                            }
                        }

                        if (pchk) {
                            res.render('empDash', { data: empObj, title: 'Employee' });
                        } else {
                            console.log("Password not found");
                        }

                    });
                    break;
                }
            }

        }); */
}