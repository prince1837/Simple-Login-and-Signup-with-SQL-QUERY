var sqlite3 = require("sqlite3");
var express= require("express");

var app=express();
app.use(express.json());
    var db = new sqlite3.Database('mydb.db',(err,data)=>{
        if(!err){
            db.run('CREATE TABLE IF NOT EXISTS users(id  integer primary key autoincrement,email text, password text)',(err)=>{
                if(!err){
                        console.log('table is created sucessfully!')
                }
                else{
                    console.log(err.message)
                }
            })
        }
})

app.post('/signup',(req,res)=>{
    var user = req.body;
    if(user!=undefined){
        console.log('user')
        var db = new sqlite3.Database('mydb.db',(err,data)=>{
            if(!err){
                db.run('INSERT INTO users(email,password) values("'+user.email+'","'+user.password+'")',(err)=>{
                    if(!err){return res.send('you are signup successfully!')}
                    else{console.log(err);return res.send('error')}
                })
                }
            })
    }
    else{
        console.log('getting undefined data');
        return res.send('undefined data')
    }

})



app.post("/signin",(req,res)=>{
    var password=req.body.password
    var email=req.body.email
    var db= new sqlite3.Database("mydb.db",(err,data)=>{
       if(!err){
           db.all('SELECT email,password FROM users where email="'+email+'" and password="'+password+'"',(err,data)=>{
               if(data.length==1){
                   return res.send('you are logged in successfully!')
               }
               else{
                   return res.send('You have entered wrong email or password!')
               }
           })
       }
    })
})


app.put("forgotpassword",(err,data)=>{
    var db=new sqlite3.Database("mydb.db",(err,data)=>{
        if(!err){
            db.all('')
        }
    })
}) 


app.listen(4000,()=>{
    console.log(" your server has been started..   ");
})