// primitive math sign calculations
function add(a,b){
    return a + b;

}
function subtract(a,b){
    return a-b ;
    
}
function multiply(a,b){
    return a * b;
    
}
function divide(a,b){

    return a / b ;
    
}

function gcd (a,b){
    while(b != 0){
        let temp = b;
        b = a % b;
        a = temp;
    }
  return  Math.abs(a);
}


module.exports = {
    add , 
    subtract,
    multiply,
    divide ,
    gcd
};
