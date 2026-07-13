const fs = require('fs');
function returnmonday(){
   const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
   try{
    
   return console.log(data.mon.activities);

   }
   catch {
    return console.log("not available");
   }
}
function returntuesday(){
   const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
   try{
    
   return console.log(data.tue.activities);

   }
   catch {
    return console.log("not available");
   }
}

function returnwednesday(){
   const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
   try{
    
   return console.log(data.wed.activities);

   }
   catch {
    return console.log("not available");
   }
}

function returnthursday(){
   const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
   try{
    
   return console.log(data.thur.activities);

   }
   catch {
    return console.log("not available");
   }
}

function returnfriday(){
   const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
   try{
     
   return console.log(data.fri.activities);

   }
   catch {
    return console.log("not available");
   }
}





module.exports = {
    // display 
    returnmonday,
    returntuesday,
    returnwednesday,
    returnthursday,
    returnfriday

    // modify functions

};