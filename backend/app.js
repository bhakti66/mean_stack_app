var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    dbOperations = require('./dbOperations')
    // dbOperations.connectDB()

app.use(bodyParser.json({limit:'20mb'}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:4200')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


//register api

app.post('/user/register',(req,res)=>{
    dbOperations.connectDB()
    dbOperations.createCollection('users')
    var userobj = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    var findUser = {
        email : req.body.email
    }
    dbOperations.findOne('users',findUser).then((result)=>{
        if(result==null){
            dbOperations.insert('users',userobj).then((result)=>{
                if(result.insertedCount==1){
                    res.send({status:200})
                }
                else{
                    res.send({status:500})
                }
            },(err)=>{
                res.send({status:500})
            })
        }
        else{
            res.send({message:"User exists"})
        }
    })
   
})


//login api 

app.post('/user/login',(req,res)=>{
    dbOperations.connectDB()
    var findUser = {
        email : req.body.email,
        password : req.body.password
    }
    dbOperations.findOne('users',findUser).then((result)=>{
        if(result!=null){
            delete result.password
            res.send({user:result,status:200})
        }
        else{
            res.send({message:"Invalid credentials",status:404})
        }
    })
});

//get all users 
app.get('/user/all',(req,res)=>{
    dbOperations.connectDB()
    dbOperations.find('users').then((result)=>{
        if(result!=null){
            res.send({user:result,status:200})
        }
        else{
            res.send({message:"Invalid credentials",status:404})
        }
    })
})

module.exports = app
