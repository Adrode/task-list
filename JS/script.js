{
    let tasks = [];
    let hideTasks = false;
    const taskElement = document.querySelector(".js-newTask");

    const addNewTask = (trimmedTaskValue) => {
        tasks = [
            ...tasks,
            { content: trimmedTaskValue },
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const setTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const trimmedTaskValue = taskElement.value.trim();
        taskElement.focus();

        if (trimmedTaskValue === "") {
            return;
        }

        addNewTask(trimmedTaskValue);
        taskElement.value = "";
    }

    const addEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            })
        });

        const taskDoneButtons = document.querySelectorAll(".js-done");
        taskDoneButtons.forEach((taskDoneButton, taskIndex) => {
            taskDoneButton.addEventListener("click", () => {
                setTaskDone(taskIndex);
            })
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__listItem ${hideTasks ? "list__listItem--hidden" : ""}">
            <button class="js-done list__listButton">${task.done ? "✔" : ""}</button>
            <span class="list__taskData ${task.done ? " list__taskData--done" : ""}">${task.content}</span>
            <button class="js-remove list__listButton list__listButton--changedBackground">🗑</button>
            </li>`;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        addEvents();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}