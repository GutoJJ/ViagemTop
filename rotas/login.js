const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');



router.get('/', loginController.renderization);


router.post('/submit', loginController.autentication);

module.exports = router;
