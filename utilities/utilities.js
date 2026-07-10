// // 1. .split() & .filter()
// const word = "banana";
// const uniquechar = word.split('').filter((char,i,arr) => arr.indexOf(char) === i  );
// console.log(uniquechar);


// // 2. promise
// const data  = await fetch('http://localhost:3000/datatest/mon');
// const raw = data.json();
// // types of data from backend
// console.log(typeof(data));
// console.log(typeof(raw));

// raw.then(value => {
//     console.log(value);
// }).catch(err => {
//     console.log(err);
// }).finally( ()=>{
//     console.log("Done!");
// }
// );
// //   making a custom promise
// const mypromise = new Promise((resolve,reject) =>{
// setTimeout(
//     ()=> {
//         if(data){
//             resolve(raw); // fulfilled state
//         } else {
//             reject("something broke!"); //rejected state 
//         }
//     },1000);
// });

// // accessing custom promise values

// mypromise.then( value =>{
//         console.log(value);
//     }
// ).catch(err => {
//         console.log(err);
//     }
// ).finally(
//    () =>{
// console.log("If your data has not passed please check your internet connection or check your api call functions. ");
//     });


    // 3. Finding how many times a letter is repeated in a word.

function repeatedwords(){

    const word = "skylaa";
    const counts = {};
    for(char of word){
        counts[char] = (counts[char] || 0 ) + 1 ;
    }
    console.log(counts);

 const repeated = Object.entries(counts).
}

repeatedwords();


