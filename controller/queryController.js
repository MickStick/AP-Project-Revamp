var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
var mong = require('mongoose');
var url = 'mongodb://localhost:27017/ards';

mong.Promise = global.Promise;

mong.connect(url, {
    useMongoClient: true,
}, function() {
    console.log("Connected to database: " + url + "...");
});

//////////////////////////////////////// Declearing Schemas and Models/////////////////////////////////
var empSchema = new mong.Schema({
    empID: String,
    fname: String,
    lname: String,
    email: String

}); //Creating DB schema for employees

var Emp = mong.model('employees', empSchema); //Creating DB model for employees

var empPwdSchema = new mong.Schema({
    empID: String,
    pword: String

}); //Creating DB schema for employee password

var EmpPwd = mong.model('emp_passwords', empPwdSchema); //Creating DB model for employee password

var studSchema = new mong.Schema({
    id: String,
    fname: String,
    lname: String,
    email: String,
    accBal: String,
    tel: String,
    clear: String,
    semCost: String
}); //Creatinf DB schema for students

var Stud = mong.model('students', studSchema); //Creatng DB model for Students

var studPwdSchema = new mong.Schema({
    StudID: String,
    pword: String
}); //Creatinf DB schema for student passwords

var Stud = mong.model('stud_passwords', studSchema); //Creatng DB model for Student passwords

var enqSchema = new mong.Schema({
    tid: String,
    sid: String,
    type: String,
    enq: String,
    cdate: String,
    res: String,
    rdate: String,
    status: String,
    file: String
}); //Creating DB schema for enquires

var Enq = mong.model('enquiries', enqSchema); //Creating DB model for Enquiries

var feeSchema = new mong.Schema({
    feeID: String,
    StudID: String,
    fee: String
}); // Creating DB schema for student fees

var Fee = mong.model('fee_payment', feeSchema); //Creating DB model for Fee Payments

//////////////////////////////////////// Declearing Schemas and Models/////////////////////////////////

module.exports = function(app) {
    app.post('/', urlcp, function(req, res) {
        res.send("Hello there " + req.body.uname + ". You shouldn't just throw your password: " + req.body.pword + " around so freely.");
    });
}