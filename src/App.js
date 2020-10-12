const { default: TaskManager } = require("./TaskManager")

let state = {
    taskManager: new TaskManager("Task Manager!")
}

let view = (state) => {

    return `
        ${state.taskManager.render()}
    `
}

let update = {
    "add": (state, form) => {
        try {
            let data = new FormData(form)
            let text = data.get("text")
            state.taskManager.addTask(text);
            
        } catch(err) {
            console.log(err);
        }

        return state
    },

    "remove": (state, id) => {
        try {
            state.taskManager.removeTask(id)
        } catch (err) {
            console.log(err);
        }
        return state
    }
}

app.start("root", state, view, update)