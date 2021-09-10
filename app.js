const input = document.querySelector('[data-js="input"]');
let inputDate = document.querySelector('#date')
const button = document.querySelector('[data-js="button"]');
const todoList = document.querySelector('[data-js="todoList"]');
const footer = document.querySelector('[data-js="footer"]');
const deleteAllTasks = document.querySelector('[data-js="deleteTasks"]');

let today = new Date()
options = {weekday: "long", month: "short", day: "numeric"}
inputDate = today.toLocaleString()
taskDate = inputDate

input.addEventListener('keyup', () => {
  const userData = input.value.trim();
  if (userData) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
});
showTasks();

button.addEventListener('click', () => {
  let userData = input.value.trim();
 
  let getLocalStorage = localStorage.getItem('New Todo');
  if (getLocalStorage === null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  listArray.push(userData);
  localStorage.setItem('New Todo', JSON.stringify(listArray));
  showTasks();
});

function showTasks() {
  let getLocalStorage = localStorage.getItem('New Todo');
  if (getLocalStorage === null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }

  if (listArray.length <= 0) {
    footer.textContent = `Você não tem tarefas pendente`;
  } else if (listArray.length === 1) {
    footer.textContent = `Você tem ${listArray.length} tarefa pendente`;
  } else {
    footer.textContent = `Você tem ${listArray.length} tarefas pendentes`;

    if (listArray.length > 0) {
      deleteAllTasks.classList.add('active');
    } else {
      deleteAllTasks.classList.remove('active');
    }
  }

  let newLiElement = '';
  listArray.forEach((element, index) => {
    newLiElement += `<li>${element} | ${taskDate}<span onclick="deleteTasks(${index})"><i class="fas fa-trash"></i></span></li>`;
  });

  todoList.innerHTML = newLiElement;
  input.value = '';
  button.classList.remove('active');
}

function deleteTasks(index) {
  let getLocalStorage = localStorage.getItem('New Todo');
  listArray = JSON.parse(getLocalStorage);
  listArray.splice(index, 1);
  localStorage.setItem('New Todo', JSON.stringify(listArray));
  showTasks();
}

deleteAllTasks.addEventListener('click', () => {
  listArray = [];
  localStorage.setItem('New Todo', JSON.stringify(listArray));
  showTasks();
});
