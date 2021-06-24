const inputElement = document.querySelector('.inputField input')
const buttonElement = document.querySelector('.inputField button')
const ulElement = document.querySelector('[data-js="todoList"]')
const footerElement = document.querySelector('[data-js="footer"]')

  buttonElement.addEventListener('click', () => {
    if(inputElement.value) {

      const liElement = document.createElement('li')
      liElement.innerHTML = `<li>${inputElement.value}<span><i class="fas fa-trash"></i></span></li>`
      ulElement.prepend(liElement)
      
      liElement.addEventListener('click', event => {
      const clickedElement = event.currentTarget

      clickedElement.remove()
      })
      footerElement.textContent = `você tem  tarefas pendentes`  
    }
    inputElement.value = ''
  })

  

  

  



