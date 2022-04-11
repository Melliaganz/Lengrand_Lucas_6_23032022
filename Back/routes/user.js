const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/verifyPassword');
// création des différentes routes de l'api en leur précisant dans l'ordre les middlewares
router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;