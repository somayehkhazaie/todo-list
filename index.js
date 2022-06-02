//variabls
const todoInput = document.querySelector(".todos__input input");
const addTaskBtn = document.querySelector(".add-icon-wrapper");
const todosItems = document.querySelector(".todos-items");
const todosMessage = document.querySelector(".todosItemMessage");
const todosController = document.querySelector(".todos__controller");

//events
addTaskBtn.addEventListener("click", addTask);
todosItems.addEventListener("click", checkremove);
todosController.addEventListener("click", controller);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//functions
function addTask(e) {
  todosMessage.style.display = "none";
  createTodoBlock(todoInput.value);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

//create each todo block
function createTodoBlock(todoInput) {
  const numberOfChild = todosItems.children.length;
  const todosItemDiv = document.createElement("div");
  todosItemDiv.classList.add("todos-item", `todo-${numberOfChild}`);
  todosItemDiv.innerHTML = `<label for="input_${numberOfChild}" class="todos-item__task">
  <input type="checkbox" name="" id="input_${numberOfChild}" class="todos-item-check"/>
  <span class="todos-item-text todosItemText todo-${numberOfChild}" >${todoInput}</span>
</label>
<i class='icon-edit todo-${numberOfChild} fas fa-pen'></i>
<i class="icon-trash todo-${numberOfChild} fa fa-trash-o"></i>`;
  todosItems.appendChild(todosItemDiv);
}

function checkremove(e) {
  const classList = [...e.target.classList];
  if (classList[0] === "todos-item-check") {
    const sibling = e.target.nextElementSibling;
    sibling.classList.toggle("completed");
  } else if (classList[0] === "icon-trash") {
    removeLocalTodos(classList[1]);
    e.target.parentElement.remove();
    const numberOfChild = todosItems.children.length;
    if (numberOfChild === 1) todosMessage.style.display = "block";
  }
}

function controller(e) {
  const allTextItems = document.querySelectorAll(".todosItemText");
  if (e.target.classList.contains("all")) {
    allTextItems.forEach((item) => {
      item.parentElement.parentElement.style.display = "flex";
    });
  } else if (e.target.classList.contains("complete")) {
    allTextItems.forEach((item) => {
      if (item.classList.contains("completed"))
        item.parentElement.parentElement.style.display = "flex";
      else item.parentElement.parentElement.style.display = "none";
    });
  } else if (e.target.classList.contains("uncomplete")) {
    allTextItems.forEach((item) => {
      if (!item.classList.contains("completed"))
        item.parentElement.parentElement.style.display = "flex";
      else item.parentElement.parentElement.style.display = "none";
    });
  } else if (e.target.classList.contains("todosClearAll")) {
    allTextItems.forEach((item) => {
      item.parentElement.parentElement.remove();
    });
    emptyLocalStorage();
    todosMessage.style.display = "block";
  }
}

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  if (savedTodos.length > 0) {
    todosMessage.style.display = "none";
  } else {
    todosMessage.style.display = "block";
  }
  savedTodos.forEach((todo) => {
    createTodoBlock(todo);
  });
}

function removeLocalTodos(itemClass) {
  const todo = document.querySelector(`.${itemClass} span`);
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  const filterTodos = savedTodos.filter((item) => item !== todo.innerText);
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}

function emptyLocalStorage() {
  const empty = [];
  localStorage.setItem("todos", JSON.stringify(empty));

}
