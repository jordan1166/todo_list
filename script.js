// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Even listeners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);

// Functions
function addToDo(event) {
  // prevent form from submitting
  event.preventDefault();
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
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
  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(event) {
  // Item will either be the trash or check button
  const item = event.target;
  // Delete todo
  if (item.classList[0] === "trash-button") {
    item.parentElement.remove();
  }

  // Mark tasks as completed
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
