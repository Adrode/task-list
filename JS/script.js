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
        render();
    }

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(taskIndex, 1);
                render();
            })
        })
    }

    const setTaskDone = () => {
        const taskDoneButtons = document.querySelectorAll(".js-done");
        taskDoneButtons.forEach((taskDoneButton, taskIndex) => {
            taskDoneButton.addEventListener("click", () => {
                tasks[taskIndex].done = !tasks[taskIndex].done;
                render();
            })
        })
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}
            >
            <button class="js-done">Done?</button>
            ${task.content}
            <button class="js-remove">Remove</button>
            </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        removeTask();
        setTaskDone();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask").value.trim();

        if (newTask === "") {
            return;
        }

        addNewTask(newTask);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}