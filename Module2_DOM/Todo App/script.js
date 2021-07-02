let todoInput = document.querySelector(".todo-input")
let addTodoButton = document.querySelector(".add-todo")
let todoList = document.querySelector(".todos-list")

function addTodo(){
    let todo = todoInput.value;
    if(todo){
        let listItem = document.createElement("li");
        listItem.classList.add("todo-item");

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-todo");
        deleteButton.innerHTML = `<i class="fas fa-trash-alt fa-1.5x"></i>`;

        deleteButton.addEventListener("click" , function(event){
            event.target.parentNode.remove();
        })

        listItem.append(pTag);
        listItem.append(deleteButton);
        todoList.append(listItem);
        todoInput.value = "";
    }
    else{
        alert("Enter Something !!!");
    }
}

addTodoButton.addEventListener("click", function(event){
    addTodo();
});

todoInput.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        addTodo();
    }
});

