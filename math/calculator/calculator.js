// calculator vanilla js program
const math = require('./math');
const readline = require("node:readline");
const { stdin: input,stdout:output} = require("node:process");
const r1 = readline.createInterface({ input,output});
let calculation = 0;
console.log("hello and welcome to calculator!  \n");

function calculate (calculation){
    let a,b;
    
  r1.question("Enter first number " , (input1) => {
    const secondnumber = Number(input1);
    if (Number.isInteger(secondnumber)){
      a = parseInt(secondnumber);
    }
    else {
      console.log("Invalid input enter a number");
      r1.close();
      return;
    }
    
  r1.question("Enter second number " , (input2) => {
       const secondnumber = Number(input2);
    if (Number.isInteger(secondnumber)){
      a = parseInt(secondnumber);
    }
    else {
      console.log("Invalid input enter a number");
      r1.close();
      return;
    }

     b = parseInt(input2);
       r1.question("choose what you would like to do \n 1. Add 2.Multiply 3. substract 4. divide 5. Gcd \n press any  number/letter to exit \n " , (input3) =>{
        
  const choice = parseInt(input3);
      if (choice == 1){
        calculation++;
        console.log(`Number of calculations ${calculation}`)
          console.log( math.add(a,b)) ;    

         
          console.log("lets keep the fun going ...");

            calculate(calculation);
            
        }
        else if (choice == 2){
            
        calculation++;
        console.log(`Number of calculations ${calculation}`)
          console.log(math.multiply(a,b));  
           
          console.log("lets keep the fun going ...");

            calculate(calculation);
        
        }
          else if (choice == 3){
            
        calculation++;
        console.log(`Number of calculations ${calculation}`)
            console.log(math.subtract(a,b));
             
          console.log("lets keep the fun going ...");

            calculate(calculation);
        }
          else if (choice == 4) { 
            
        calculation++;
        console.log(`Number of calculations ${calculation}`)
            
          console.log(math.divide(a,b));
           
          console.log("lets keep the fun going ...");

            calculate(calculation);
          }
              else if (choice == 5) { 
            
        calculation++;
        console.log(`Number of calculations ${calculation}`)
            
          console.log(math.gcd(a,b));
           
          console.log("lets keep the fun going ...");

            calculate(calculation);
          }
          else {
            
        console.log(`Number of calculations ${calculation}`)
            r1.close();
            console.log("sucesssfully exited from the calculator app");
            return;
          }
    })
 })
})
}
calculate(calculation);
    

