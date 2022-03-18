// ok - create hidden checker in arrayToHtmlTable that skips hidden objects
// ok - create a function that changes hidden property to true for checked objects

let taskArray = [];

function arrayToHtmlTable(inputArray) {
    tableOutput = document.getElementById("todoTable");
    tableOutput.innerHTML = "";
    
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].hidden) {
            continue;
        }
        let row;
        if (taskArray[i].checked) {
            row = document.getElementById("todoTable").insertRow(-1);
            row.className = "checked-row";
        } else {
            row = document.getElementById("todoTable").insertRow(0);
        }
        const taskcell = row.insertCell(0);
        const intimecell = row.insertCell(1);
        const checkboxcell = row.insertCell(2);
        const fintimecell = row.insertCell(3);
        
        taskcell.innerHTML = taskArray[i].taskname;
        intimecell.innerHTML = taskArray[i].dateEntered.toDateString();
        
        if (taskArray[i].checked) {
            checkboxcell.innerHTML = `<input type="checkbox" onclick="checkBoxUpdate(${i})" checked>`;
        } else {
            checkboxcell.innerHTML = `<input type="checkbox" onclick="checkBoxUpdate(${i})">`;
        }
        fintimecell.innerHTML = taskArray[i].dateCompleted;
    }

    tableHeader = tableOutput.createTHead().insertRow();
    const taskHeader = tableHeader.insertCell(0);
    const intimeHeader = tableHeader.insertCell(1);
    const checkboxHeader = tableHeader.insertCell(2);
    const fintimeHeader = tableHeader.insertCell(3);
    taskHeader.innerHTML = "Task Name";
    intimeHeader.innerHTML = "Date Entered";
    checkboxHeader.innerHTML = "Completed?";
    fintimeHeader.innerHTML = "Date Completed";
    document.getElementById("hideTasks").removeAttribute("disabled");
}

function addToHTMLTasks() {
    if (userInput.value == "") {
    }
    else {
        // create task object
        let taskObj = {
            "taskname": userInput.value,
            "dateEntered": new Date(),
            "checked": false,
            "hidden": false,
            "dateCompleted": null,
        };
        // add task object to list
        taskArray.push(taskObj);
        // display tasks in table
        arrayToHtmlTable(taskArray);
        // reset input field
        userInput.value = "";
        // set input field as focus
        userInput.focus();
    }
}

// change the state of taskObject based on checked status
const checkBoxUpdate = (i) => {
    taskArray[i].checked = !taskArray[i].checked;
    if (taskArray[i].checked) {
        taskArray[i].dateCompleted = (new Date()).toDateString();
    } else {
        taskArray[i].dateCompleted = null;
    }
    arrayToHtmlTable();
}

const hideCheckedTasks = () => {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].checked) {
            taskArray[i].hidden = true;
        }
    }
    arrayToHtmlTable();
}

document.getElementById("addTask").addEventListener('click',addToHTMLTasks);
document.getElementById("hideTasks").addEventListener('click',hideCheckedTasks);