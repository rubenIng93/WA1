'use strict';

//let isBetween = require('dayjs/plugin/isBetween');
//dayjs.extend(isBetween);

//const dayjs = require('dayjs');

// define an object Task
function Task(id, description, urgent=false, priv=true, deadline=null){
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.private = priv;
    if (deadline != null){
        this.deadline = dayjs(deadline).format('MMMM D, YYYY h:mm A');
    }
    else
        this.deadline = '<not defined>';

    this.toString = () => (`Id: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.private}, Deadline: ${this.deadline}`);
}

function TaskList(){
    this.tasks = [];

    this.addTask = (task) => {
        this.tasks.push(task);
    }

    this.sortAndPrint = () => {
        // Custom sort function that leaves the not defined deadline as last position
        this.tasks.sort(function(t1, t2){
            if (t1.deadline !== '<not defined>' && t2.deadline !== '<not defined>'){
                return (dayjs(t1.deadline).isAfter(dayjs(t2.deadline)) ? 1:-1);
            }
            if (t1.deadline === '<not defined>'){
                return 1;
            }
            if (t2.deadline === '<not defined>'){
                return -1;
            }
            return 0;
        })            
            
        console.log(this.tasks.toString());
    }

    // filter for important tasks
    this.filterImportant = () => {
        let filteredTasks = this.tasks.filter(task => task.urgent == true);
        return filteredTasks;
    }

    //filter for private tasks
    this.filterPrivate = () => {
        let filteredTasks = this.tasks.filter(task => task.private == true);
        return filteredTasks;
    }

    // filter the tasks according to deadline (today)
    this.filterToday = () => {
        let today = dayjs();
        let filteredTasks = this.tasks.filter(task => dayjs(task.deadline).isSame(today, 'day'));
        return filteredTasks;
    }

    this.filterNext7Days = () => {
        let today = dayjs();
        let after7 = today.add(7, 'day');
        let filteredTasks = this.tasks.filter(task => dayjs(task.deadline).isBefore(after7, 'day')
            && dayjs(task.deadline).isAfter(today.subtract(1,'day'), 'day'));
        return filteredTasks;
    }

    /*
    this.filterAndPrint = () => {
        let filteredTasks = this.tasks.filter(task => task.urgent == true);
        console.log(filteredTasks.toString());
    }*/

    this.length = () => {
        return this.tasks.length ; 
    }

    this.getElementByIndex = (index) => {
        if (index < this.tasks.length){
            return this.tasks[index];
        }else{
            console.log('Index error');
            return;
        }
    }


    this.toString = () => (this.tasks.map((task) => (task.toString())).join('\n'));

}

const t2 = new Task(2, 'monday lab', false, false, 'April 3, 2021 10:00 AM');
const t3 = new Task(1, 'laundry', false, true, 'March 30, 2021 11:00 AM');
const t1 = new Task(3, 'phone call', true, false, 'March 8, 2021 4:20 PM');



let taskList = new TaskList();
taskList.addTask(t2);
taskList.addTask(t3);
taskList.addTask(t1);

//let first_el = document.createElement('li');
//first_el.className = "list-group-item";
//first_el.innerText = t2.description ; 

const task_list = document.querySelector('ul');

for (let i=0 ; i < taskList.length(); i++){

    // Element creation
    const tempTask = taskList.getElementByIndex(i);    

    const li = document.createElement('li');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');    


    // Class assignment and attributes
    li.className = "list-group-item"; 
    div1.className = "d-flex w-100 justify-content-between";
    div2.className = "custom-control custom-checkbox";
    input.className = "custom-control-input";
    input.type = 'checkbox';
    input.id = `check-t${i+1}`;
    if (tempTask.urgent){
        label.className = "custom-control-label important";
    }else{
        label.className = "custom-control-label";  
    }
    label.for = `check-t${i+1}`;  
    
    // Populate text field
    label.innerText = tempTask.description;

    // append in the html page
    task_list.appendChild(li)
    li.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(input);
    input.after(label);

    
    //if (tempTask.deadline != '<not defined>'){
    const small = document.createElement('small');
    small.innerText = tempTask.deadline;
    div1.appendChild(small);
    //} 


    if (!tempTask.private){
        const html = '<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
        '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'+
        '<path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'+
      '</svg>';

      div2.insertAdjacentHTML("afterend" , html);
    }

}

// set the filters
const aside = document.querySelector('aside div');
/*
console.log(taskList.filterImportant());
console.log(taskList.filterPrivate());
console.log(taskList.filterToday()); 
console.log(taskList.filterNext7Days());
*/