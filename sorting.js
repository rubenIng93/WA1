'use strict' ; 

let a = [3, 4, 88, 12, 9, 17] ;

console.log(a) ; 
a.sort((a,b) => (a-b)) ; // this is a callback!
console.log(a) ; 

//debugger;

function myFilter(arr, criteria){
    let res = [];
    for(let element of arr){
        if (criteria(element))
            res.push(element);
    }
    return res ;
}

let b = myFilter(a, (x) => (x%2 === 0)) ; 

console.log(b);