const express = require('express');
const CommentModel = require('../models/commentVideo')
const comment = express.Router();

require('dotenv').config()

// get
comment.get('/comment/get', async (req, res) => {
    try {
        const comments = await CommentModel.find().populate('author')

        res.status(200).send({
            statusCode: 200,
            comments
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

// get di un utente
comment.get('/video/:videoId/comment', async (req, res) => {
    const videoId = req.params.videoId;

    try {
        const commentsForPost = await CommentModel.find({ videoId: videoId }).populate('author').exec();

        if (!commentsForPost || commentsForPost.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "Nessun commento trovato per questo post."
            });
        }

        res.status(200).send({
            statusCode: 200,
            videoId: videoId,
            comments: commentsForPost
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

// get di un utente e comment byId
comment.get('/video/:videoId/comment/:commentId', async (req, res) => {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;

    try {
        const specificComment = await CommentModel.findOne({ _id: commentId, videoId: videoId }).populate('author').exec();

        if (!specificComment) {
            return res.status(404).send({
                statusCode: 404,
                message: "Commento non trovato per questo post."
            });
        }

        res.status(200).send({
            statusCode: 200,
            postId: postId,
            commentId: commentId,
            comment: specificComment
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

// put
comment.put('/comment/put/:commentId', async (req, res) => {
    const { commentId } = req.params;

    const commentExist = await CommentModel.findById(commentId);

    if (!commentExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This comment does not exist!"
        });
    }

    try {
        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await CommentModel.findByIdAndUpdate( commentId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Post saved successfully",
            result 
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
});

// post
comment.post('/video/:videoId/comment/post', async (req, res) => {
    
    const { videoId } = req.params;

    const newComment = new CommentModel({
        comment: req.body.comment,
        videoId: videoId,
        author: req.body.author
    });

    try {

        const comment = await newComment.save();

        res.status(200).send({
            statusCode: 200,
            message: "Comment added successfully",
            payload: comment
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
});

// delete
comment.delete('/comment/delete/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await CommentModel.findByIdAndDelete(commentId);

        if(!comment){

            return res.status(404).send({
                statusCode: 404,
                message: "Comment not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "comment deleted"
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
})


module.exports = comment;
