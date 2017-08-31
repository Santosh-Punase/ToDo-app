const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const NEW_TODO_INPUT_ID = "new_todo_input";
const TODO_LIST_ID = "todo_div_id";

//if yoyb want to run a function
//1 window.onload -- prefered
//2 document.onload

window.onload = getTodosAJAX();

function add_todo_element(id,todo_data_json) {
    console.log(todo_data_json);
    var todos = JSON.parse(todo_data_json);

    var parent = document.getElementById(id);
    parent.innerHTML = "";
    if (parent) {
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createToDoElement(key, todos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}

    function createToDoElement(id, todo_object) {
        var todo_element = document.createElement("div");
        todo_element.innerText = todo_object.title;
        todo_element.setAttribute("data-id",id);
        todo_element.setAttribute("class","todoStatus"+todo_object.status);

        if(todo_object.status == "ACTIVE"){
            //add a complete button
            var complete_button  = document.createElement("button");
            complete_button.setAttribute("class","breathHorizontal");
            complete_button.setAttribute("onclick","completeToDoAJAX("+id+")" );
            complete_button.innerText = "Mark As Complete";
            todo_element.appendChild(complete_button);
        }

        if(todo_object.status != "DELETE"){
            //add a DELETE button
            var delete_button  = document.createElement("button");
            delete_button.setAttribute("class","breathHorizontal");
            delete_button.setAttribute("onclick","deleteToDoAJAX("+id+")" );
            delete_button.innerText = "Delete";
            todo_element.appendChild(delete_button);
        }


        return todo_element;
}

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);

    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){

                add_todo_element('todo_div_id',xhr.responseText);            }
        }
    }
    xhr.send(data = null);
}

//add new todo_item
    //get title text
    //make post request
    //refreah list
function addTodoAjax() {

    var title = document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    //HW: lookup encodeurl
    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_element(TODO_LIST_ID, xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }

        }
    }
    document.getElementById(NEW_TODO_INPUT_ID).value = "";
    xhr.send(data);
}

//complete _todo
function completeToDoAJAX(id) {
    //make ajax req to update todo_with above id
    //if respons is 200: refreshTodoElement

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    data = "todo_status="+encodeURI("COMPLETE");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_element(TODO_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function deleteToDoAJAX(id) {
    //make ajax req to update todo_with above id
    //if respons is 200: refreshTodoElement

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    data = "todo_status="+encodeURI("DELETE");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_element(TODO_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}