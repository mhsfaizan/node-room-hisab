const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({message: "Token not provided", result: null, error: [], statusCode: 401})

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch(err) {
        res.status(401).json({message: "Invalid token", result: null, error: [], statusCode: 401})
    }
}