const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryWork:{
        type: String,
        required: true,
    },
    video:{
        type: String,
        required: false,
    },
    content:{
        type: String,
        required: false
    }, 
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users2Model',
        required: true
    },
    


}, {timestamps: true, strict: true})

module.exports = mongoose.model('videoModel', VideoSchema, 'videos')