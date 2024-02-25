const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({

    title : {type: String,required : true},
    salary : {type: Number,required  : true},
    status : {type: String,required : true},
    skills : {type:  Array , required : true}
},{ versionKey: false });

const Salary = mongoose.model('Salary', salarySchema );

module.exports = Salary;