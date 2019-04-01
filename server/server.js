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
const { Auth } = require('./middleware/Auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //
app.get('/api/logout', Auth, (req, res)=> {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
})

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

app.get('/api/getReviewer', (req, res) => {
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/getUsers', (req, res) => {
    User.find({}, (err, users) => {
        res.status(200).send(users);
    })
})

app.get('/api/userReviews', (req, res) => {
    Book.find({ownerID:req.query.user}).exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})
 
// POST //
app.post('/api/addBook', (req, res) => {
    const book = new Book(req.body)

    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookID: doc._id
        })
    });
});

app.post('/api/addUser', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: doc
        })
    })
});

app.post('/api/login', (req, res) => {
    User.findOne({'email':req.body.email}, (err, user) => {
        if(err) return res.status(400).send(err);
        if(!user) return res.json({isAuth: false, message:'Auth Failed: User not found'})

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({isAuth: false, message:'Auth Failed: Wrong Password'});
            
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

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