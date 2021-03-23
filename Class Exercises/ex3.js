"use strict";

function Exam(code, name, cfu, score, honors, datePassed){
    this.code = code;
    this.name = name;
    this.cfu = cfu;
    this.score = score;
    this.honors = honors;
    this.datePassed = datePassed;
}

function ExamList() {
    this.exams = [] ;
    // Function that add an exam to the exam list
    this.add = (exam) => {
        this.exams.push(exam);
    }

    this.find = (course_code) => {

        const result = this.exams.filter(ex => ex.code === course_code);
        // needs some checks to be completed
        return result[0]; // since the result of filter is an array

    }
}

const wa1 = new Exam('01FXY', 'Web Application I', 6, 28, false, '2021-02-10') ;
const db = new Exam('01CCC', 'Data SCience', 8, 25, false, '2021-02-11')


console.log(wa1) ;
console.log(db) ;

const myExam = new ExamList() ; 
myExam.add(wa1);
myExam.add(db);

// In order to avoid the Canceled error
//debugger;