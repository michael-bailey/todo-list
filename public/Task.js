class Task {
    id = window.crypto.getRandomValues(new Uint8Array(4)).join("")
    text = ""
    done = false

    constructor({id, text, done}) {
        if (id) this.id = id
        if (done) this.done = done

        this.text = text
    }

    render() {
        return `
            <div>
                <tr class="task${this.done ? ' crossout': ''}" draggable="true" ondragstart="app.run('startTaskDrag', event, ${this.id})">
                    <td>${this.text}</td>
                </tr>
            </div>
        `
    }
}