const express = require('express');
const MessageModel = require('../models/message')
const message = express.Router();
const validateMessage = require('../middlewares/validateMessage')

require('dotenv').config()

// get
message.get('/message/get', async (req, res) => {
    try {
        const message = await MessageModel.find().populate('from')

        res.status(200).send({
            statusCode: 200,
            message
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

// get di un singolo messaggio per ID
message.get('/message/:messageId', async (req, res) => {
    const messageId = req.params.messageId;

    try {
        const specificMessage = await MessageModel.findById(messageId).populate('from');

        if (!specificMessage) {
            return res.status(404).send({
                statusCode: 404,
                message: "Messaggio non trovato."
            });
        }

        res.status(200).send({
            statusCode: 200,
            messageId: messageId,
            message: specificMessage
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

// post
message.post('/message/post', validateMessage, async (req, res) => {
    const { from, to, message } = req.body;

    const newMessage = new MessageModel({
        from: from,
        to: to,
        message: message,
    });

    try {
        const message = await newMessage.save();

        res.status(200).send({
            statusCode: 200,
            message: "Messaggio aggiunto con successo",
            payload: message
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            payload: message,
            error: e
        });
    }
});

// delete
message.delete('/message/delete/:messageId', async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await MessageModel.findByIdAndDelete(messageId);

        if (!message) {
            return res.status(404).send({
                statusCode: 404,
                message: "Messaggio non trovato o già cancellato!"
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: "Messaggio cancellato con successo"
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server",
            error: e
        });
    }
});

module.exports = message;
