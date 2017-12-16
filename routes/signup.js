const route=require('express').Router()

var user=require('../models/db').models.User

var x;

route.post('/',(req,res)=>{

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.passwordRepeat;
    var temp='password not matching'
    console.log(username)
    x=username;
    if(password!=password2){
    res.redirect('/signup.html')
    }
    else{
    user.create({
        name:username,
        email:email,
        password:password
    })
        .then((result)=>{
            res.redirect('/ques1.html')
        })
        .catch(err => console.error(err))
    }
})

route.get('/hello',(req,res)=>{
    res.send(x)
})

exports=module.exports={
route
}