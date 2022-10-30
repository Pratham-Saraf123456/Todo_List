const express = require('express');

const route = express.Router();
const auth = require('../controller/auth');
const isNotAuth = require('../middleware/isNotAuth');
const todoController = require('../controller/todo');


route.get('/',isNotAuth,auth.getLogin);

route.get('/signup',isNotAuth,auth.getSignup);

route.post('/sign-up',auth.postSignup);

route.post('/login',auth.postLogin);

route.post('/logout',auth.postLogout);

module.exports = route;