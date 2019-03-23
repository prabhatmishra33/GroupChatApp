const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config();
const shortId = require('shortid');
var path_1 = require("path");

const DIST_FOLDER = path_1.join(process.cwd(), '../dist');
console.log(DIST_FOLDER);
const CHAT_APP_NAME = 'group-chat-app';


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'ap2',
    encrypted: true
})

app.set('view engine', 'html');

// Server static files from /browser
app.get('*', express.static(path_1.join(DIST_FOLDER,'/GroupChatApp')));


app.post('/message', async (req, res) => {
    // simulate actual db save with id and createdAt added
    const chat = {
      ...req.body,
      id: shortId.generate(),
      createdAt: new Date().toISOString()
    } 
    // trigger this update to our pushers listeners
    pusher.trigger(CHAT_APP_NAME, 'chat', chat)
    console.log(chat);
    res.send(chat)
})


app.post('/join', (req, res) => {
    //console.log('Chat Request received!');
    const chat = {
      ...req.body,
      id: shortId.generate(),
      type: 'joined',
      createdAt: new Date().toISOString()
    }
    // trigger this update to our pushers listeners
    pusher.trigger(CHAT_APP_NAME, 'chat', chat)
    res.send(chat)
  })


app.listen(process.env.PORT || 2000, () => console.log('Listening at 2000'))

