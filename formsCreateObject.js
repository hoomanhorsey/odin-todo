// TODO - prob can delete these///
// import { projectsObject } from "./projectsObject.js";
// import { screenControlObject } from "./screenControl.js";
// import { Todo } from "./class.js";

const formsCreateObject = {

createNewItemForm ()  
{
    let newItemForm = document.createElement('div'); // New div for form.
    newItemForm.classList.add('newItemFormDiv');
    newItemForm.innerHTML = 
    `<form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
            <label for="category" class="label-category">Category</label>
            <select id=categorySelector class="select-category">
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
                <ul id="itemFormChecklistUL">
                    <li class="checklistItem"> 
                        <input type="text" name="title" class="input-checklist" > 
                        <button class="checklistDeleteBtn"> - </button>
                    </li>
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
        <div id ="formUtilityBtnDiv">
            <button class="newItemCancelBtn"  >cancel</button>            
            <button type="submit" class="submitItemFormBtn">Submit</button>
        </div>
    </form>`

    return newItemForm;
    }, 

createNewCategoryForm (newCategoryForm) {
    newCategoryForm.innerHTML = 
    `<form class="newCategoryForm" id="newCategoryForm" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
        <div class="formDiv">
            <label for="newCategory" class="label-newCategory">New Category</label>
            <input type="text" id="newCategory" name="newCategory" class="input-newCategory" value="New Category Name">
            <button class="newCategoryCancelBtn" >cancel</button>     
            <button type="submit" class="newCategoryBtn">Submit</button>
        </div>
    </form>`
    return newCategoryForm;
    }, 

}

export { formsCreateObject } ;
