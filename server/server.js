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

// GET //


// POST //
app.post('/api/book', (req, res) => {
    const book = new Book(req.body)

    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookID: doc._id
        })
    });
});

// UPDATE //


// DELETE //


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
})