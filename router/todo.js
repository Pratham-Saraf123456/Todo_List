const express = require('express');

const router = express.Router();

const adminTodo = require('../controller/todo.js');
const isAuth = require('../middleware/isAuth.js');

router.get('/task',isAuth,adminTodo.getPage);

router.get('/:title',isAuth,adminTodo.getPage);

router.get('/starPut/:listId',isAuth,adminTodo.getFavStar);

router.post('/addText',isAuth,adminTodo.postDescription)

router.post('/complete',isAuth,adminTodo.postDelete);

router.post('/delComp',isAuth,adminTodo.postDeleteComp);

module.exports=router;