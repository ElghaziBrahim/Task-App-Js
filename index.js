// Global variables
var tasks_table = [];
var id = 0;
var edit_id;

// DOM elements
const taskForm = document.querySelector(".task-form");
const taskEditForm = document.querySelector(".task-edit-form");
const tasks = document.querySelector(".tasks");
const titleInput = document.getElementById('title');
const dueDateInput = document.getElementById('duedate');
const titleEdit = document.querySelector('.titleEdit');
const dueDateEdit = document.querySelector('.dueDateEdit');
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
}

function createTaskElement(task) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `
        <h2 class="title">Title : ${task.title} </h2>
        <h4 class="duedate">Due Date : ${task.dueDate}</h4>
        <h4 class="status">Status : ${task.status}</h4>
        <button class="editButton" onclick="editTask(${task.id})">edit</button>`;
    tasks.appendChild(newTask);
}

function editTask(id) {
    let buttonId = id;
    let taskNow = tasks_table.filter((t) => t.id == buttonId);

    dueDateEdit.value = taskNow[0].dueDate;
    titleEdit.value = taskNow[0].title;
    const index = tasks_table.findIndex(t => t.id === buttonId);
    edit_id = buttonId;
    if (index !== -1) {
        tasks_table.splice(index, 1);
    }
    taskEditForm.style.display = 'block';
    taskForm.style.display = 'none';
}

function handleTaskFormSubmit(e) {
    e.preventDefault();
    const newTaskForm = {
        id: ++id,
        title: titleInput.value,
        dueDate: dueDateInput.value,
        status: 'incomplete'
    };
    tasks_table.push(newTaskForm);
    renderTasks();
    titleInput.value = "";
    dueDateInput.value = "";
}

function handleTaskEditFormSubmit(e) {
    e.preventDefault();
    const newTaskForm = {
        id: edit_id,
        title: titleEdit.value,
        dueDate: dueDateEdit.value,
        status: statusEdit.value
    };
    tasks_table.push(newTaskForm);
    renderTasks();
    taskEditForm.style.display = 'none';
    taskForm.style.display = 'block';
}

// Initial rendering
renderTasks();
