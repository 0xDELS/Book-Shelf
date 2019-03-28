const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/Config').get(process.env.NODE_ENV);
const app = express();

//DB
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true , useCreateIndex: true});

//MODELS
const { User } = require('./models/User');
const { Book } = require('./models/Book');

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
})