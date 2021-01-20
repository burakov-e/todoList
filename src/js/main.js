'use strict';

const inputAdd = document.querySelector('.input-add');
const buttonAdd = document.querySelector('.btn-add');
const todoList = document.querySelector('.todo-list');

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
let colorIndex = 0;

function createTask(title, color) {
    const element = `
            <li class="task ${color}" data-color="${color}">
                <div class="task-title">${title}</div>
                <button class="btn-delete">
                    <svg class="icon">
                        <use xlink:href="./images/deleteIcon.svg#deleteIcon"></use>
                    </svg>
                </button>
            </li>
        `;

    todoList.insertAdjacentHTML("afterbegin", element);
}

function toggleClass(element, newClass, prevClass) {
    element.classList.remove(prevClass);
    element.classList.add(newClass);
}

function addTask() {
    if (!inputAdd.value) {
        alert('Таск не должен быть пустым!');
        return;
    }

    if (colorIndex === colors.length) {
        colorIndex = 0;
    }

    createTask(inputAdd.value, colors[colorIndex++]);

    const task = todoList.querySelector('.task');

    task.addEventListener('click', function (event) {
        if (event.target.closest('.btn-delete')) {
            todoList.removeChild(this);
            return;
        }

        const color = task.dataset.color;
        if (task.classList.contains(color)) {
            toggleClass(task, 'done', color);
        } else {
            toggleClass(task, color, 'done');
        }
    });

    inputAdd.value = null;
}

buttonAdd.addEventListener('click', addTask);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        addTask();
    }
});

