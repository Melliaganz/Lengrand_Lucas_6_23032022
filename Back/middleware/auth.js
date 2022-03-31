const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    try {
        // on fait un split pour prendre uniquement la chaine du TOKEN
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
        // récupérer l'userId du TOKEN
        const userId = decodedToken.userId;
        // autorisation de la requete uniquement si l'userId existe dans la requete et si il correspond
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(403).json({
            error: new Error(': unauthorized request!')
        });
    }
};