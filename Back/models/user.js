const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//schéma de donnée pour un utilisateur(User)
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Veuillez entrer votre adresse email"],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
      },
      password: {
        type: String,
        required: [true, "Veuillez choisir un mot de passe"]
      }
});

//plugin de validation Mongoose pour garantir l'unicité de l'email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);