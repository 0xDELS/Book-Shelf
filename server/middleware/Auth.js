const { User } = require('../models/User');

let Auth = (req, res, next) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) res.json({
            error: true
        })
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { Auth };