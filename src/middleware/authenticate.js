const constant = require('../config/const');

async function authenticate(req, res, next) {
    const token = req.headers.token;
    next();
}
module.exports = authenticate;
