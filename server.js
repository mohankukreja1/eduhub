const express =require('express')
const config=require('./config')
const app=express()



app.listen(2222,()=>{
    console.log('server started')
})