/**
 * Change the capitalization of all letters in a string
 */
export const changeCase = (txt) => {
    let str1 = "";
   for (let i = 0; i < txt.length; i++) {
       if (/[A-Z]/.test(txt[i])) {
           str1 += txt[i].toLowerCase();
       }
       else {
           str1 += txt[i].toUpperCase();
       }
   }
   return str1;
};
/**
 * 
* Filter out the non-unique values in an array
*/
export const filterNonUnique = (array) => {
let result = [];
    for(let arrayValue of array) {
        let tempArray = [];
        for (let tempArrayValue of array) {
            if(tempArrayValue === arrayValue) {
                tempArray.push(tempArrayValue);
            }
        }
        if(tempArray.length === 1) {
            result.push(arrayValue);
        }
    }
    return result;
};
/**
* Sort string in alphabetical order
*/
export const alphabetSort = (txt) => {
if(typeof(txt) == !'string') {
    throw new Error('something went wrong')
}
else {
 return txt.split('').sort().join('');
}
};
/**
* Get min integer
*/
export const getSecondMinimum = (arr) => {
   let x = arr.filter((v,i,s) => s.indexOf(v) === i).sort((a,b) => a-b)[1];
   return x;
};
/**
* Double every even integer
*/
export const doubleEveryEven = (arr) => arr.map(el => el % 2 === 0 ? el * 2 : el);
/**
* Create array with all possible pairs of two arrays
*/
export const getArrayElementsPairs = (x,y) => {
   let pairs = [];
   x.forEach(firstItem => {
    y.forEach(secondItem => {
      pairs.push([firstItem, secondItem]);
    })
  })
  return pairs;
};
/**
* Deep equal
*/
export const deepEqual = (obj1,obj2) => {
   if( obj1 === obj2 ) {
       return true;
   }
   if( obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object" ) {
       return false;
   }
   let propsObj1 = 0;
   let propsObj2 = 0;
   for( let prop in obj1 ) {
     propsObj1++; 
    }
   for( let prop in obj2 ) {
     propsObj2++;
     if( !(prop in obj1) || !deepEqual( obj1[prop], obj2[prop] ) ) {
       return false;
     }
   }
   return propsObj1 === propsObj2;
 }
 /**
 * Format date
 */
export const formatDate = (date) => {
  let result
  date instanceof Array ?
    result = new Date(...date) :
    result = new Date(date)
  return result.toLocaleDateString('en', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
}







