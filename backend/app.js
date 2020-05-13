var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    dbOperations = require('./dbOperations')
    jwt = require('./auth')
    bcrypt = require('bcrypt')

app.use(bodyParser.json({limit:'20mb'}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:4200')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
    res.setHeader("Access-Control-Expose-Headers", "token,content-type")  
    if(jwt.isTokenRequired(req.method,req.url)){
        if(!req.headers.token){
            var err = new Error('Authentication required');
            next(err)
        }
        else{
            isValid = jwt.verify(req.headers.token)
            if(!isValid){
                var err = new Error('Invalid token');
                next(err)
            }
        }
    }
    next()
})


//register api

app.post('/user/register',(req,res)=>{
    dbOperations.connectDB()
    dbOperations.createCollection('users')
    
    var userobj = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
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
    }
    dbOperations.findOne('users',findUser).then((result)=>{
        if(result!=null){
            if(bcrypt.compareSync(req.body.password,result.password)){
                delete result.password
                delete result._id
                token = jwt.encode(result)
                // res.send({token:result,status:200})
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                  })
            }
            else{
                res.send({success:false, message:"Invalid credentials"})
            }
        }
        else{
            res.send({success:false, message:"User not found"})
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
