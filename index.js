// index.js
// Global variables
var tasks_table = JSON.parse(localStorage.getItem('tasks')) || [];
var id = JSON.parse(localStorage.getItem('id')) || 0;
var edit_id;
var sorted = false;

// DOM elements
const taskForm = document.querySelector(".task-form");
const taskEditForm = document.querySelector(".task-edit-form");
const tasks = document.querySelector(".tasks");
const titleInput = document.getElementById('title');
const dueDateInput = document.getElementById('duedate');
const priorityInput = document.getElementById('priority');
const titleEdit = document.querySelector('.titleEdit');
const dueDateEdit = document.querySelector('.dueDateEdit');
const priorityEdit = document.querySelector('.priorityEdit');
const statusEdit = document.querySelector('#status');

// Event listeners
taskForm.addEventListener('submit', handleTaskFormSubmit);
taskEditForm.addEventListener('submit', handleTaskEditFormSubmit);

// Initialize forms
taskEditForm.style.display = 'none';

// Functions
function renderTasks() {
    tasks.innerHTML = '';
    for (let task of tasks_table) {
        createTaskElement(task);
    }
    saveToLocalStorage();
}

function createTaskElement(task) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `
        <h2 class="title">Title : ${task.title} </h2>
        <h4 class="duedate">Due Date : ${task.dueDate}</h4>
        <h4 class="priority">Priority : ${task.priority}</h4>
        <h4 class="status">Status : ${task.status}</h4>
        <button class="editButton" onclick="deleteTask(${task.id})">Delete</button>
        <button class="editButton" onclick="editTask(${task.id})">Edit</button>`;
    tasks.appendChild(newTask);
}

function editTask(id) {
    let buttonId = id;
    let taskNow = tasks_table.filter((t) => t.id == buttonId);

    dueDateEdit.value = taskNow[0].dueDate;
    titleEdit.value = taskNow[0].title;
    priorityEdit.value = taskNow[0].priority;
    const index = tasks_table.findIndex(t => t.id === buttonId);
    edit_id = buttonId;
    if (index !== -1) {
        tasks_table.splice(index, 1);
    }
    taskEditForm.style.display = 'block';
    taskForm.style.display = 'none';
}

function deleteTask(id) {
    let buttonId = id;
    let taskNow = tasks_table.filter((t) => t.id == buttonId);
    const index = tasks_table.findIndex(t => t.id === buttonId);
    if (index !== -1) {
        tasks_table.splice(index, 1);
    }
    renderTasks();
}

function handleTaskFormSubmit(e) {
    e.preventDefault();
    const newTaskForm = {
        id: ++id,
        title: titleInput.value,
        dueDate: dueDateInput.value,
        priority: parseInt(priorityInput.value) || 1,
        status: 'incomplete'
    };
    tasks_table.push(newTaskForm);
    renderTasks();
    titleInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "";
}

function handleTaskEditFormSubmit(e) {
    e.preventDefault();
    const newTaskForm = {
        id: edit_id,
        title: titleEdit.value,
        dueDate: dueDateEdit.value,
        priority: parseInt(priorityEdit.value) || 1,
        status: statusEdit.value
    };
    tasks_table.push(newTaskForm);
    renderTasks();
    taskEditForm.style.display = 'none';
    taskForm.style.display = 'block';
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks_table));
    localStorage.setItem('id', id);
}

function sortbyDueDate() {
    if (sorted) {
        tasks_table.sort((t1, t2) => new Date(t2.dueDate) - new Date(t1.dueDate));
        sorted = false;
    } else {
        tasks_table.sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate));
        sorted = true;
    }
    renderTasks();
}

function sortbyPriority() {
    tasks_table.sort((t1, t2) => t1.priority - t2.priority);
    renderTasks();
}

function sortbyStatus() {
    tasks_table.sort((t1, t2) => {
        if (t1.status === 'incomplete' && t2.status === 'completed') {
            return -1;
        } else if (t1.status === 'completed' && t2.status === 'incomplete') {
            return 1;
        } else {
            return 0;
        }
    });
    renderTasks();
}

// Initial rendering
renderTasks();
