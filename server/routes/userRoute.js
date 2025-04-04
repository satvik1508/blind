const express = require('express');
const router = express.Router();
const {register} = require('../controllers/Register');
const {login}=require('../controllers/Login');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;