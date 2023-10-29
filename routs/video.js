const express = require('express');
const VideoModel = require('../models/videoModel')
const video = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const validateVideo = require('../middlewares/validateVideo')

require('dotenv').config()


video.get('/video/get', verifyToken, async (req,res)=>{

    const{ page = 1, pageSize = 10} = req.query

    try {

        const videos = await VideoModel.find()
        .populate('author')
        .limit(pageSize)
        .skip((page -1) * pageSize );

        const totalVideos = await VideoModel.count();

        res.status(200).send({
            statusCode: 200,
            courentPage: Number(page),
            totalPages: Math.ceil(totalVideos / pageSize ),
            totalVideos,
            videos
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'errore interno del server /GET',
            e: e
        })
    }
})

video.get('/video/get/:videoId', verifyToken , async (req, res) => {
    const { videoId } = req.params;

    try {
        const post = await PostModel.findById(videoId);

        if (!video) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post non trovato!"
            });
        }

        res.status(200).send({
            statusCode: 200,
            post
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        });
    }
});

video.post('/video/post', validateVideo, async (req,res)=>{

    const newVideo = new VideoModel({
        title: req.body.title,
        categoryWork: req.body.categoryWork,
        video: req.body.video,
        content: req.body.content,
        author: req.body.author
    })

    try {
        const videos = await newVideo.save()

        res.status(201).send({
            statusCode: 201,
            payload: videos,
            message: 'video saved'
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'errore interno del server /POST',
            e
        })
    }
})

video.put('/video/put/:videoId', validateVideo, async (req,res)=>{

    const { videoId } = req.params;
    const videoExist = await VideoModel.findById(videoId)

    if(!videoExist){
        return res.status(404).send({
            statusCode: 404,
            message: "This post does not exist!"
        })
    }

    try {
        const dataToUpdate = req.body;
        const options = { new: true}
        const result = await VideoModel.findByIdAndUpdate(videoId, dataToUpdate, options)
        res.status(200).send({
            statusCode: 200,
            message: 'post edit successfully',
            result
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'errore interno del server /PATCH',
            e
        })
    }
})

video.delete('/video/delete/:videoId', async (req,res)=>{

    const { videoId } = req.params;

    try {
        const video = await VideoModel.findByIdAndDelete(videoId)

        if(!video){
            res.status(404).send({
                statusCode: 404,
                message: "post not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "post deleted"
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'errore interno del server /DELETE',
            e
        })
    }
})


module.exports = video