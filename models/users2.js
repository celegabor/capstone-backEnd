const mongoose = require('mongoose')

const Users2Schema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true, strict: true})


module.exports = mongoose.model('Users2Model', Users2Schema, 'users2')