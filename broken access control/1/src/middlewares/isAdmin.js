exports.isAdmin = (req, res, next) => {
    const isAdmin = req.cookies.isAdmin === 'true';

    console.log("isAdmin cookie:", isAdmin);

    if (isAdmin) {
        next();
    } else {
        res.status(403).send('Access denied: Admins only');
    }
};
