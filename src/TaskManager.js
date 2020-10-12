import Task from "./Task"

export default class TaskManager {
    tasks = []
    title = ""

    constructor(title) {
        this.title = title
    }

    addTask(text) {
        this.tasks.push(new Task(text))
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id != id)
    }

    render() {
        return `
            <div class="task-manager">
                <h1>${this.title}</h1>
                <ul>
                    ${this.tasks.map(task => task.render()).join("")}
                </ul>
                <form onsubmit="app.run('add', this); return false;">
                    <input id="new_task_text" name="text" placeholder="new task..." />
                    <button>add</button>
                </form>
            </div>
        `
    }
}