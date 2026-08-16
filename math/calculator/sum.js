/**
  quiz
Given an array of integers [nums] and an integer [target], return indices of the two numbers such that they add up to target.

Example :

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
**/


let numbers = [1,2,3,4,5,6,7]
let sum = 7;
let i,j;
for (i = 0; i < numbers.length;i++){
   for (j = i +1; j < numbers.length; j++){
    
     if (numbers[i] + numbers[j] === 7 )
       console.log(numbers[i],numbers[j]);
   }
}
