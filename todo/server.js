const home = require('./home');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
app.use(express.json());
app.use('/',home);
app.use(cors());
app.use(express.static(__dirname));

// imports 
const functions = require("./functions");

    app.get('/activities/:day',(req,res) =>{
        if
         (req.params.day == "mon"){
        console.log('Monday Activities');
      return  res.json(functions.returnmonday());
        }
        else if  (req.params.day == "tue"){
        console.log('tuesday Activities');
       return res.json(functions.returntuesday());
        }
       else if  (req.params.day == "wed"){
        console.log('wednesday Activities');
       return res.json(functions.returnwednesday());
        }
         else if  (req.params.day == "thur"){
        console.log('thursday Activities');
       return res.json(functions.returnthursday());
        }
         else  if  (req.params.day == "fri"){
        console.log('friday Activities');
       return res.json(functions.returnfriday());
        }
    
            });


    app.get('/user',(req,res)=>{
        
            res.json({
                name:"skyla",
                age:15,
                date: new Date()
            });
    
        }
        

);
function showfile(){
    let data = JSON.parse(fs.readFileSync('data.json','utf8'));
    console.log(data);
    const days = Object.keys(data);
    return days;
}
app.get('/datatest',(req,res) => {
    const data = showfile();
     res.json(data);

});
app.get('/datatest/:day',(req,res) => {
    const day = req.params.day;
    
    let data = JSON.parse(fs.readFileSync('data.json','utf8'));
    console.log('data sent for a single day  check console');
  return   res.json(data[day].activities);

});

app.post('/addtask/:day',(req,res)=>{
        const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
        const activity = req.body.task;
        const day = req.params.day;
    const raw = {[activity] : "Not yet"};
    data[day].activities.push(raw);
    console.log("task written succesfully");
       return  fs.writeFileSync('data.json', JSON.stringify(data,null,2));


})

app.post('/marktask/:day',(req,res)=>{
  
   
     console.log("marktask backend reached");
   
        const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
        const status = req.body.status;
        const index = req.body.index;
         console.log(`data reached backend !! \n status: ${status} \n Index :  ${index}`);

        
        const day = req.params.day;
        const string = Object.entries(data[day].activities[index]);
        console.log(string);
        const activity = Object.keys(data[day].activities[index])[0];

        // const raw = { [activity] : status};

        data[day].activities[index][activity] = status;
        fs.writeFileSync('data.json',JSON.stringify(data,null,2));


})

app.post('/deletetask/:day',(req,res)=>{
    console.log("delete task backend reached");
        const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
        
        const day = req.params.day;
        
        const index = req.body.index;
        data[day].activities.splice(index,1);

 console.log( "successfully deleted task!");

 fs.writeFileSync('data.json', JSON.stringify(data,null,2));


})



app.listen(3000);
