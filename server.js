// richiedi le varie cose
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

const videoRoute = require('./routs/video')
const users2Route = require('./routs/users2')

require('dotenv').config()

const app = express();

const PORT = 2121;

// app.use('/pubblic', express.static(path.join(__dirname, './pubblic')))

app.use(express.json())

app.use(cors())
app.use('/', videoRoute)
app.use('/', users2Route)


mongoose.connect(process.env.MONGODB_URL,{
    uSeNewUrLParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error during db connection'))

db.once('open', ()=>{
    console.log('database successfully open');
})

app.listen(PORT, ()=> console.log('server up', PORT));