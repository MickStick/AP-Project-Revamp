var mong = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/ards';


var promise = { promiseLibrary: require('bluebird') };

/*var db = mong.connect(url, promise ,function() {
    console.log("Connected to database: " + url + "...");
});*/

mong.connect(url, { useMongoClient: true }, function() {
    console.log("Connected to database: " + url + "...");
});

//////////////////////////////////////// Declearing Schemas and Models/////////////////////////////////
var empSchema = new mong.Schema({
    ID: {
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
module.exports.Emp = Emp;


var empPwdSchema = new mong.Schema({
    ID: {
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
    ID: {
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
module.exports.Stud = Stud;

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

module.exports = {
    Emp: Emp,
    Stud: Stud,
    EmpPwd: EmpPwd,
    StudPwd: StudPwd,
    Enq: Enq,
    Fee: Fee
};