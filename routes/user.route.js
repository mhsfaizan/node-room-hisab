const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contrller');

router.route('/').get(userController.getUsers).post(userController.addUser);

router.route('/:id').get(userController.getUser)

module.exports = router;