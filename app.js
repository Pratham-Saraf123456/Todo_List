const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sio3l.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const app = express();

const todoRoute=require('./router/todo.js');
const authRoute=require('./router/auth.js');
const User = require("./model/user");
const csrfProtection = csrf();

const printLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});


const store = new MongoDbStore({
  uri:MONGODB_URI,
  collection:'session'
});

app.set('view engine','pug');
app.set('views','views');

app.use(helmet({
    contentSecurityPolicy: false,
  }));
app.use(compression())
app.use(morgan('combined',{stream:printLogStream}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret:'my authentication',
  resave:false,
  saveUninitialized:false,
  store:store
}));

app.use(csrfProtection);

app.use((req,res,next)=>{
  if(!req.session.user){
      return next();
  }


  User.findById(req.session.user._id)
      .then(user =>{
          req.user = user;
          next();
      })
      .catch(err => {
          console.log(err);
      })
});

app.use((req,res,next)=>{
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
})

// app.use('/',(req,res,next)=>{
//     res.render('todo.pug')
//     console.log("hello");
// })

app.use(authRoute);
app.use(todoRoute);

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