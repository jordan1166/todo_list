// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function createTodoListItem(text, saveToLocalStorage = true) {
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add todo to local storage
  if (saveToLocalStorage) {
    saveLocalTodos(todoInput.value);
  }
  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);
  // Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
}

function addToDo(event) {
  // prevent form from submitting
  event.preventDefault();
  //Create todo list item with user input value
  createTodoListItem(todoInput.value);
  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(event) {
  // Item will either be the trash or check button
  const item = event.target;
  // Delete todo
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // Wait until animation ends to remove todo list item
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Mark tasks as completed
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function checkLocalStorage() {
  //Check if todo list is already in local storage
  //If todo is not already in local storage, return an empty array
  if (localStorage.getItem("todos") === null) {
    return [];
  } else {
    //If todo list already exists in local storage, parse the JSON object into an array and return it
    return JSON.parse(localStorage.getItem("todos"));
  }
}

//When a todo is added to the list, also save it to local storage
//Local and session storage use JSON
function saveLocalTodos(todo) {
  //Add the new todo list item to the todos array
  let todos = checkLocalStorage();
  todos.push(todo);
  //Then push todo array to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check if todo list is already in local storage
  let todos = checkLocalStorage();
  todos.forEach(function (todo) {
    //Recreate todo list items from local storage and present them on screen
    createTodoListItem(todo, false);
  });
}

function removeLocalTodos(todo) {
  // Check if todo list is already in local storage
  let todos = checkLocalStorage();
  //Get the index of the todo list item that is to be removed
  const index = todos.indexOf(todo.textContent);
  //Remove that todo item from the list
  todos.splice(index, 1);
  //Update todo list in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
