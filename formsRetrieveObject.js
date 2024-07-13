// 
import { projectsObject } from "./projectsObject.js";
import { screenControlObject } from "./screenControl.js";
import { Todo } from "./class.js";
import { formsCreateObject } from "./formsCreateObject.js";

const formsRetrieveObject = {

/// Isn't getNewItemFormInfo essentially an event listener? Shouldn't it live with the event listeners or at least, 'form event listeners?'
getNewItemFormInfo() {
    console.log('getFormInto is actually called')
    const newItemFormData = document.querySelector('.newItemBtn')
    console.log(newItemFormData);

    newItemFormData.addEventListener('click', (e) => {
        e.preventDefault();

        let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;

        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;

        // TODO 
        // Code to install checkliste item IDs?

        // getting checklist items
    
        const newItemFormChecklist = document.getElementById('newItemFormChecklist');
        const checklistTally = newItemFormChecklist.children.length;

        console.log('checklist length', newItemFormChecklist.children.length)

     
        for (let i = 0; i < (checklistTally); i++) {

            const children = newItemFormChecklist.children;
            console.log(`'children[${i}]' `, children[i])

            console.log(children[i].firstElementChild)

            children[i].firstElementChild.id = `checklist${i}`;            
            // const checklistItem = document.getElementById(`checklist${i}`).value;
            // const tempObject = {checkItem: `${checklistItem}`, checked: false};
            // checklist.push(tempObject);
        }
        
        const checklist = [];
        for (let j = 0 ; j < (checklistTally); j++) {
            const checklistItem = document.getElementById(`checklist${j}`).value;
            alert(document.getElementById(`checklist${j}`))
            alert(document.getElementById(`checklist${j}`).value)
            const tempObject = {checkItem: `${checklistItem}`, checked: false};
            checklist.push(tempObject);
        }




        const newItem = new Todo(title, description, checklist, dueDate, priority, status);
        console.log(newItem)


    projectsObject.addItem(category, newItem);

    screenControlObject.displayFullList();
    ///formsCreateObject.refreshNewItemForm();

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
            let createNewCategoryButton = document.querySelector('.createNewCategory');

            createNewCategoryButton.disabled = false;

        
        });
    }        

      
}

export { formsRetrieveObject } ;
