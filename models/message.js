const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({

    from: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users2Model', 
        required: true
    },
    to:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users2Model', 
        required: true
    },
    message:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true, strict: true})


module.exports = mongoose.model('MessageModel', MessageSchema, 'message')