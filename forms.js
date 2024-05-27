// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { eventListenerObject } from "./eventListeners.js";
import { Todo } from "./class.js";

const formsObject = {

createNewItemForm (newItemForm)  
{
    var refNumber = 0;
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
        <label for="description" class="label-description">Description</label>
        <textarea id="description" name="description" class="input-description" rows="4" cols="50"></textarea>
    </div>

    <div class="formDiv checklistDiv">  
        <label for="checklist" class="label-checklist">Checklist</label> 
        <button id="addCheckListItem"> + another item</button>
        <div id="checklistSubDiv">
            <ul id="newItemFormChecklist">
                    <li> <input type="text" id="checklist${refNumber}" name="title" class="input-checklist" data-ref="ref${refNumber}"> </li>
            </ul>
            </div>
        </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="incomplete">Incomplete</option> 
            <option value="completed">Completed</option>   

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

    <button class="newItemCancelBtn"  >cancel</button>     
    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
}, 


createEditForm (newItemForm, item, categoryindex, itemindex) {

    //    TODO     Create a for loop to create the checklist html from the array. Then insert that checklist later.
    let checklistHTML = '';

    let array = projectsObject.getProjectsArray();

    var checkItemsNumber = (array[categoryindex]['items'][itemindex]['checklist'].length);

        checklistHTML += `Checklist
        <button id="editAddChecklistItem"> + another item</button>
        `
        ;
        for (let k= 0; k < checkItemsNumber; k++) {

            // Creates HTML based on items in checklist array - if none, then there is no HTML created.
            // Need to change 'false' to a checkbox.

            if (array[categoryindex]['items'][itemindex]['checklist'][k]['checked']) {
                checklistHTML += `
                <li>
                <label for="checklist${categoryindex+itemindex+k}" class="label-checklist"></label>
                <input type="text" id="checklist${categoryindex+itemindex+k} name="checklist" class="input-checklistItem" value="${array[categoryindex]['items'][itemindex]['checklist'][k] ['checkItem']}">
                <input type="checkbox" checked></input> 
                </li>`
            } else {
                checklistHTML += `
                <li>
                <label for="checklist${categoryindex+itemindex+k}" class="label-checklist"></label>

                <input type="text" id="checklist${categoryindex+itemindex+k} name="checklist" class="input-checklistItem" value="${array[categoryindex]['items'][itemindex]['checklist'][k] ['checkItem']}">
                <input type="checkbox" ></input> 
                </li>`
            };
        }

    // Creates rest of form html

    newItemForm.innerHTML = `<form id="form${categoryindex}${itemindex}" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
            <label for="category" class="label-category"   >Category </label>
            <select id=category class="select-category">
                <option></option>
            </select>
        </div>

        <div class="formDiv">
            <label for="title" class="label-title"></label>
            <input type="text" id="title" name="title" class="input-title itemTitle" value="${item.title}">
        </div>

        <div class="formDiv">
            <label for="description" class="label-description"></label>
            <textarea id="description" name="description" class="input-description item-description" rows="4" cols="20">${item.description}</textarea>
        </div>

        <div class="formDiv">
            <label for="dueDate" class="label-dueDate"></label>
            <input type="date" id="dueDate" name="dueDate" class="input-dueDate item-description" value="${item.dueDate}">
        </div>
        
        <div>
            ${checklistHTML}
        </div>
        
        <div class="formDiv" >
            <label for="status${categoryindex + itemindex}" class="label-status"></label>
            <select id=status${categoryindex + itemindex} class="select-status">
                <option value="completed">Completed</option>   
                <option value="incomplete">Incomplete</option> 
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

    newCategoryForm.innerHTML = `<form class="newCategoryForm" id="newCategoryForm" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
    <div class="formDiv" >

    <label for="newCategory" class="label-newCategory">New Category</label>
    <input type="text" id="newCategory" name="newCategory" class="input-newCategory" value="Insert new Category Name">

    <button class="newCategoryCancelBtn" >cancel</button>     

    <button type="submit" class="newCategoryBtn">Submit</button>

    </div>`

    console.log('create category form has been called')

return newCategoryForm;
}, 

refreshNewItemForm() {
    let newItemFormDiv = document.querySelector('.newItemFormDiv');
    newItemFormDiv.remove()
},

refreshNewCategoryForm() {
    let newCategoryFormDiv = document.querySelector('.newCategoryForm');
    newCategoryFormDiv.remove();
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

        // getting checklist items
    
        const newItemFormChecklist = document.getElementById('newItemFormChecklist');
        const checklistTally = newItemFormChecklist.children.length;

        const checklist = [];
        for (let i = 0; i < (checklistTally); i++) {
            const checklistItem = document.getElementById(`checklist${i}`).value;
            const tempObject = {checkItem: `${checklistItem}`, checked: false};
            checklist.push(tempObject);
        }
        alert(checklist)

        const newItem = new Todo(title, description, checklist, dueDate, priority, status);
        console.log(newItem)


    projectsObject.addItem(category, newItem);

    screenControlObject.displayFullList();
    formsObject.refreshNewItemForm();
    let createNewItemButton = document.querySelector('.createNewItem');

    createNewItemButton.disabled = false;

    })
    },

getNewCategoryFormInfo() {
        const newCategoryBtn = document.querySelector('.newCategoryBtn');
        
        newCategoryBtn.addEventListener('click',  (e) => {
            console.log('called new Category')  
            e.preventDefault();
            let newCategoryName = document.querySelector('.input-newCategory').value;
            projectsObject.addCategoryToProjectsArray(newCategoryName);
            screenControlObject.displayFullList(projectsObject.projectsArray);
            }
        );
    }        
}

export { formsObject } ;
