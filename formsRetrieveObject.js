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
        // Note 'id' is used temporarily to capture last order of checkboxes but doesn't 
        // follow through to display of checkbox
        for (let i = 0; i < (checklistTally); i++) {
            const children = newItemFormChecklist.children;
            children[i].firstElementChild.id = `checklist${i}`;
            children[i].firstElementChild.nextElementSibling.id = `tempCheckbox${i}`;
        }
        
        // gather checklist form data and add to 'checklist' object
        let checklist = this.addFormChecklistToArray(checklistTally);

        const newItem = new Todo(title, description, checklist, dueDate, priority, status);   

        projectsObject.addItem(category, newItem);

        screenControlObject.displayAllCategoriesAndItems();
        
        eventListenerObject.enableNewItemCategoryButtons()
        })
    },

getEditFormInfo(categoryindex, itemindex) {

    const submitEditFormData = document.querySelector('.submitItemFormBtn')
    
    submitEditFormData.addEventListener('click', (e) => {
        e.preventDefault();

        // let category = document.querySelector('.select-category').value;
        let title = document.querySelector('.input-title').value;
        let description = document.querySelector('.input-description').value;
        let dueDate = document.querySelector('.input-dueDate').value;
        let status = document.querySelector('.select-status').value;
        let priority = document.querySelector('.select-priority').value;

        const itemFormChecklist = document.getElementById('itemFormChecklistUL');

        const checklistTally = itemFormChecklist.children.length;
       
        // iterating through checklist to add 'id' and temp checkbox id
        for (let i = 0; i < (checklistTally); i++) {
            const children = itemFormChecklist.children;
            
             children[i].firstElementChild.id = `checklist${i}`;
            children[i].firstElementChild.nextElementSibling.id = `tempCheckbox${i}`;
        }
        // gather checklist form data and add to 'checklist' object
        let checklist = this.addFormChecklistToArray(checklistTally);

        const updatedItem = new Todo(title, description, checklist, dueDate, priority, status);   

        // category check
        let category = document.querySelector('.select-category').value;
        let array =  projectsObject.getProjectArray()

        let formDiv =  document.querySelector('.newItemFormDiv')
        formDiv.remove();

        // if category is being changed
        if (category != array[categoryindex]['category']) {
            console.log('Changing the category. Data: the old category index = ' + categoryindex)
            
            // Variable to let know delItem function to bypass confirm prompt
            let delBtn = 0;
            projectsObject.deleteItem(categoryindex, itemindex, delBtn);
            projectsObject.addItem(category, updatedItem)

            let newCategoryIndex = array.findIndex(item => item.category === category);

            let newItemIndex = (array[newCategoryIndex]['items'].length);

            console.log('newCategoryIndex: ' + newCategoryIndex + ', newItemIndex: ' + newItemIndex);

            screenControlObject.displayAllCategoriesAndItems();

            // - run the delet item function with the current category and item index
            // insert a new item using the updated item details function   
            // const itemElement = document.getElementById(`ref${categoryindex+itemindex}`)
            const itemElement = document.createElement('div');
                itemElement.id = `ref${newCategoryIndex}${newItemIndex}`

            let categories = document.querySelector('.categories');
            categories.append(itemElement)
            screenControlObject.displayItemFull(
                 itemElement, projectsObject.getProjectArray());   
            // eventListenerObject.listenerItemCollapse();

        } else {
            console.log('no need to change category in array. item is updated')
            projectsObject.updateItem(categoryindex, itemindex, updatedItem);

            const itemElement = document.getElementById(`ref${categoryindex+itemindex}`)
            screenControlObject.displayItemFull(
                itemElement, projectsObject.getProjectArray());
        };
        
        eventListenerObject.listenerChecklistToggle(); 

        // eventListenerObject.listenerItemCollapse();
        eventListenerObject.listenerItemEdit();   
    
    })
},

        addFormChecklistToArray(checklistTally) {
            const checklist = [];
            for (let j = 0 ; j < (checklistTally); j++) {
                const checklistItem = document.getElementById(`checklist${j}`).value;
                if (document.getElementById(`tempCheckbox${j}`).checked) {
                    const tempObject = {checkItem: `${checklistItem}`, checked: true};
                    checklist.push(tempObject);
                    } else { 
                    const tempObject = {checkItem: `${checklistItem}`, checked: false };
                    checklist.push(tempObject);
                    };
                }
            return checklist;
        },

getNewCategoryFormInfo() {
    const newCategoryBtn = document.querySelector('.newCategoryBtn');
    
    newCategoryBtn.addEventListener('click',  (e) => {
        e.preventDefault();
        let newCategoryName = document.querySelector('.input-newCategory').value;
        projectsObject.addCategoryToProjectArray(newCategoryName);
        screenControlObject.displayAllCategoriesAndItems(projectsObject.getProjectArray());

        eventListenerObject.enableNewItemCategoryButtons()
        });
    },        
      
}

export { formsRetrieveObject } ;
