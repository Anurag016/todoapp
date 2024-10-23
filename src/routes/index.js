const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate")

const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');

//Login API
router.post('/login', userController.login);

//USER Authentication
router.all('/v1/*', authenticate);

//CRUD API - Todo List
router.get('/v1/get-todo',  todoController.getTodo);
router.post('/v1/add-todo',  todoController.addTodo);
router.put('/v1/update-todo', todoController.updateTodo);
router.delete('/v1/delete-todo', todoController.deleteTodo);

module.exports = router;
