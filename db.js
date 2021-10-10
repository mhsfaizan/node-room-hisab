const mongoose = require('mongoose');
const config = require('config');
const dbUser = config.get('dbUser');
const dbPassword = config.get('dbPassword');
const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.a7fde.mongodb.net/room-hisab?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongodb connected');
}).catch(err => {
    console.log(err);
    console.error('mongodb not connected');
});