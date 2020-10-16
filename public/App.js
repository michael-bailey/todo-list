

let state = {
    taskManager: new TaskManager("Task Manager!")
}

let view = (state) => {

    return `
        ${state.taskManager.render()}
    `
}

let update = {
    "init": async (state) => {
        console.log("state is", state);
        let data = await fetch('/tasks').then(res => res.json())
        console.log("data is", data);

        state.taskManager.addTasks(data.map(item => new Task(item)))

        console.log(state);
        
        return state
    },

    "add": async (state, event, form) => {

        event.preventDefault()


        console.log("added item");

        try {
            let formData = new FormData(form)
            let text = formData.get("text")

            let id = state.taskManager.addTask(text);

            let task = new Task({text})
            console.log(task);

            let data = await fetch('/tasks', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }).then(res => res.json())

        } catch (err) {
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
app.run("init")