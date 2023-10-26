const mongoose = require('mongoose')

const CommentVideoSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    videoId:{
        type: String,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users2Model', 
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('commentVideoModel', CommentVideoSchema, 'commentVideo')