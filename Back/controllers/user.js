const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const salt = 10;

dotenv.config();



// controller d'authentification
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, salt)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//controller de connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.writeHead(401, '"E-mail Invalide !', {
                    'content-type': 'application/json'
                });
                res.end('E-mail Utilisateur incorrect');
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                         res.writeHead(400, 'Mot de passe incorrect', {
                            'content-type': 'application/json'
                        });
                        res.end('Mot de passe incorrect !');
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.JWTPRIVATEKEY /*on pourrait utiliser ici une chaine crypto pour une production*/ , { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};