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

    const render = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}
            >${task.content}</li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const init = () => {
        render();
    }

    init();
}