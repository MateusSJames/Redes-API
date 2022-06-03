const jwt = require('jsonwebtoken');
const SECRET = 'secretkey'

module.exports = function verifyJWT(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(403).json({message: 'Esse usuario nao possui token'});
        }
        const decoded = jwt.verify(token, SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch (err) {
        return res.status(401).json({message: 'Permissao nao liberada para esse usuario'});
    }
}