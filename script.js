document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskText, false);
    saveTasks();

    input.value = "";
}

function createTask(taskText, completed) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    if (completed) {
        span.classList.add("completed");
    }

    // Mark as completed
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (li) {
        const span = li.querySelector("span");

        tasks.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });
}