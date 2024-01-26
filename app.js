document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks and their completion status to local storage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to create a new task item
    function createTaskItem(taskText, isCompleted) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="btn btn-success btn-sm mr-2 complete-btn"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-danger btn-sm delete-btn"><i class="fa-solid fa-delete-left"></i></button>
            </div>
        `;

        if (isCompleted) {
            taskItem.classList.add("list-group-item-success");
        }

        const completeButton = taskItem.querySelector(".complete-btn");
        completeButton.addEventListener("click", function () {
            taskItem.classList.toggle("list-group-item-success");
            isCompleted = !isCompleted;
            saveTasksToLocalStorage(savedTasks);
        });

        const deleteButton = taskItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            taskItem.remove();
            // Remove the task from the savedTasks array
            const taskIndex = savedTasks.indexOf(taskText);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
                saveTasksToLocalStorage(savedTasks);
            }
        });

        return taskItem;
    }

    // Populate the task list with saved tasks and their completion status
    for (const taskText of savedTasks) {
        const isCompleted = savedTasks.includes(`completed_${taskText}`);
        const taskItem = createTaskItem(taskText, isCompleted);
        taskList.appendChild(taskItem);
    }

    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const taskItem = createTaskItem(taskText, false);
            taskList.appendChild(taskItem);
            // Add the task to the savedTasks array
            savedTasks.push(taskText);
            saveTasksToLocalStorage(savedTasks);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addButton.click();
        }
    });
});