const route=require('express').Router()
var passport = require('passport');
var expressValidator = require('express-validator');

var LocalStrategy = require('passport-local').Strategy;

//const db=require('../models/db')

route.post('/',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.passwordRepeat;
    var temp='password not matching'

    if(password!=password2){
    res.redirect('/signup.html')
    }
    else{

    }
})

exports=module.exports={
    route
}