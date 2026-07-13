const express = require('express');
const router = express.Router();
const fs = require('fs');

function createfile(){
    let raw = {
    "mon": {"activities" : [{"play":true }, {"read": false}] },
    "tue": {"activities" : [{"play":true }, {"read": false}] },
    "wed": {"activities" : [{"play":true }, {"read": false}] },
    "thur": {"activities" : [{"play":true }, {"read": false}] },
    "fri": {"activities" : [{"play":true }, {"read": false}] }}
;
    fs.writeFileSync('data.json',JSON.stringify(raw));
}
function addtask(){
    let data = JSON.parse(fs.readFileSync('data.json','utf-8'));
    let raw = {"added": true};
    data.mon.activities.push(raw);

   return  fs.writeFileSync('data.json', JSON.stringify(data,null,2));
}
function showfile(){
    let data = JSON.parse(fs.readFileSync('data.json','utf8'));
    return data;
}
router.get('/',(req,res) => {
    const data =  JSON.parse(fs.readFileSync('data.json','utf8'));
    res.json(data);
    });
router.get('/home',(req,res) => {
    const data = showfile();
    res.json(data);
});

module.exports = router;