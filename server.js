// richiedi le varie cose
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

const videoRoute = require('./routs/video')
const users2Route = require('./routs/users2')
const commentRoute = require('./routs/commentVideo')
const loginRoute = require('./routs/login')

require('dotenv').config()

const PORT = 2121;
const app = express();

app.use('/videosPubblic', express.static(path.join(__dirname, './videosPubblic')))

app.use('/avatar', express.static(path.join(__dirname, './avatar')))

app.use(cors())

app.use(express.json())

app.use('/', videoRoute)
app.use('/', users2Route)
app.use('/', commentRoute)
app.use('/', loginRoute)


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