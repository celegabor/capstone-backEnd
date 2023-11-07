const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const githubRoute = require('./routs/github')
const googleRoute = require('./routs/google')
const videoRoute = require('./routs/video')
const users2Route = require('./routs/users2')
const commentRoute = require('./routs/commentVideo')
const loginRoute = require('./routs/login');
const messageRoute = require('./routs/message');


require('dotenv').config()

const PORT = 2121;
const app = express();

app.use(express.json())
app.use(cors())

app.use('/video', express.static(path.join(__dirname, './video')))

app.use('/avatar', express.static(path.join(__dirname, './avatar')))



app.use('/', videoRoute)
app.use('/', users2Route)
app.use('/', commentRoute)
app.use('/', loginRoute)
app.use('/', githubRoute)
app.use('/', googleRoute)
app.use('/', messageRoute)



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