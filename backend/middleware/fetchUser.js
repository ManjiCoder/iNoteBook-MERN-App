// Creating a middleware to decode user from a JWT 
const jwt = require('jsonwebtoken');//  npm jwt for token

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const fetchUser = (req, res, next) => {
    // Get the user form the JWT joken & add Id to the req object
    const token = req.header('auth-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Please authenticate a using valid token" });
    }
    try {
        const verifyUser = jwt.verify(token, JWT_SECRET);
        req.user = verifyUser.user; //  IMP line
        next()
    } catch (error) {
        // return res.status(401).json({ error: "Please authenticate a using valid token" })
        console.log(error.message);
        res.status(401).json({ error: "Please authenticate a using valid token" });
    }
}

module.exports = fetchUser;