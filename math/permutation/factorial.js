function factorial(number){
    let numbers = [];
    let answer = 1;

    while (number != 0){
     numbers.push(number);
     number--;
        }

     numbers.forEach( num =>{
        answer *=  num;
     }
     )
 return answer;
}

module.exports = factorial;