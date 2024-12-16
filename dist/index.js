"use strict";
const taskInput = document.querySelector('#taskInput');
const addButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        listItem.classList.toggle('completed', task.completed);
        listItem.addEventListener('click', () => toggleTask(task.id, listItem));
        taskList.appendChild(listItem);
    });
}
function addTask() {
    if (!taskInput.value)
        return;
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
}
function toggleTask(id, taskElement) {
    const task = tasks.find(task => task.id === id);
    if (!task)
        return;
    // Aufgabe als erledigt markieren
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    // Wenn die Aufgabe erledigt ist, nach 2 Sekunden löschen
    if (task.completed) {
        setTimeout(() => {
            deleteTask(id);
        }, 2000);
    }
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    console.log('Task: ', id, 'gelöscht');
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
addButton.addEventListener('click', addTask);
