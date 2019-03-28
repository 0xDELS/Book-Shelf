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
app.get('/api/getBook', (req, res) => {
    let id = req.query.id;

    Book.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

app.get('/api/getBooks', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

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
app.post('/api/updateBook', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
});

// DELETE //
app.delete('/api/deleteBook', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
})