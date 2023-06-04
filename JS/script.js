{
    const tasks = [
        {
            content: "Prepare dinner",
            done: true,
        },
        {
            content: "Finish project",
            done: false,
        },
    ]

    const addNewTask = (newTask) => {
        tasks.push({ content: newTask });
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const setTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask").value.trim();

        if (newTask === "") {
            return;
        }

        addNewTask(newTask);
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
            <li class="section__listItem
            ${task.done ? " section__listItem--done" : ""}">
            <button class="js-done">Done?</button>
            ${task.content}
            <button class="js-remove">Remove</button>
            </li>`;
        }

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