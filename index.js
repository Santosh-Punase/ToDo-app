var express = require("express");
var bodyParser = require("body-parser");
var todo_db = require("./seed");

var app = express();
app.listen(4000);
app.use("/", express.static(__dirname + "/public"));

//get
app.get("/api/todos", function (req, res) {
    res.json(todo_db.todos);
})
    .get("/api/todos/:status", function (req, res) {
        var state = req.params.status;
        var status;
        if(state == "complete")
            status = todo_db.statusEnum.COMPLETE;
        else{
            if(state == "active")
                status = todo_db.statusEnum.ACTIVE;
            else{
                if(state == "deleted")
                    status = todo_db.statusEnum.DELETE;
            }
        }

        var activeTodos = {};
        for (const key of Object.keys(todo_db.todos)) {
                if (todo_db.todos[key].status === status) {
                    activeTodos[key] = todo_db.todos[key];
                }
            }
        console.log(activeTodos);

        res.json(activeTodos);
    })

//delete
app.use("/", bodyParser.urlencoded({extended: false}));
app.delete("/api/todos/:id", function (req, res) {
    var delId = req.params.id;
    var todo = todo_db.todos[delId];


    var todo_status = req.body.todo_status;

    if (!todo) {
        res.status(400).json({errors: "This todo doesn't exist"});
    }
    else {
        todo.status = todo_status;
        res.json(todo_db.todos);
    }
})

//add
app.post("/api/todos", function (req, res) {

    var title = req.body.todo_title;

    if(!title || title == "" || title.trim() == ""){
        res.status(400).json({error: "ToDO title can't be empty"});
    }
    else{
        var new_todo_object = {
            title : title,
            status : todo_db.statusEnum.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id++] = new_todo_object;
        res.json(todo_db.todos);
    }
});

// put

app.put("/api/todos/:id",function (req,res) {

    var del_id = req.params.id;

    var todo = todo_db.todos[del_id];

    var todo_status = req.body.todo_status;

    //if this todo_doesn't exist
    //send appropriate response to consumer

    if(!todo){
        res.status(400).json({error: "This todo doesn't exist"});

    }

    else {
        todo.status = todo_status;
        res.json(todo_db.todos);
    }
})