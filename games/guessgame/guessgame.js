const readline = require('readline');
const {savescores ,displayscores, resetscores,retrievescores} = require('./functions');
const fs = require('fs');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const scores = retrievescores();
let wins = scores.wins;
let losses = scores.losses;
let rounds = scores.rounds;

let progress =+ wins;
function checkprogress (progress){
    if (progress >= 5){
       return  console.log("Congratulation ululu!! level 1 completed");
    }
}
function randomnumbers(){
    let numbers= [];

     for (i=0;i<8;i++){
    
let number = Math.floor(Math.random()*10);
    numbers.push(parseInt(number));
}

    return numbers;
   
}

function gamemenu(wins,losses,rounds){
    
    r1.question(
        'Welcome to guess it!\n 1. play  \n 2. reset scores \n 3.my scores \n', (choice)=>
        { 
             const option = Number(choice);
            if (option== 1){
                
                play(wins,losses,rounds);

            }
            else if (option== 2){
                resetscores(); 
                
                    savescores(wins = 0,losses = 0,rounds = 0);
                 gamemenu(wins,losses,rounds);
                return;
            }
            else {
                
                console.log("My scores ");
                displayscores();
                gamemenu(wins,losses,rounds);
                return;
            
            }
        }
    );
    

}

function play(wins,losses,rounds){
    
let numbers = randomnumbers();
    
    process.stdout.write(` Round:${rounds} \n Wins:${wins} \n Losses:${losses} \n `);
    
     checkprogress(progress);

    
    
r1.question("Guess any number between 1 and 10 \n Enter 22 to go back \n", (guess)=>{
    if(Number(guess == 22)) {
        gamemenu(wins,losses,rounds);
        return;
    }
 
   
    let luck = Number(guess);
    if(numbers.includes(luck)){
        console.log("you've won! congrats");
        wins++;
         rounds++;
        savescores(wins,losses,rounds);
        
        process.stdout.write("Round Numbers ");
        for(num of numbers){
        process.stdout.write(num + '');
        }
        console.log("\n");
        
        checkprogress(progress);
        
      
        
       
        return play(wins,losses,rounds);
    } else{
        console.log("you've lost");
        process.stdout.write("Round Numbers ");
        losses++;
         rounds++;
        savescores(wins,losses,rounds);

        for(num of numbers){
        process.stdout.write(num + '');
        }
        
        console.log("\n");
        
        
     
        return play(wins,losses,rounds);
    }
    
}
);

}

gamemenu(wins,losses,rounds);
retrievescores();
savescores(wins,losses,rounds);

