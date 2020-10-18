class TaskManager {
    id = 0
    tasks = []
    title = ""

    constructor(title) {
        this.id = window.crypto.getRandomValues(new Uint8Array(4)).join("")
        this.title = title
    }

    async reload() {
        try {
            let data = await fetch('/tasks').then(res => res.json())
            this.tasks = data.map(item => new Task(item))
            console.log(this.tasks)
        } catch (err) {
            console.log(err)
        }
        return true
    }

    async addTask(text) {
        let task = new Task({text})
        let newtasks = await fetch("/tasks", {
            body: JSON.stringify(task),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        this.tasks = newtasks.map(t => new Task(t))
        console.log(this.tasks)
    }

    async removeTask(id) {
        let tasks = await fetch(`/tasks/${id}`, {
            method: "DELETE",
        }).then(res => res.json())
        this.tasks = tasks.map(t => new Task(t));
    }

    findTask(id) {
        return this.tasks.filter(task => task.id == id)[0]
    }

    async tickTask(id) {
        let task = this.tasks.filter(i => i.id == id)[0]

        console.log("updating: ", task)

        let data = {
            done: !task.done
        }

        console.log("data: ", data)

        let tasks = await fetch(`/tasks/${id}`, {
            body: JSON.stringify(data),
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())

        this.tasks = tasks.map(i => new Task(i))
    }

    render() {
        return `
            <div id="${this.id}" class="TaskManager">
                <h1>${this.title}</h1>
                <div class="table-wrapper">
                    <table>
                        <tr class="header-row">
                            <th>task</th>
                            <th>actions</th>
                        </tr>
                        ${this.tasks.map(task => task.render()).join("")}
                    </table>
                </div>
                <form class="newTaskForm" onsubmit="app.run('add', event, this);return false;">
                    <input id="new_task_text" name="text" placeholder="new task..." />
                    <button>add</button>
                </form>
                <div class="removeBox" ondragover="event.preventDefault()" ondrop="app.run('stoppedTaskRemoveDrag', event)">Remove</div>
                <div class="tickBox" ondragover="event.preventDefault()" ondrop="app.run('stoppedTaskTickDrag', event)">tick</div>
            </div>
        `
    }
}