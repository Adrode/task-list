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

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    }

    const toggleHideDoneTasks = () => {
        hideTasks = !hideTasks;
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

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="list__listItem ${task.done && hideTasks ? "list__listItem--hidden" : ""}">
                <button class="js-done list__listButton">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="list__taskData ${task.done ? " list__taskData--done" : ""}">
                    ${task.content}
                </span>
                <button class="js-remove list__listButton list__listButton--changedBackground">
                    🗑
                </button>
            </li>`;

        document.querySelector(".js-tasks").innerHTML  = tasks.map(taskToHTML).join("");
    }

    const renderButtons = () => {
        const featureButtons = document.querySelector(".js-featureButtons");

        if (!tasks.length) {
            featureButtons.innerHTML = "";
            featureButtons.classList.add("section__container--hidden");
            return;
        }

        featureButtons.classList.remove("section__container--hidden");

        featureButtons.innerHTML = `
            <button class="js-hideDoneTasks section__featureButton">
                ${hideTasks ? "Show" : "Hide"} done tasks
            </button>
            <button
                class="js-setAllTasksDone section__featureButton"
                ${ tasks.every(({ done }) => done) ? " disabled" : "" }
            >
                Mark all tasks as done
            </button>
        `;
    }

    const bindEvents = () => {
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

    const bindFeatureButtonsEvents = () => {
        const setAllTasksDoneButton = document.querySelector(".js-setAllTasksDone");

        if (setAllTasksDoneButton) {
            setAllTasksDoneButton.addEventListener("click", setAllTasksDone);
        }

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    }

    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindFeatureButtonsEvents();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}