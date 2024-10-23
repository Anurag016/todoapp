const constant = require('../config/const');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
    const token = req.headers.token;
    // Verify the token
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    jwt.verify(token, constant.JWTSECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
        }
        console.log("Decoded: ", decoded);
        let userDetail = await userModel.findOne({
            userId: decoded.userId
        });
        if (!userDetail) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
        }
        req.userId = userDetail.userId;
        next();
    });
}
module.exports = authenticate;
