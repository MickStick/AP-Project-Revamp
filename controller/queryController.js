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

var empSchema = new mong.Schema({
    id: String,
    fname: String,
    lname: String,
    email: String

}); //Creating DB schema for employees

var Emp = mong.model('employees', empSchema); //Creating DB model for employees

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

module.exports = function(app) {
    app.post('/', function() {

    });
}