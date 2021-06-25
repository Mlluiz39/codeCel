const inputElement = document.querySelector('[data-js="input"]');
const buttonElement = document.querySelector('[data-js="button"]');
const todoListElement = document.querySelector('[data-js="todoList"]');
const footerElement = document.querySelector('[data-js="footer"]');
const deleteAllTasks = document.querySelector('[data-js="deleteTasks"]');

inputElement.addEventListener('keyup', () => {
  const userData = inputElement.value;
  if (userData) {
    buttonElement.classList.add('active');
  } else {
    buttonElement.classList.remove('active');
  }
});
showTasks();

buttonElement.addEventListener('click', () => {
  let userData = inputElement.value;

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
    footerElement.textContent = `Você naõ tem tarefas pendente`;
  } else if (listArray.length === 1) {
    footerElement.textContent = `Você tem ${listArray.length} tarefa pendente`;
  } else {
    footerElement.textContent = `Você tem ${listArray.length} tarefas pendentes`;

    if (listArray.length > 0) {
      deleteAllTasks.classList.add('active');
    } else {
      deleteAllTasks.classList.remove('active');
    }
  }

  let newLiElement = '';
  listArray.forEach((element, index) => {
    newLiElement += `<li>${element}<span onclick="deleteTasks(${index})"><i class="fas fa-trash"></i></span></li>`;
  });

  todoListElement.innerHTML = newLiElement;
  inputElement.value = '';
  buttonElement.classList.remove('active');
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
