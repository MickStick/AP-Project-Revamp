var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
var mong = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/ards';
var hex = require('sha256');


var promise = { promiseLibrary: require('bluebird') };

/*var db = mong.connect(url, promise ,function() {
    console.log("Connected to database: " + url + "...");
});*/

mong.connect(url, { useMongoClient: true }, function() {
    console.log("Connected to database: " + url + "...");
});

//////////////////////////////////////// Declearing Schemas and Models/////////////////////////////////
var empSchema = new mong.Schema({
    ID:{
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    fname: String,
    lname: String,
    email: String

}); //Creating DB schema for employees

var Emp = mong.model('employees', empSchema); //Creating DB model for employees


var empPwdSchema = new mong.Schema({
    ID:{
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    pword: String

}); //Creating DB schema for employee password

var EmpPwd = mong.model('emp_passwords', empPwdSchema); //Creating DB model for employee password

var studSchema = new mong.Schema({
    ID:{
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    fname: String,
    lname: String,
    email: String,
    accBal: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    tel: String,
    clear: String,
    semCost: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
}); //Creatinf DB schema for students

var Stud = mong.model('students', studSchema); //Creatng DB model for Students

var studPwdSchema = new mong.Schema({
    ID: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    pword: String
}); //Creatinf DB schema for student passwords

var StudPwd = mong.model('stud_passwords', studPwdSchema); //Creatng DB model for Student passwords

var enqSchema = new mong.Schema({
    tid: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    sid: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    type: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    enq: String,
    cdate: Date,
    res: String,
    rdate: Date,
    status: String,
    file: String
}); //Creating DB schema for enquires

var Enq = mong.model('enquiries', enqSchema); //Creating DB model for Enquiries

var feeSchema = new mong.Schema({
    feeID: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    StudID: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    fee: String
}); // Creating DB schema for student fees

var Fee = mong.model('fee_payment', feeSchema); //Creating DB model for Fee Payments

//////////////////////////////////////// Declearing Schemas and Models/////////////////////////////////



module.exports = function(app) {
    function chkPwd(dbData, rqData){
        var hash = hex(rqData.pword);
        var uname = parseInt(rqData.uname);
        for(var i = 0; i < dbData.length; i++){
            if(dbData[i].ID == uname || dbData[i].pword == hash){
                return dbData[i];
            }
        }
    
        return null;
    }

    function grabData(data, obj){
        for(var i = 0; i < data.length; i++){
            //console.log(data[i].empID + " : " + obj.ID);
            if(data[i].ID == obj.ID){
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
        EmpPwd.find({}, function(err, data) {
            if (err) console.log(err);
            
            empPwdObj = data;
            StudPwd.find({}, function(err, data) {
                if (err) console.log(err);
                
                studPwdObj = data;

                if((obj = chkPwd(empPwdObj, req.body)) != null){

                    Emp.findOne({"ID":obj.ID}, function(err, data){
                        if(err) console.log(err);

                        res.render('empDash', { data: data, title: 'Employee' });

                    });
                }else if((obj = chkPwd(studPwdObj, req.body)) != null){
                        Stud.findOne({"ID":obj.ID}, function(err, data){
                            if(err) console.log(err);

                            res.render('studDash', { data: data, title: 'Student' });
                        });
                }else{
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