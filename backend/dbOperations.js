var mongo = require('mongodb')
var url = "mongodb://127.0.0.1:27017/mydb";

var connectDB = function(){
    return new Promise((resolve,reject)=>{
        mongo.connect(url,(err,db)=>{
            if(err){
                throw err
            }
            resolve(db)
        })
    })
    
}

var createCollection = function(collectionName){
    connectDB().then((db)=>{
        var dbo = db.db("mydb");
        dbo.createCollection(collectionName,(err,result)=>{
            if(err){
                throw err
            }
            db.close()
        })
    })
    
}

var insert = function(schema, object){
    return new Promise((resolve,reject)=>{
        connectDB().then((db)=>{
            var dbo = db.db("mydb");
            dbo.collection(schema).insertOne(object,(err,result)=>{
                if(err){
                    throw err
                }
                resolve(result)
            })
        })
    })   
}

var findOne = function(schema,object){
    return new Promise((resolve,reject)=>{
        connectDB().then((db)=>{
            var dbo = db.db("mydb");
            dbo.collection(schema).findOne(object,(err,result)=>{
                if(err){
                    throw err
                }
                resolve(result)
            })
        })
    })
}

var find = function(schema,object){
    return new Promise((resolve,reject)=>{
        connectDB().then((db)=>{
            var dbo = db.db("mydb");
            dbo.collection(schema).find({}).toArray((err,result)=>{
                if(err){
                    throw err
                }
                resolve(result)
            })
        })
    })
}

var dbOperations = {
    connectDB : connectDB,
    createCollection : createCollection,
    insert : insert,
    findOne : findOne,
    find : find
}

module.exports = dbOperations