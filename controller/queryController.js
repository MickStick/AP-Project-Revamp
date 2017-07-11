var bp = require('body-parser');
var urlcp = bp.urlencoded({extended: false});
var mong =  require('mongoose');
var url = 'mongodb://localhost:27017/ards';

mong.Promise = global.Promise;

mong.connect(url, {
  useMongoClient: true,
}, function(){
    console.log("Connected to database: " + url + "...");
});

var empSchema = new mong.Schema({
    item: String
});//Creating DB schema for employees

var Emp = mong.model('Emp', empSchema);//Creating DB model for employees

var studSchema = new mong.Schema({
    item: String
});//Creatinf DB schema for students

var Stud = mong.model('Stud', studSchema);//Creatng DB model for Students

var enqSchema = new mong.Schema({
    item: String
});//Creating DB schema for enquires

var Enq = mong.model('Enq', enqSchema);//Creating DB model for Enquiries

module.exports = function(app){
    
}