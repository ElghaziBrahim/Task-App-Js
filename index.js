var tasks_table = [
    {
        title: 'Start Project',
        dueDate: '2023-04-14',
        status: 'completed'
    },
    {
        title: 'Test Code',
        dueDate: '2023-06-10',
        status: 'incomplete'
    },
    {
        title: 'Deployment of the Project',
        dueDate: '2023-10-16',
        status: 'incomplete'
    }
];

const tastForm = document.querySelector(".task-form")
const teskButton = document.querySelector("#submit-button")
const tasks = document.querySelector(".tasks")
var titleInput = document.getElementById('title');
var dueDateInput = document.getElementById('duedate');

const RenderTasks = () => {
    for (let task of tasks_table) {
        let newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = `<h2 class="title">Title : ${task.title} </h2>
        <h4 class="duedate">Due Date : ${task.dueDate}</h4>
        <h4 class="status">Status : ${task.status}</h4>`
        tasks.appendChild(newTask);
    }
}

RenderTasks()

tastForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newTaskForm = {
        title: titleInput.value,
        dueDate: dueDateInput.value,
        status: 'incomplete'
    }
    console.log(newTaskForm)
    tasks_table.push(newTaskForm)
    console.log(tasks_table)
    let newTaskElement = document.createElement('div');
    newTaskElement.classList.add('task');
    newTaskElement.innerHTML = `<h2 class="title">Title : ${newTaskForm.title} </h2>
    <h4 class="duedate">Due Date : ${newTaskForm.dueDate}</h4>
    <h4 class="status">Status : ${newTaskForm.status}</h4>`
    tasks.appendChild(newTaskElement);
    titleInput.value = ""
    dueDateInput.value = ""
})
