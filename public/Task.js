class Task {
    id = window.crypto.getRandomValues(new Uint8Array(2)).join("")
    text = ""
    done = false

    constructor({id, text, done}) {
        if (id) this.id = id
        if (done) this.done = done

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