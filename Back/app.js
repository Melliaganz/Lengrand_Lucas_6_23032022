//Framework express pour Node
const express = require('express');
//Appel de la base de donnée de mongoose
const mongoose = require('mongoose');
//Module path de Node
const path = require('path');
//Middleware Express pour sécuriser les headers HTTP
const helmet = require('helmet');
//Mise en place du .env
const dotenv = require('dotenv');
//Node.js et express Middleware pour requêtes HTTP et erreurs.
const morgan = require('morgan');

dotenv.config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

//connexion à la base de données en utilisant les logins du fichier .env
mongoose.connect(`${process.env.DB_LIEN}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// ajout des headers pour les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisé pour parser le corps des réponses en JSON
app.use(express.json());

// ajout de morgan pour le log des requetes HTTP
app.use(morgan('combined'));

// routes
app.use(helmet());
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

module.exports = app;