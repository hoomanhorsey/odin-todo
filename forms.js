// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { eventListenerObject } from "./eventListeners.js";
import { Todo } from "./class.js";

const formsObject = {

createNewItemForm (newItemForm)  

{
    newItemForm.innerHTML = ` <form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50"></textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority" class="label-priority">Priority</label>
    <select id=priority class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
}, 




createEditForm (newItemForm, item, categoryindex, itemindex) {

    console.log(item.description)
    console.log(item.title)
    newItemForm.innerHTML = `<form id="form${categoryindex}${itemindex}" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title" value="${item.title}">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50">${item.description}</textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate" value="${item.dueDate}">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority${categoryindex + itemindex}" class="label-priority">Priority</label>
    <select id=priority${categoryindex + itemindex} class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
},

createNewCategoryForm (newCategoryForm) {

    newCategoryForm.innerHTML = `<form id="newCategoryForm" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
    <div class="formDiv" >

    <label for="newCategory" class="label-newCategory">New Category</label>
    <input type="text" id="newCategory" name="newCategory" class="input-newCategory" value="Insert new Category Name">

    <button>cancel</button>     

    <button type="submit" class="newCategoryBtn">Submit</button>

    </div>`

    console.log('create category form has been called')

return newCategoryForm;
}, 

refreshNewItemForm() {
    let newItemFormDiv = document.querySelector('.newItemFormDiv');
    newItemFormDiv.remove()
},

getNewItemFormInfo() {
    console.log('getFormInto is actually called')
    const newItemFormData = document.querySelector('.newBookBtn')
    console.log(newItemFormData);

    newItemFormData.addEventListener('click', (e) => {
        e.preventDefault();

        let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;

        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;
        console.log(category + title + description + dueDate + priority + status);
        const newItem = new Todo(title, description, dueDate, priority);

    projectsObject.addItem(category, newItem);

    screenControlObject.displayFullList();
    formsObject.refreshNewItemForm();
    let createNewItemButton = document.querySelector('.createNewItem');

    createNewItemButton.disabled = false;

    eventListenerObject.itemEventListener();
    })
    },

getNewCategoryFormInfo() {
        const newCategoryBtn = document.querySelector('.newCategoryBtn');
        
        newCategoryBtn.addEventListener('click',  (e) => {
            console.log('called new Category')  
            e.preventDefault();
            let newCategoryName = document.querySelector('.input-newCategory').value;
            projectsObject.addCategoryToProjectsArray(newCategoryName);
            screenControlObject.displayList(projectsObject.projectsArray);
            }
        );
    }        
}
export { formsObject } ;
