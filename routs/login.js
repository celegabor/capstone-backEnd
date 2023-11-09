const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const Users2Model = require('../models/users2')
const jwt = require ('jsonwebtoken')
const verifiToken = require('../middlewares/verifyToken')
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
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        avatar: user.avatar
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    res.header('Authorization', token).status(200).send({
        message: 'Login effettuato con successo',
        statusCode: 200,
        token
    })
})

login.post('/update', verifiToken, async (req, res) => {
    const { userId, email, newPassword } = req.body;
  
    console.log(
        req.body.userId
    );
    try {
      const user = await Users2Model.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: 'Utente non trovato',
          statusCode: 404,
        });
      }
  
      if (email) {
        user.email = email;
      }
  
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      res.status(200).send({
        message: 'Credenziali aggiornate con successo',
        statusCode: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Errore durante l\'aggiornamento delle credenziali',
        statusCode: 500,
      });
    }
  });



module.exports = login;