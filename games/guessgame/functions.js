const fs = require('fs');
function savescores(wins,losses,rounds){
    const data = JSON.stringify({wins,losses,rounds},null,2);
    fs.writeFileSync('scores.json',data);
}

function retrievescores(){
  
        try{
            let data = fs.readFileSync('scores.json','utf-8');
            
    let raw=  JSON.parse(data);

            let { wins = 0, losses = 0 , rounds= 0} = raw ;
            
    return {wins ,losses,rounds};

        }
        catch{
        return {wins:0,losses:0,rounds:0};
        }
    
}
function resetscores(wins,losses,rounds){
    const data = JSON.stringify({wins:0,losses:0,rounds:0},null,2);
    
    console.log("scores reset (0:0:0) successfully!");
    return fs.writeFileSync('scores.json',data);
}

function displayscores(){
    const data = JSON.parse(fs.readFileSync('scores.json','utf-8'))
return console.log("  Wins : ", data.wins ,"\n ","Losses  : ", data.losses ,"\n ","Rounds : ", data.rounds ,"\n ");

}

module.exports = {
    savescores,
    retrievescores,
    resetscores,
    displayscores
}