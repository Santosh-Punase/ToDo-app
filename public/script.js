const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const NEW_TODO_INPUT_ID = "new_todo_input";
const TODO_LIST_ID = "todo_div_id";
var completed = false;

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
                var todo_element = createToDoElement(key, todos[key],id);
                parent.appendChild(todo_element);
            }
        )
    }
}

    function createToDoElement(id, todo_object,parent_id) {
        var row = document.createElement("tr");
        var data1 = document.createElement("td");
        var data2 = document.createElement("td");
        var data3 = document.createElement("td");

        data2.innerText = todo_object.title;
        row.setAttribute("data-id",id);
        row.setAttribute("class","todoStatus"+todo_object.status);

        if(todo_object.status == "ACTIVE"){
            //add a complete button
            var complete_button  = document.createElement("button");
            complete_button.setAttribute("class","w3-button block w3-light-blue w3-opacity w3-section fa fa-check w3-left");
            complete_button.setAttribute("onclick","completeToDoAJAX("+id+")" );
            complete_button.setAttribute("title","Mark Complete");
           data1.appendChild(complete_button);
        }

        if(todo_object.status == "COMPLETE"){
            //add a complete button
            var active_button  = document.createElement("button");
            active_button.setAttribute("class","w3-button block w3-green w3-opacity w3-section fa fa-check w3-left");
            active_button.setAttribute("onclick","activeToDoAJAX("+id+")" );
            active_button.setAttribute("title","Mark Active");
            data1.appendChild(active_button);
        }

        if(todo_object.status != "DELETE"){
            //add a DELETE button
            var delete_button  = document.createElement("button");
            delete_button.setAttribute("class","w3-button block w3-red w3-section w3-opacity fa fa-remove w3-right");
            delete_button.setAttribute("onclick","deleteToDoAJAX("+id+")" );
            delete_button.setAttribute("title","Delete");
            data3.appendChild(delete_button);
        }

        if(parent_id =='todo_div_id' && todo_object.status == "ACTIVE"){
            row.appendChild(data1);
            row.appendChild(data2);
            row.appendChild(data3);
        }
        if(parent_id =='todo_complete_div_id' && todo_object.status == "COMPLETE"){
            row.appendChild(data1);
            row.appendChild(data2);
            row.appendChild(data3);
        }
        if(parent_id =='todo_delete_div_id' && todo_object.status == "DELETED"){

            row.appendChild(data2);
        }

        return row;
}

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);

    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_element('todo_div_id',xhr.responseText);
                add_todo_element('todo_complete_div_id',xhr.responseText);
                add_todo_element('todo_delete_div_id', xhr.responseText);           }
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
                add_todo_element('todo_complete_div_id',xhr.responseText);
                add_todo_element('todo_delete_div_id', xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

//delete to_DO
function deleteToDoAJAX(id) {
    //make ajax req to update todo_with above id
    //if respons is 200: refreshTodoElement

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    data = "todo_status="+encodeURI("DELETED");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_element(TODO_LIST_ID, xhr.responseText);
                add_todo_element('todo_complete_div_id', xhr.responseText);
                add_todo_element('todo_delete_div_id', xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

//active To_Do
function activeToDoAJAX(id) {

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    data = "todo_status="+encodeURI("ACTIVE");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_element(TODO_LIST_ID, xhr.responseText);
                add_todo_element('todo_complete_div_id',xhr.responseText);
                add_todo_element('todo_delete_div_id', xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}


function hideFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
        getTodosAJAX();
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }

}

function showAlert(div) {
    var id = document.getElementById(div);
    id.style.display = "block";
}