const express = require('express');
const Users2Model = require('../models/users2')
const users2 = express.Router();
// const validateUser = require('../middlewares/validateUser')
// const bcrypt = require('bcrypt')
// const verifiToken = require('../middlewares/verifyToken')
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
// const crypto = require('crypto');
// const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

// cloudinary.config({
//     cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
//     api_key: process.env.CLAUDINARY_API_KEY,
//     api_secret: process.env.CLAUDINARY_API_SECRET
// });

// const cloudStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'userAvatars',
//         format: async (req, file) => 'png', 
//         public_id: (req, file) => file.name
//     }
// });

// const cloudUpload = multer({ storage: cloudStorage });

// get
users2.get('/users2/get', async (req,res) =>{

    const{ page = 1, pageSize = 10} = req.query

    try {
        const users = await Users2Model.find()
            .limit(pageSize)
            .skip((page -1) * pageSize );

        const totalUsers = await Users2Model.count();


        res.status(200)
            .send({
                statusCode: 200,
                courentPage: Number(page),
                totalPages: Math.ceil(totalUsers / pageSize ),
                totalUsers,
                users
            })
    } catch (e) {
        res.status(500).send({
            statusCode:500,
            message: "errore interno del server",
            error: e
        })
    }
});

// get by Id
users2.get('/users2/get/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await Users2Model.findById(userId);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post non trovato!"
            });
        }

        res.status(200).send({
            statusCode: 200,
            user
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
users2.post('/users2/post', async(req,res) =>{

    // per la complessità dell'algoritmo da usare
    // const salt = await bcrypt.genSalt(10)

    // hash metodo per andare a generare
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const newUser = new Users2Model({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        address: req.body.address,
        avatar: req.body.avatar,
        // usa per creare la password criptata
        // password: hashedPassword,
        password: req.body.password
    })
    try {
        const user = await newUser.save()
    
        res.status(201).send({
            statusCode: 201,
                message: "utente salvato con successo",
                payload: user,
        })
    } catch (e) {
        res.status(500).send({
            statusCode:500,
            message: "errore interno del server",
            error: e
        })
    }
});

// put
users2.put('/users2/put/:userId', async (req,res)=>{
    const { userId } = req.params;

    const userExist = await Users2Model.findById(userId);

    if(!userExist){
        return res.status(404).send({
            statusCode: 404,
            message: "this user does not exist!"
        })
    }

    try {
        const dataToUpdateUser = req.body;
        const optionsUser = { new: true };
        const resultUser = await Users2Model.findByIdAndUpdate( userId, dataToUpdateUser, optionsUser)

        res.status(200).send({
            statusCode: 200,
            message: "User saved successfully",
            resultUser 
        })
    } catch (e) {
        res.status(500).send({
            statusCode:500,
            message: "errore interno del server",
            error: e
        })
    }
})

// put per caricare un'immagine di copertina (avatar) in Cloudinary per un utente specifico
// users2.put('/user2/:userId/avatar', cloudUpload.single('avatar'), async (req, res) => {
//     const userId = req.params.userId;

//     try {
//         // Verifica se l'immagine è stata caricata correttamente in Cloudinary
//         if (req.file) {
//             res.status(200).json({
//                 statusCode: 200,
//                 message: "Immagine di copertina caricata con successo",
//                 avatarUrl: req.file.path
//             });
//         } else {
//             res.status(400).json({
//                 statusCode: 400,
//                 message: "Caricamento dell'immagine di copertina non riuscito"
//             });
//         }
//     } catch (e) {
//         res.status(500).send({
//             statusCode: 500,
//             message: "Errore interno del server",
//             error: e
//         });
//     }
// });

// delete
users2.delete('/users2/delete/:userId', async (req, res)=>{
    const { userId } = req.params;

    try {
        const user = await Users2Model.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "User not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "user cancellato"
        })
    } catch (e) {
        res.status(500).send({
            statusCode:500,
            message: "errore interno del server",
            error: e
        })
    }
})


module.exports = users2;