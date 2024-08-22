import { TodoList } from "./components/todoList.js";
import { fetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";

try{
    //const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const todosInStorage = localStorage.getItem('todos')?.toString()
    let todos = []
    if (todosInStorage){
        todos = JSON.parse(todosInStorage)

        console.log(todos);
        
    }
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('.container'))
}catch(e){
    const alertElement = createElement('div',{
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    alertElement.innerText = "Impossible de charger les elements"
    document.body.prepend(alertElement)
}

