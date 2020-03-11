const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const todoLists = require('./router/todoLists-controller');
require('dotenv').config();

// var
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}
const mongoDB = 'mongodb://127.0.0.1/Yevhen';

app.use(cors());

//Setting mongoDB
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI || mongoDB, {useNewUrlParser: true})
    .then(() => console.log(`DB connection successful! DB: ${mongoDB}`))
    .catch((e) => console.error(`DB connection failed \n Error: ${e}`));

// routes
app.use('/todo-lists', todoLists);
app.get('/test', (req, res) => {
    res.send('test')
});

app.listen(port, () => console.log(`listening port: ${port}`));