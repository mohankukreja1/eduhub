const route=require('express').Router()

var user=require('../models/db').models.User



route.post('/',(req,res)=>{

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.passwordRepeat;
    var temp='password not matching'

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


exports=module.exports={
    route
}