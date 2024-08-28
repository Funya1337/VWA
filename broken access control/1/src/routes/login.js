const jwt = require('jsonwebtoken');
const db = require('../db');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUser(username);
    // console.log(user);

    if (!user) {
        return res.status(403).json({
            error: "Invalid login",
        });
    }

    if (user.password !== password) {
        return res.status(403).json({
            error: "Invalid login",
        });
    }

    delete user.password;

    const token = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        // httpOnly: true,
    });

    res.cookie("isAdmin", true ? user.username === 'admin' : false)

    return res.redirect("/welcome")
}