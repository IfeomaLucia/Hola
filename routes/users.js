var express = require('express');
var router = express.Router();
var userController = require('../Controllers/User');

router.get('/', userController.getUsers);
router.post('/create', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;
