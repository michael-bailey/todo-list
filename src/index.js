const express = require("express");


// defining local state
let local_state = {
    tasks: [
        {
            id: "12345678",
            text: "load the data from the server",
            done: true
        }
    ]
}

// creating the app
let app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
    res.redirect("/public/index.html")
})

//tasks route
app.route("/tasks")
.get(async (req, res) => {
    console.log("GET at /tasks");
    res.json(local_state.tasks)
})
.post(async (req, res) => {

    local_state.tasks.push(req.body)
    res.json(local_state.tasks)
})

app.route("/tasks/:task_id")
.get(async (req, res) => {
    res.json(local_state.tasks.filter(item => item.id == req.params.task_id)[0])
})
.patch(async (req, res) => {

    let id = req.body.id
    let text = req.body.text
    let done = req.body.done

    let task = local_state.tasks.filter(i => i.id == req.params.task_id)[0]

    if (id) task.id = done
    if (text) task.text = text
    task.done = done

    res.json(local_state.tasks)
})
.delete(async (req, res) => {
    console.log("delete: ", req.params.task_id)
    local_state.tasks = local_state.tasks.filter(item => item.id != req.params.task_id)
    console.log(local_state.tasks)
    res.json(local_state.tasks)
})

// setting the app to listen
app.listen(3000, async () => {
    console.log("server started");
})