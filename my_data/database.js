var sqlite3 = require("sqlite3");
var express= require("express");

var app=express();
app.use(express.json());

app.get("/create_table",(req,res)=>{
    var db=new sqlite3.Database("team",(err)=>{
        if(!err){
            db.run("create table my_student(id integer primary key autoincrement, name text, Address text, number integer)",(err,data)=>{
                if(!err){
                    console.log("table created sucessfully");
                    return res.send("your table is created");
                }
                else{
                    console.log(data)
                    return res.send("table is already exist")
                }
            })
        }
    })
})



app.post("/insert_data",(req,res)=>{
    let name = req.body.name
    var Address=req.body.Address
    var number= req.body.number
    var db = new sqlite3.Database("team",(err)=>{
        if(!err){
            db.run('insert into my_student(name, Address, number) values("'+ name +'", "'+ Address +'" , "'+ number +'");');
            console.log("data insert successfully")
            console.log("inserted sucessfully")
            return res.send("inserted sucessfully")
        }else{
            console.log("some error in inserting data")
            return res.send("some error in inserting data") 
        }
    }) 
})



app.get("/show_data",(req,res)=>{
    var db=new sqlite3.Database("team",(err)=>{
        if(!err){
            db.all('select * from my_student', (err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Done");
                    res.send(data);
                }
            });
        }else{
            console.log("some error in select data")
        }
    })
})



app.get("/Show_data_by_id/:id1",(req,res)=>{
    var id=req.params.id1
    var db=new sqlite3.Database("team",(err)=>{
        if(!err){
            db.all('select * from my_student where id = "'+id+'"', (err,data)=>{
                if(!err){
                    res.send(data)
                    console.log("Done");
                }else{
                    res.send("Your id is incorrect so,please check your Id....    ")
                    console.log("check you id");
                }
            })
        }
    })
})


app.put("/update_data/:id",(req,res)=>{
    var name=req.body.name;
    var Address=req.body.Address;
    var number=req.body.number;
    var id=req.params.id;
    var db=new sqlite3.Database("team",(err)=>{
        if(!err){
            db.run('update my_student set name="'+name+'",number="'+number+'", Address="'+Address+'" where id="'+id+'"',(err)=>{
                if(!err){
                    return res.send("Data update sucessfully")
                    console.log("Updatd sucessfully");
                    
                }
                else{
                    res.send("{ErrMsg:there is prblem while while editing data}")
                    console.log("not sucessfully");
                    
                }
            })
        }
    })
})


app.get("/Delete_data/:id",(req,res)=>{
    var id=req.params.id
    var db=new sqlite3.Database("team",(err)=>{
        if(!err){
            db.run('delete from my_student where id="'+id+'"',(err)=>{
                if(!err){
                    res.send("Deleted Sucessfully")
                    console.log("Deleted Sucessfully");
                    
                }else{
                    res.json('there is not available id in local server')
                }
            })
        }else{
            res.send("error while deleting data")
            console.log("error while deleting data");
            
        }
    })
})


app.listen(5000,()=>{
    console.log("server started.....      ")
})