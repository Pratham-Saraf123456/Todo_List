const express = require('express');

const route = express.Router();
const auth = require('../controller/auth');
// const isAuth = require('../middleware/isAuth');
// const todoController = require('../controller/todo');



route.get('/',auth.getLogin);

route.get('/signup',auth.getSignup);

route.post('/sign-up',auth.postSignup);

route.post('/login',auth.postLogin);

route.post('/logout',auth.postLogout);

module.exports = route;