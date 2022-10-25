const express = require('express');

const router = express.Router();

const adminTodo = require('../controller/todo.js');

router.get('/',adminTodo.getPage);

router.get('/:title',adminTodo.getPage);

router.get('/starPut/:listId',adminTodo.getFavStar);

router.post('/addText',adminTodo.postDescription)

router.post('/complete',adminTodo.postDelete);

router.post('/delComp',adminTodo.postDeleteComp);

module.exports=router;