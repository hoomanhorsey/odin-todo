// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { Todo } from "./class.js";

const formsCreateObject = {

createNewItemForm (newItemForm)  
{
    var refNumber = 0;
    newItemForm.innerHTML = 
    `<form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
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
                        <li class="checklistItem"> 
                            <input type="text" name="title" class="input-checklist" data-ref="ref${refNumber}"> 
                            <button class="checklistDeleteBtn"> - </button></li>
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
    
    <button type="submit" class="submitItemFormBtn">Submit</button>
</form>`

return newItemForm;
}, 


//TODO - A separate function was created for edit forms, but then we chose to use
// the new form and then just populate the new form.  Edit form can probably be deleted.

// createEditForm (newItemForm, item, categoryindex, itemindex) {

//     //    TODO     Create a for loop to create the checklist html from the array. Then insert that checklist later.
//     let checklistHTML = '';

//     let array = projectsObject.getProjectsArray();

//     var checkItemsNumber = (array[categoryindex]['items'][itemindex]['checklist'].length);

//         checklistHTML += '';

//         for (let k= 0; k < checkItemsNumber; k++) {

//             // Creates HTML based on items in checklist array - if none, then there is no HTML created.
//             // Need to change 'false' to a checkbox.

//             if (array[categoryindex]['items'][itemindex]['checklist'][k]['checked']) {
//                 checklistHTML += `
//                 <li>
//                 <label for="checklist${categoryindex+itemindex+k}" class="label-checklist"></label>
//                 <input type="text" id="checklist${categoryindex+itemindex+k} name="checklist" class="input-checklistItem" value="${array[categoryindex]['items'][itemindex]['checklist'][k] ['checkItem']}">
//                 <input type="checkbox" checked></input> 
//                 <button class="checklistDeleteBtn"> - </button>
//                 </li>`
//             } else {
//                 checklistHTML += `
//                 <li>
//                 <label for="checklist${categoryindex+itemindex+k}" class="label-checklist"></label>

//                 <input type="text" id="checklist${categoryindex+itemindex+k} name="checklist" class="input-checklistItem" value="${array[categoryindex]['items'][itemindex]['checklist'][k] ['checkItem']}">
//                 <input type="checkbox" ></input> 
//                 <button class="checklistDeleteBtn"> - </button>
//                 </li>`
//             };
//         }

//     // Creates rest of form html

//     newItemForm.id = `form${categoryindex}${itemindex}`
//     newItemForm.action="https://httpbin.org/post" 
//     newItemForm.method = "post" 
//     newItemForm.classList.add('newItemForm', 'item'); 
//     newItemForm.autocomplete="off
//     // <form id="form${categoryindex}${itemindex}" 

//     newItemForm.innerHTML = `
        
//         <div class="formDiv" >
//             <label for="category" class="label-category"   >Category </label>
//             <select id=category class="select-category">
//                 <option></option>
//             </select>
//         </div>

//         <div class="formDiv">
//             <label for="title" class="label-title"></label>
//             <input type="text" id="title" name="title" class="input-title itemTitle" size="50" value="${item.title}">
//         </div>

//         <div class="formDiv">
//             <label for="description" class="label-description"></label>
//             <textarea id="description" name="description" class="input-description item-description" rows="4" cols="50">${item.description}</textarea>
//         </div>

//         <div class="formDiv">
//             <label for="dueDate" class="label-dueDate"></label>
//             <input type="date" id="dueDate" name="dueDate" class="input-dueDate item-description" value="${item.dueDate}">
//         </div>

//         <div class="formDiv checklistDiv">
//             <div id="editChecklistSubDiv">
//                 Checklist      
//                 <button class="editAddChecklistItem"> + another item</button>
//                 <ul id="newItemFormChecklist${categoryindex + itemindex}">
//                     ${checklistHTML}
//                 </ul>
//             </div>
//         </div>       
        
//         <div class="formDiv" >
//             <label for="status${categoryindex + itemindex}" class="label-status"></label>
//             <select id=status${categoryindex + itemindex} class="select-status">
//                 <option value="completed">Completed</option>   
//                 <option value="incomplete">Incomplete</option> 
//             </select>
//         </div>

//         <div class="formDiv">
//         <label for="priority${categoryindex + itemindex}" class="label-priority">Priority</label>
//         <select id=priority${categoryindex + itemindex} class="select-priority">
//             <option value="High">High</option>   
//             <option value="Medium">Medium</option>   
//             <option value="Low">Low</option> 
//         </select>
//         </div>

//         <button class="cancelEditBtn" >cancel</button>     
//         <button type="submit" class="submitItemFormBtn">Submit</button>
//     </form>`
// return newItemForm;
// },

createNewCategoryForm (newCategoryForm) {

    newCategoryForm.innerHTML = `<form class="newCategoryForm" id="newCategoryForm" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
    <div class="formDiv" >

    <label for="newCategory" class="label-newCategory">New Category</label>
    <input type="text" id="newCategory" name="newCategory" class="input-newCategory" value="Insert new Category Name">

    <button class="newCategoryCancelBtn" >cancel</button>     

    <button type="submit" class="newCategoryBtn">Submit</button>

    </div>`

return newCategoryForm;
}, 


}

export { formsCreateObject } ;
