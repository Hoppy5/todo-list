import { createElement} from "../functions/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} Title
 * @property {string} description
 * @property {string} status
 */
export class TodoList {

    /**@type {Todo[]} */
    #todos = []

    /**@type {HTMLtbodyElement} */
    #listElement = []

    /** 
     * @param {Todo[]} todos 
     */
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.innerHTML = `
        <div class="boutons">
            <div class="filtres">
                <button class="toutes">all</button>
                <button class="afaire">not started</button>
                <button class="progres">in progress</button>
                <button class="faites">done</button>
            </div>
            <div class="new">
                <button class="newtask">New task</button>
            </div>
        </div>
        <div class="tasks-div">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                                
                </tbody>
            </table>
        </div>        
        `
        // Loop for generating todos
       this.#listElement = document.querySelector('tbody')
        for (const todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)  
        }
              
        // dispaying adding todo form
        let popAjout = document.querySelector('.pop-ajout')
        document.querySelector('.newtask').addEventListener('click', function () {
            popAjout.style.display = 'flex'
        })

        //undiisplaying adding form
        document.querySelector('.fermer').addEventListener('click',()=>{
            popAjout.style.display = 'none'
        })
      
        // adding a new task
        document.querySelector('#addingForm').addEventListener('submit', e => this.#onSubmit(e))
        
        //chaging span's class
        let statusSpans = document.querySelectorAll('.statusTr span')
        for (const span of statusSpans) {
            if (span.innerText === 'not started') {
                span.classList.remove('span-progres')
                span.classList.add('span-not')
            }
            if(span.innerText === 'done'){
                span.classList.remove('span-progres')
                span.classList.add('span-done')
            }
        }

        //view task


    }

    /**
    * @param {SubmitEvent} e
    */
    #onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString()
        const description = new FormData(e.currentTarget).get('description').toString()
        const status = new FormData(e.currentTarget).get('status').toString()
        
        if(title === "" || description === "" || status === ""){
            return
        }
        const todo = {
            id:Date.now(),
            title,
            description,
            status
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        this.#todos.push(todo)
        this.#onUpdate()
        form.reset()

        // dispaying adding todo form
        let popAjout = document.querySelector('.pop-ajout')
        popAjout.style.display = 'none'
    }

    #onUpdate(){
        localStorage.setItem('todos', JSON.stringify(this.#todos) )
    }
}


class TodoListItem {

    #element

    /**@type {Todo} */
    constructor(todo) {

        //a tr for each task
        const tr = createElement('tr')

        //td for task name
        const td1 = createElement('td')
        td1.innerText = todo.title

        //td forr task description
        const td2 = createElement('td')
        td2.innerText = todo.description


        //td for task status
        const td3 = createElement('td',{
            class: 'statusTr'
        })
        const statut_span = createElement('span', {
            class: 'span-progres'
        })
        statut_span.innerText = todo.status
        td3.append(statut_span)


        //td for links
        const td4 = createElement('td', {
            class: 'icons'
        })
        const viewButton = createElement('button',{
            class: "viewButton"
        })
        viewButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>'

        const editButton = createElement('button',{
            class:"viewButton"
        })
        editButton.innerHTML = '<i class="fas fa-pen-square" aria-hidden="true"></i>'

        const deleteButton = createElement('button')
        deleteButton.innerHTML = '<i class="far fa-trash-alt" aria-hidden="true"></i>'

        td4.append(viewButton)
        td4.append(editButton)
        td4.append(deleteButton)

        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)

        //Adding eventListener to the delete button
        deleteButton.addEventListener('click', e => this.remove(e))
       
        this.#element = tr
    }

    /**
     * @return {HTMLElement}  
     */
    get element(){
        return this.#element
    }

    /**
     * @param {PointerEvent} e 
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }

}