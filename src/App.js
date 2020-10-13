import TaskManager from "./TaskManager"

let state = {
    taskManager: new TaskManager("Task Manager!")
}

let view = (state) => {

    return `
        ${state.taskManager.render()}
    `
}

let update = {
    "add": (state, event, form) => {

        console.log("added item");

        try {
            let data = new FormData(form)
            let text = data.get("text")
            state.taskManager.addTask(text);
            
        } catch(err) {
            console.log(err);
        }

        return state
    },

    "remove": (state, event, id) => {

        console.log("removed item");

        event.preventDefault()
        try {
            state.taskManager.removeTask(id)
        } catch (err) {
            console.log(err);
        }
        return state
    },

    "tick": (state, event, id) => {
        console.log("ticked item");
        event.preventDefault()
        let task = state.taskManager.findTask(id)

        task.toggleDone()
        return state
    },

    "startTaskDrag": (state, event, id) => {
        //event.preventDefault()

        console.log("dragging ", id);

        event.dataTransfer.setData('taskID', id)


        console.log(event);
        
        return state
    },

    "stoppedTaskRemoveDrag": (state, event) => {
        event.preventDefault()

        let id = event.dataTransfer.getData('taskID')

        console.log("dropped ", id);

        state.taskManager.removeTask(id)

        return state
    },

    "stoppedTaskTickDrag": (state, event) => {
        event.preventDefault()

        let id = event.dataTransfer.getData('taskID')

        console.log("dropped ", id);

        state.taskManager.tickTask(id)

        return state
    }
}

app.start("root", state, view, update)