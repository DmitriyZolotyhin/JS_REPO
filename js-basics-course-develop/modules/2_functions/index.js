/**
 * Currying 
 */
export const mergeWords = (string) => { 
  return function (nextString) { 
    if (nextString === undefined) { 
      return string; 
    } else { 
      return mergeWords (string + ' ' + nextString); 
    } 
  } 
}
/**
* Every/Some
*/
export const checkUsersValid = (goodUsers) => {
return function allUsersValid(submittedUsers) {
  return submittedUsers.every(function(submittedUser) {
    return goodUsers.some(function(goodUser) {
      return goodUser.id === submittedUser.id;
    });
  });
};
};
/**
* Reduce 
*/
export const countWords = (inputWords) => {
return inputWords.reduce(function(resultObj, word) {
  resultObj[word] = ++resultObj[word] || 1;
  return resultObj;
}, {});
};
/**
* Palindrome 
*/
export const isPalindrome =(str) => {
  for(let i = 0; i < str.length / 2; i++) {
      if(str[i] !== str[str.length - i - 1]) {
          return 'Entry is not a palindrome';
      }
  }
  return 'The entry is a palindrome';
}
/**
* Recursion 
*/
export const factorial = (n) => {
  return (n != 1) ? n * factorial(n - 1) : 1;
}
export const amountToCoins = (amount,coins) => {
if (amount === 0) {
    return [];
  } 
else
  {
    if (amount >= coins[0]) 
      {
      let left = (amount - coins[0]);
       return [coins[0]].concat( amountToCoins(left, coins) );
       } 
     else
       {
        coins.shift();
        return amountToCoins(amount, coins);
       }
   }
};
export const repeat = (func, num) => {
if (num>0) {
  func()
  return repeat(func , --num );
 }
} 
export const reduce = (iterable, reduceFn, accumulator) => {
for(let i of iterable) {
 accumulator = reduceFn(accumulator, i)
}
return accumulator
};
