const cookieJwtAuth = require('../middlewares/cookieJwtAuth');
const db = require('../db');

module.exports = async (req, res) => {
    const user = req.user;
    const data = req.body;
    await db.addPost(user.username, data.body);
    // db.printPosts();
    res.redirect("/welcome");
}