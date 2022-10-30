const User = require('../model/user');
const bcrypt = require('bcryptjs');
const alert = require('alert');

exports.getLogin = (req,res,next) => {
    res.render('auth/login.pug',{
        path:"/login"
    })
}

exports.getSignup = (req,res,next) => {
    res.render('auth/signup.pug',{
        path:"/signup"
    })

};

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password!==confirmPassword){
        res.redirect('/signup');
        return ;
    }

    User.find({email:email})
        .then(user => {
            if(user.length>0){
                console.log("user already exist");
                res.redirect('/signup');
                return ;
            }

            return bcrypt.hash(password,15)
                        .then(pass =>{
                            const user = new User({
                                email:email,
                                password:pass
                            })
                            
                            console.log("kya bhai");
                            return user.save();
                        })
                        .then(user => {
                            console.log("successfully saved");
                            res.redirect('/');
                        })

        })
        .catch(err => {
            console.log(err);
        })
};

exports.postLogin = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email})
        .then(user => {
            if(!user){
                console.log("no user found");
                res.redirect('/signup');
                return ;
            }
            
                bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            req.session.isLoggedIn=true;
                            req.session.user = user;
                            req.session.save(err => {
                                console.log(err);
                                res.redirect('/task');
                            });
                            return ;
                        }
                        else{
                            res.redirect('/');
                            return ;
                        }
            
                    })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        
        console.log(req.session);
        res.redirect('/');
    });
};