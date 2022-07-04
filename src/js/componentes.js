import { Todo } from '../classes'
import { todoList } from '../index' 



// REFERENCIAS EN EL HTML 
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrar = document.querySelector('.clear-completed')
const ulFilters = document.querySelector('.filters')



export const crearTodoHtml = ( todo ) => {
    
    const todoHtml = `
        <li class=" ${  (todo.completado) ? 'completed' : ''  } " data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${  (todo.compledato) ? 'checked' : ''  }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `

    const div = document.createElement('div')
    div.innerHTML = todoHtml

    divTodoList.append(div.firstElementChild)

    return div.firstElementChild
}

// EVENTO ADD TODO

txtInput.addEventListener('keyup', ( evento ) => {

  if( evento.keyCode === 13 && txtInput.value.length > 0 ) {
    const nuevoTodo = new Todo(txtInput.value)
    console.log(txtInput.value)

    todoList.nuevoTodo( nuevoTodo )
    crearTodoHtml( nuevoTodo )
    txtInput.value = '';
  }
})


divTodoList.addEventListener( 'click', (evento) => {

  const nombreElemento = evento.target.localName; // input, label, button
  const todoElemento = evento.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');
  
  if( nombreElemento.includes( 'input' ) ){
    todoList.marcarCompletado( todoId )
    todoElemento.classList.toggle('completed')

  } else if( nombreElemento.includes('button') ) {
    todoList.eliminarTodo( todoId );
    divTodoList.removeChild( todoElemento )
  }
})

btnBorrar.addEventListener( 'click', () => {

  todoList.eliminarCompletados();

  for( let i = divTodoList.children.length-1; i >= 0; i--){

    const elemnto = divTodoList.children[i];

    if( elemnto.classList.contains('completed')) {
      divTodoList.removeChild(elemnto)
    }

  }
});

ulFilters.addEventListener( 'click', (evento) => {

  const filtro = evento.target.text;
  if ( !filtro){return;}

  for( const elemnto of divTodoList.children ) {

    elemnto.classList.remove('hidden')
    const completado = elemnto.classList.contains('completed')


    switch( filtro ) {

      case 'Pendientes':
        if( completado ) {
          elemnto.classList.add('hidden');
        }
        break;
  
        case 'Completados':
          if( !completado ) {
            elemnto.classList.add('hidden');
          }
          break;
    }
  }
})