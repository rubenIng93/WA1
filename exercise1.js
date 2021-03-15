"use strict";

let exams_score = [28, 21, 26, 25, 28, 30, 27, 25, 18, 22, 22, 24, 26, 30, 25, 23, 23, 27, 22, 18, 29];

console.log(exams_score);

// In order to eliminate the 1st 2 lowest scores
exams_score = exams_score.sort();

exams_score.shift();
exams_score.shift();

// make the avg
let sum = 0;

for (let el of exams_score){
    sum += el;
}

let mean = sum / exams_score.length;

//append at the end of the list the 2 new values
exams_score.push(Math.round(mean));
exams_score.push(Math.round(mean));

console.log(exams_score);




