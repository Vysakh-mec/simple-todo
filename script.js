let todoForm = document.querySelector("form");
let todoList = document.getElementById("todo-list");
let emptybox = document.getElementById("empty-box");
let todos = [];
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}
updateTodos();
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let value = todoForm.createTodo.value.trim();
  if (value.length === 0) {
    return;
  }

  let todo = {
    id: Date.now(),
    text: value,
    completed: false,
  };

  todos.push(todo);
  createTodo(todo);
});

function updateTodos() {
  todos.forEach((todo) => {
    createTodo(todo);
  });
}

function checkEmptyBox() {
  if (todos.length === 0) {
    emptybox.style.display = "block";
  } else {
    emptybox.style.display = "none";
  }
}
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function createTodo(obj) {
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");
  let todoLi = document.createElement("li");
  todoLi.innerText = obj.text;
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  if (obj.completed) {
    todoDiv.classList.add("active");
  }
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(closeButton);
  todoList.appendChild(todoDiv);
  todoForm.reset();
  checkEmptyBox();
  updateLocalStorage();

  closeButton.addEventListener("click", function (e) {
    e.stopPropagation();
    todoList.removeChild(todoDiv);
    todos = todos.filter((todo) => todo.id !== obj.id);
    checkEmptyBox();
    updateLocalStorage();
  });

  todoDiv.addEventListener("click", function () {
    todoDiv.classList.toggle("active");
    obj.completed = !obj.completed;
    updateLocalStorage();
  });
}
