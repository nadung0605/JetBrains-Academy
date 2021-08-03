let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskList   = document.getElementById("task-list");

// Display saved tasks from local storage
displaySavedTasks(savedTasks);

let addBtn  = document.getElementById("add-task-button");
let delBtns = document.getElementsByClassName("delete-btn");
let inputs  = document.getElementsByTagName("input");

// Handle when user click add button
addBtn.addEventListener("click", createTask);

// Handle when user click checkbox or delete button
taskList.addEventListener("click", function (event) {
    let task = event.target.parentNode;

    // If user click checkbox
    if (event.target.type === "checkbox") {
        completeTask(task);
    }

    // If user click delete button
    if (event.target.className === "delete-btn") {
        deleteTask(task);
    }
})

// Display saved tasks from local storage
function displaySavedTasks(savedTasks) {
    for (let i = 0; i < savedTasks.length; i++) {
        let input  = document.createElement("input");
        let span   = document.createElement("span");
        let button = document.createElement("button");
        let li     = document.createElement("li");

        // Checkbox
        input.type = "checkbox";

        // Span of task name
        span.className   = "task";
        span.textContent = savedTasks[i].name;

        // Delete button
        button.className = "delete-btn";
        button.appendChild(document.createTextNode("\u00d7"));

        // Update if task was checked
        if (savedTasks[i].completed) {
            input.checked = true;
            span.classList.add("checked");
        }

        // Add element to li
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(button);

        // Add li to ul
        taskList.appendChild(li);
    }
}

// Handle when user create task
function createTask() {
    let taskInput = document.getElementById("input-task");

    if (taskInput.value !== "") {
        let newInput  = document.createElement("input");
        let newSpan   = document.createElement("span");
        let newButton = document.createElement("button");
        let newLi   = document.createElement("li");

        // Checkbox
        newInput.type = "checkbox";

        // Span of task name
        newSpan.className   = "task";
        newSpan.textContent = taskInput.value;

        // Delete button
        newButton.className = "delete-btn";
        newButton.appendChild(document.createTextNode("\u00d7"));

        // Add element to li
        newLi.appendChild(newInput);
        newLi.appendChild(newSpan);
        newLi.appendChild(newButton);

        // Add li to ul
        taskList.appendChild(newLi);

        // Save new task to local storage
        savedTasks.push({
            name: taskInput.value,
            completed: false
        });
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        // Clear input task
        taskInput.value = "";
    }
}

// Handle when user click delete button of old task
function deleteTask(task) {
    // Remove task from local storage
    let index = indexOfTask(task);
    savedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Remove from ul
    taskList.removeChild(task);
}

// Handle when user click checkbox
function completeTask(task) {
    // Update class of span
    task.children[1].classList.toggle("checked");

    // Update state of task and save to local storage
    let index = indexOfTask(task);
    savedTasks[index].completed = savedTasks[index].completed ? false : true;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function indexOfTask(task) {
    let childNodes = taskList.childNodes;

    for (let i = 0; i < childNodes.length; i++)
        if (childNodes[i] === task) return i;
}