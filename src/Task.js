import "../scss/Task.scss"

export default class Task {
    id = window.crypto.getRandomValues(new Uint8Array(2)).join("")
    text = ""
    done = false

    constructor(text) {
        this.text = text
    }

    toggleDone() {
        this.done = !this.done
    }

    render() {
        return `
            <tr class="task${this.done ? ' crossout': ''}" draggable="true" ondragstart="app.run('startTaskDrag', event, ${this.id})">
                <td>${this.text}</td>
                <td>
                    <button onclick="app.run('remove', event, ${this.id})">remove</button>
                    <button onclick="app.run('tick', event, ${this.id})">done</button>
                </td>
            </tr>
        `
    }
}