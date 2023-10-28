const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const Users2Model = require('../models/users2')
const jwt = require ('jsonwebtoken')
require('dotenv').config()


login.post('/login', async (req, res)=>{
    const user = await Users2Model.findOne({email:req.body.email})

    if(!user){
        return res.status(404).send({
            message: 'nome utente errato',
            statusCode: 404
        })
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(400).send({
            statusCode: 400,
            message: 'email o password errate'
        })
    }

    const token = jwt.sign({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        address: user.address
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    res.header('Authorization', token).status(200).send({
        message: 'Login effettuato con successo',
        statusCode: 200,
        token
    })
})



module.exports = login;