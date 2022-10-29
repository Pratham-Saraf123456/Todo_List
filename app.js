const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
// const env = require("dotenv");
// require('dotenv').config()

// Nishank:2e6qinegEshobrmn todo
// "start": " MONGO_USER=Nishank MONGO_PASSWORD=2e6qinegEshobrmn MONGO_DATABASE=todo  nodemon app.js",
    
//  console.log(process.env.MONGO_USER);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sio3l.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const app = express();
const todoRoute=require('./router/todo.js');
const printLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.set('view engine','pug');
app.set('views','views');

app.use(helmet({
    contentSecurityPolicy: false,
  }));
app.use(compression())
app.use(morgan('combined',{stream:printLogStream}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

// app.use('/',(req,res,next)=>{
//     res.render('todo.pug')
//     console.log("hello");
// })

app.use(todoRoute)

// app.listen(3000);

mongoose.connect(MONGODB_URI)
        .then(res => {

            //  app.listen(3000);
            // app.listen(process.env.PORT||3000);
            app.listen(process.env.PORT || 3000, function(){
                console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
              });
        })
        .catch(err => {
            console.log("found an error");
        })