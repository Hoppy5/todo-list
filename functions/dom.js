/**
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes= {}){
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    return element
}

/**
 * 
 * @param {HTMLElement} element 
 */
// export function displayFormDiv(element){
//     element.innerHTML = `
//         <div class="contour">
//             <div class="form" id="addingForm">
//                 <h2>New task</h2>
//                 <form action="" name="FormData">
//                     <input class="input" name="title" type="text" placeholder="Title"  required>

//                     <textarea class="text-area" name="description" placeholder="Description" required></textarea>

//                     <select name="status" id="">
//                         <option value="not started">not started</option>
//                         <option value="in progress">in progress</option>
//                         <option value="done">done</option>
//                     </select>
//                     <button  id="saveButton">Enregistrer </button>
//                 </form>
//             </div>
//         </div>
    
//     `
// }