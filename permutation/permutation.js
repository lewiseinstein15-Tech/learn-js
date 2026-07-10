const factorial = require('./factorial');
let word = "BaNana".toLowerCase();

let wordcount = word.length;
let i ;
let character = []; 
let unique = [];
let numbers = [];
let repeatednumbers = [];
let factorialmultiples = [];
for(i = 0; i < wordcount; ){
    character.push(word[i]);
    i++;
}

  console.log(character);
  

  character.forEach( word => {
    
        numbers.push(
            character.filter(x => x === `${word}`.toLowerCase()).length
        );
  })
          console.log(numbers);

        //   big ammendment


          unique = [...new Set(numbers)]
             console.log(`unique filtered numbers ${unique}`);

            //  finish



             unique.forEach(element => {
                if (element > 1){
                    factorialmultiples.push(factorial(element));
                    repeatednumbers.push(element);
                }
                
             });
             console.log(repeatednumbers);
              console.log(`factorialmultiples Numbers : ${factorialmultiples}`);
             


 function multiply(numbers){
    let answer = 1;
    for (let y = 0; y < numbers.length;){
        answer *= Number(numbers[y]);
            y++;                    
    }
    
    console.log(`factorialmultiples: ${answer}`);
    return answer;

 }



 function permutationAnswer(){

   let  answer = factorial(wordcount) /  multiply(factorialmultiples) ;
   console.log(`Permutation Answer: ${answer}`);

 }
 permutationAnswer();