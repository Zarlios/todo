const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const server = express();

// listen on a port
const PORT =  3000;

server.set('view engine', 'ejs');
server.set('views', './src/views');

server.use(express.static("assets"));

server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())

let todoList = [];
let id = 0;

// create a home route and send a simple message
server.get("/", (req, res) => {
    res.render('index', { todoList : todoList, page_name: "index"})
})

// create a get route to read api data
server.get('/api/todoList', (req, res) => {
    res.json(todoList);
})

// create a get route to render the register page
server.get("/create", (req, res) => {
    res.render('create', { todoList: todoList, page_name: "create"})
})

server.post("/api/create", (req, res) => {
    let todoInfo = req.body;
    id++;
    todoInfo.id = id + '';
    todoList.push(todoInfo);
    // res.json(req.body);
    res.redirect('/');
})

server.post('/api/delete', (req, res) => {
    let id = req.body.id;
    todoList.splice((id - 1), 1);
    res.redirect('/');
});

server.post('/api/edit', (req, res) => {
    let id = req.body.id;
    let editedTodo = req.body.editedTodo;
    todoList[id - 1].todo = editedTodo;
    res.redirect('/');
});

// have your server listen on your port. Console.log() to confirm that your server is running.
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
