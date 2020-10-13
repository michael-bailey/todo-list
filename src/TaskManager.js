import Task from "./Task"

import "../scss/TaskManager.scss"

export default class TaskManager {
    id = 0
    tasks = []
    title = ""

    constructor(title) {
        this.id = window.crypto.getRandomValues(new Uint8Array(4)).join("")
        this.title = title
    }

    addTask(text) {
        this.tasks.push(new Task(text))
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id != id)
    }

    findTask(id) {
        return this.tasks.filter(task => task.id == id)[0]
    }

    tickTask(id) {
        this.tasks.filter(task => task.id == id)[0].toggleDone()
    }

    render() {
        return `
            <div id="${this.id}" class="TaskManager">
                <h1>${this.title}</h1>
                <table>
                    <tr class="header-row">
                        <th>task</th>
                        <th>actions</th>
                    </tr>
                    ${this.tasks.map(task => task.render()).join("")}
                </table>
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