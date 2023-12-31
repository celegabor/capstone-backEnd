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
    provincia:{
        type: String,
        required: false
    },
    cap:{
        type: String,
        required: false
    },
    doc:{
        type: String,
        required: false
    },
    avatar:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: false
    },
    work:{
        type: String,
        required: false
    },
}, {timestamps: true, strict: true})


module.exports = mongoose.model('Users2Model', Users2Schema, 'users2')