
let state = new TaskManager("Task Manager!")

let view = (state) => {

    return `
        ${state.render()}
    `
}

let update = {
    "init": async (state) => {
        await state.reload()
        return state
    },

    "add": async (state, event, form) => {
        event.preventDefault()

        try {
            let formData = new FormData(form)
            let text = formData.get("text")
            await state.addTask(text);
        } catch (err) {
            console.log(err);
        }

        return state
    },

    "remove": async (state, event, id) => {
        event.preventDefault()

        try {
            await state.removeTask(id)
        } catch (err) {
            console.log(err);
        }
        return state
    },

    "tick": async (state, event, id) => {
        event.preventDefault()
        try {
            await state.tickTask(id)
        } catch (err) {
            console.log(err);
        }
        return state
    },

    "startTaskDrag": (state, event, id) => {
        event.dataTransfer.setData('taskID', id)
        return state
    },

    "stoppedTaskRemoveDrag": async (state, event) => {

        let id = event.dataTransfer.getData('taskID')

        console.log("dropped ", id);

        await state.removeTask(id)

        return state
    },

    "stoppedTaskTickDrag": async (state, event) => {

        let id = event.dataTransfer.getData('taskID')

        console.log("dropped ", id);

        await state.tickTask(id)

        return state
    }
}

app.start("root", state, view, update)
app.run("init")