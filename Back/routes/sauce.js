const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// création des différentes routes de l'api en leur précisant les middlewares dans l'ordre
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router;