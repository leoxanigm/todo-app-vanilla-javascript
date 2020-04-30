// localStorage.clear();
//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
window.addEventListener('DOMContentLoaded', getLocalTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fiitlerTodo);

//functions

function createTodo(input) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = input;
  newTodo.classList.add('todo-item');

  todoDiv.appendChild(newTodo);

  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add('complete-btn');

  todoDiv.appendChild(completedBtn);

  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add('trash-btn');

  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}

function addTodo(e) {
  e.preventDefault();

  createTodo(todoInput.value);

  //add todo to local storage
  saveLocalTodos(todoInput.value);
  todoInput.value = null;
}

function deleteCheck(e) {
  const item = e.target;

  if (
    item.classList.contains('trash-btn') ||
    item.classList.contains('fa-trash')
  ) {
    let elClass = item;
    while (elClass.classList[0] !== 'todo') {
      elClass = elClass.parentNode;
    }
    elClass.classList.add('fall');
    elClass.style.position = 'absolute';
    removeLocalTodos(elClass)
    elClass.addEventListener('transitionend', () => {
      elClass.remove();
    });
  }

  if (
    item.classList.contains('complete-btn') ||
    item.classList.contains('fa-check')
  ) {
    let elClass = item;
    while (elClass.classList[0] !== 'todo') {
      elClass = elClass.parentNode;
    }
    elClass.classList.toggle('completed');
  }
}

function fiitlerTodo(e) {
  e.preventDefault();
  if (e.target.nodeName === 'OPTION') {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
      if (todo.classList) {
        switch (e.target.value) {
          case 'completed':
            todo.classList.contains('completed')
              ? (todo.style.display = 'flex')
              : (todo.style.display = 'none');
            break;
          case 'uncompleted':
            todo.classList.contains('completed')
              ? (todo.style.display = 'none')
              : (todo.style.display = 'flex');
            break;
          default:
            todo.style.display = 'flex';
        }
      }
    });
  }
}

function checkLocalStorage(item) {
  if (localStorage.getItem(item) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(item));
  }
}

function saveLocalTodos(todo) {
  let todos = checkLocalStorage('todos');

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  let todos = checkLocalStorage('todos');

  todos.forEach(todo => {
    createTodo(todo);
  });
}

 function removeLocalTodos(todo) {
  let todos = checkLocalStorage('todos');

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
 }