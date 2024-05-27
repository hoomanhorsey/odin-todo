import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";
import { formsObject } from "./forms.js";

const screenControlObject = {

    displayFullList() {

    const array = projectsObject.getProjectsArray();
    const categories = document.querySelector('.categories');

    
    categories.innerHTML = '';
    for (let i = 0; i < array.length; i++ ) {
        const categoryElement = document.createElement('div');

        categoryElement.innerHTML = array[i]['category'];
        categoryElement.classList.add('category' ); 

        // const categories = document.querySelector('.categories-container');
        categories.appendChild(categoryElement);
        // add 'p' elements for each item
        for (let j = 0; j < array[i]['items'].length; j++) {      
            let itemElement = categoryElement.appendChild(screenControlObject.setItemElementDetails(array, i, j));
            screenControlObject.itemDisplaySummary(itemElement, array, i, j);
            }}
        eventListenerObject.itemListenerExpand() 
    },

    setItemElementDetails(array, i, j) {
        const itemElement = document.createElement('div');
            itemElement.dataset.categoryindex = i;
            itemElement.dataset.itemindex = j;
            itemElement.classList.add('item', `${array[i]['items'][j]['priority']}` );
            itemElement.id = `ref${i}${j}`;
        return itemElement;
    },

    itemDisplaySummary(itemElement, array, i, j) {
        itemElement.innerHTML = 
            `<p class="item-expand"> [+] </p>
            <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
            <p> Priority: ${ array[i]['items'][j]['priority']} </p> 
            <p> Due date: ${ array[i]['items'][j]['dueDate']} </p> `
        eventListenerObject.itemListenerExpand();
    },

    itemDisplayFull(itemElement, array, i, j) {
        console.log('i: ' + i + ' j: ' + j)
        console.log(array[i]['items'][j]['checklist']);

        //test for checklist
        let checklistHTML = '';
            // items in the checklist array.
            var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

            for (let k= 0; k < checkItemsNumber; k++) {
            // Creates HTML based on items in checklist array - if none, then there is no HTML created.  // Need to change 'false' to a checkbox.
                if (array[i]['items'][j]['checklist'][k]['checked']) {
                    checklistHTML += `<li>${array[i]['items'][j]['checklist'][k] ['checkItem']}
                                    <input class="checkbox" id="checkbox${i + j +k}"  type="checkbox" checked></input> </li>`
                } else {
                    checklistHTML += `<li>${array[i]['items'][j]['checklist'][k] ['checkItem']}
                                    <input class="checkbox" id="checkbox${i + j +k}" type="checkbox" ></input> </li>`
                }       
            }
           
            // Create different html based on whether there is a checklist
            if (array[i]['items'][j]['checklist'].length !== 0) {
                
                itemElement.innerHTML = `
                    <p class="item-collapse"> [-] </p>
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description" > ${array[i]['items'][j]['description']} </p>
                    <p> ${ array[i]['items'][j]['dueDate']} </p>

                    <p><strong>Checklist</strong>
                    <ul> ${ checklistHTML} </ul></p>

                    <button class="editItem"> edit</button>
                    <button class="deleteItem">delete</button> `
            
            } else {
    
                itemElement.innerHTML = `
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description" > ${array[i]['items'][j]['description']} </p>
                    <p> ${ array[i]['items'][j]['dueDate']} </p>
            
                    <button class="editItem"> edit</button>
                    <button class="deleteItem">delete</button> </div>`
            }

        eventListenerObject.itemEditListener();
        eventListenerObject.itemListenerCollapse();
        },

    displayEditItemForm(e) {    
        // Getting the item from the Project array, via the dataset indexes
    
        const categoryindex = e.dataset.categoryindex;
        const itemindex = e.dataset.itemindex;
        
        const item = projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex);
    
        // get the parent element, add a form as a new child, delete previous summary child element
            let newItemForm = document.createElement('div');
            newItemForm = formsObject.createEditForm(newItemForm, item, categoryindex, itemindex);
             
            e.replaceWith(newItemForm);
        
        let prioritySelector = document.getElementById(`priority${categoryindex+itemindex}`)
    
        for (var i = 0; i < prioritySelector.options.length; i++) {
            if (prioritySelector.options[i].value === item.priority) {
                prioritySelector.selectedIndex = i;
                break;
            }
        }
        let statusSelector = document.getElementById(`status${categoryindex + itemindex}`)
        statusSelector.value = item.status;

        
        eventListenerObject.addEditChecklistItemListener();
        eventListenerObject.deleteChecklistItemListener()
    
    },

    displayNewItemForm() {

        let newItem = document.querySelector('.newItem')
        let newItemForm = document.createElement('div');
            newItemForm.classList.add('newItemFormDiv');

        newItemForm = formsObject.createNewItemForm(newItemForm);
        newItem.appendChild(newItemForm);

            const buttonInFunction = document.querySelector('.newBookBtn')
            console.log(buttonInFunction)
        
        const selectCategory = document.getElementById('category');
        
        for (let i = 0; i < projectsObject.projectsArray.length; i++) {
            
            const optionElement = document.createElement('option');
            optionElement.value = projectsObject.projectsArray[i]['category'];

            optionElement.textContent = projectsObject.projectsArray[i]['category'];
            selectCategory.appendChild(optionElement);
            }  

        eventListenerObject.addChecklistItemListener();

        },

    displayNewCategoryForm() {

        let newCategory = document.querySelector('.newCategory')
        let newCategoryForm = document.createElement('div');
    
        newCategoryForm = formsObject.createNewCategoryForm(newCategoryForm);
        newCategory.appendChild(newCategoryForm);
    },
        
    } //end of screenControlObject

export { screenControlObject};