const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
// const env = require("dotenv");
require('dotenv').config()

const app = express();
const todoRoute=require('./router/todo.js');

app.set('view engine','pug');
app.set('views','views');


app.use(compression())
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

// app.use('/',(req,res,next)=>{
//     res.render('todo.pug')
//     console.log("hello");
// })

app.use(todoRoute)

// app.listen(3000);

mongoose.connect('mongodb+srv://Nishank:2e6qinegEshobrmn@cluster0.sio3l.mongodb.net/todo?retryWrites=true&w=majority')
        .then(res => {
            // app.listen(process.env.PORT||3000);
            app.listen(process.env.PORT || 3000, function(){
                console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
              });
        })
        .catch(err => {
            console.log("found an error");
        })