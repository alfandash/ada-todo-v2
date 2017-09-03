var express = require('express');
var router = express.Router();

// add controllers
const todoController = require('../controllers/todo');

// add controllers
const jwt = require('../helper/jwtHelper');
router.use(jwt.loginCheck)

router.get('/', todoController.findById)
router.post('/', todoController.create)
router.put('/', todoController.edit)
router.put('/status', todoController.editStatus)
router.delete('/', todoController.delete)


module.exports = router
