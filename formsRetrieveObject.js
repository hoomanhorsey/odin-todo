// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { Todo } from "./class.js";
import { eventListenerObject } from "./eventListeners.js";

const formsRetrieveObject = {

/// Isn't getNewItemFormInfo essentially an event listener? Shouldn't it live with the event listeners or at least, 'form event listeners?'
getNewItemFormInfo() {
    const newItemFormData = document.querySelector('.newItemBtn')

    newItemFormData.addEventListener('click', (e) => {
        e.preventDefault();

        let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;

        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;
   
        const newItemFormChecklist = document.getElementById('newItemFormChecklist');
        const checklistTally = newItemFormChecklist.children.length;

        // iterating through checklist to add 'id'
        for (let i = 0; i < (checklistTally); i++) {
            const children = newItemFormChecklist.children;
            children[i].firstElementChild.id = `checklist${i}`;
        }
        
        // iterating through checklist to add to array
        const checklist = [];
        for (let j = 0 ; j < (checklistTally); j++) {
            const checklistItem = document.getElementById(`checklist${j}`).value;
            const tempObject = {checkItem: `${checklistItem}`, checked: false};
            checklist.push(tempObject);
        }

        const newItem = new Todo(title, description, checklist, dueDate, priority, status);   

        projectsObject.addItem(category, newItem);

        screenControlObject.displayFullList();
        
        eventListenerObject.enableNewItemCategoryButtons()
        })
    },

getNewCategoryFormInfo() {
    const newCategoryBtn = document.querySelector('.newCategoryBtn');
    
    newCategoryBtn.addEventListener('click',  (e) => {
        e.preventDefault();
        let newCategoryName = document.querySelector('.input-newCategory').value;
        projectsObject.addCategoryToProjectsArray(newCategoryName);
        screenControlObject.displayFullList(projectsObject.projectsArray);

        eventListenerObject.enableNewItemCategoryButtons()
        });
    },        
      
}

export { formsRetrieveObject } ;
