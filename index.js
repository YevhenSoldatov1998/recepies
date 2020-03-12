const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const todoLists = require('./router/todoLists-controller');
require('dotenv').config();

// var
const port = process.env.PORT || 3001;
console.log(port)

app.use(cors());

//Setting mongoDB
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
mongoose.connect('mongodb://heroku_gl1hbr34:ulvpb0hjd5f695aqie1h99ui3t@ds055565.mlab.com:55565/heroku_gl1hbr34',
    {useUnifiedTopology: true, useNewUrlParser: true,})
    .then((e) => {
        debugger
        console.log(`DB connection successful! DB: ${e}`)})
    .catch((e) => console.error(`DB connection failed \n Error: ${e}`));


// routes
app.use('/todo-lists', todoLists);
app.get('/test', (req, res) => {
    res.send('test')
});

app.listen(port, () => console.log(`listening port: ${port}`));