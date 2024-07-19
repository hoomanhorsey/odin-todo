// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { Todo } from "./class.js";
import { eventListenerObject } from "./eventListeners.js";

const formsRetrieveObject = {

/// Isn't getNewItemFormInfo essentially an event listener? Shouldn't it live with the event listeners or at least, 'form event listeners?'
getNewItemFormInfo() {
    const newItemFormData = document.querySelector('.submitItemFormBtn')

    newItemFormData.addEventListener('click', (e) => {
        e.preventDefault();

        let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;

        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;
   
        const newItemFormChecklist = document.getElementById('itemFormChecklistUL');
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

        screenControlObject.displayAllCategoriesItems();
        
        eventListenerObject.enableNewItemCategoryButtons()
        })
    },

getEditFormInfo(categoryindex, itemindex) {

    let savedItem = projectsObject.getItem(categoryindex, itemindex);
    console.log('saved item ' + savedItem['title'])

    const submitEditFormData = document.querySelector('.submitItemFormBtn')
    
    submitEditFormData.addEventListener('click', (e) => {
        e.preventDefault();
        alert('submit pressed')
        // let title = document.querySelector('.input-title').value;
        // console.log(title)

        console.log(projectsObject.projectsArray[categoryindex]['items'][itemindex]['title']);
        console.log(projectsObject.projectsArray[categoryindex]['items'][itemindex]['description']);

        let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;

        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;

        const itemFormChecklist = document.getElementById('itemFormChecklistUL');


        const checklistTally = itemFormChecklist.children.length;
       
        // iterating through checklist to add 'id'
        for (let i = 0; i < (checklistTally); i++) {
            const children = itemFormChecklist.children;
            
             children[i].firstElementChild.id = `checklist${i}`;
            // children[i].id = `checklist${i}`;
            console.log(children[i])
        }

        const checklist = [];
        for (let j = 0 ; j < (checklistTally); j++) {
            const checklistItem = document.getElementById(`checklist${j}`).value;
            console.log(checklistItem)
 
            const tempObject = {checkItem: `${checklistItem}`, checked: false};
            checklist.push(tempObject);
        }

        const updatedItem = new Todo(title, description, checklist, dueDate, priority, status);   
        console.log(checklist)
        console.log(updatedItem)

        projectsObject.updateItem(categoryindex, itemindex, updatedItem);

        const itemElement = document.getElementById(`ref${categoryindex+itemindex}`)

        console.log(itemElement)
        screenControlObject.displayItemFull(
            itemElement, projectsObject.projectsArray);

        let formDiv =  document.querySelector('.newItemFormDiv')
        console.log(formDiv)
        formDiv.remove();

})


},

getNewCategoryFormInfo() {
    const newCategoryBtn = document.querySelector('.newCategoryBtn');
    
    newCategoryBtn.addEventListener('click',  (e) => {
        e.preventDefault();
        let newCategoryName = document.querySelector('.input-newCategory').value;
        projectsObject.addCategoryToProjectsArray(newCategoryName);
        screenControlObject.displayAllCategoriesItems(projectsObject.projectsArray);

        eventListenerObject.enableNewItemCategoryButtons()
        });
    },        
      
}

export { formsRetrieveObject } ;
