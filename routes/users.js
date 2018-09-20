var express = require('express');
var router = express.Router();
var userController = require('../Controllers/User');

router.get('/', userController.getUsers);
router.post('/create', userController.addUser);
router.post('/login', userController.loginUser);

module.exports = router;
