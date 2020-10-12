export default class Task {
    id = window.crypto.getRandomValues(new Uint8Array(2)).join("")
    text = ""

    constructor(text) {
        this.text = text
    }

    render() {
        return `
            <li>${this.text}<button onclick="app.run('remove', ${this.id})">remove</button></li>
        `
    }
}