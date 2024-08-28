const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        console.log(req.user);
        return res.redirect('/welcome');
    } catch (err) {
        res.clearCookie("token");
        res.clearCookie("isAdmin");
        next();
    }
}