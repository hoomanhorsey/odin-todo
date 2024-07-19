import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";
import { formsCreateObject } from "./formsCreateObject.js";

const screenControlObject = {

    displayAllCategoriesItems() {

        const array = projectsObject.getProjectsArray();
        const categories = document.querySelector('.categories');
        
        categories.innerHTML = '';
        
        // Creating 'Category' element
        for (let i = 0; i < array.length; i++ ) {
            const categoryElement = document.createElement('div');
                categoryElement.innerHTML = array[i]['category']; // name of category
                categoryElement.classList.add('category'); // adding 'category' class 
            categories.appendChild(categoryElement); // append 'category' to 'categories'

            // Create 'item' elements for each category
            for (let j = 0; j < array[i]['items'].length; j++) {
                // create item Element
                let itemElement = "";
                    // creates item Element, and then appends it to category
                    itemElement =  categoryElement.appendChild(this.setItemElementDetails(array, i, j));
                // display item Summary
                this.displayItemSummary(itemElement, array, i, j);
                }}
            },

            setItemElementDetails(array, i, j) {
                const itemElement = document.createElement('div');
                    itemElement.classList.add('item', `${array[i]['items'][j]['priority']}` );
                    itemElement.id = `ref${i}${j}`;
                return itemElement;
            },

        displayItemSummary(itemElement, array) {
            
            itemElement.classList.add('displaySummary');
            itemElement.classList.remove('displayFull', 'zIndexHigh' ); 
            // zIndexHigh positions the display of the element in front of other items       

            let itemElementId = itemElement.id;
            let i = itemElementId[3]
            let j = itemElementId[4]

            itemElement.innerHTML = `
                <p class="item-expand"> [+] </p>
                <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                <p> Priority: ${array[i]['items'][j]['priority']} </p> 
                <p> Due date: ${array[i]['items'][j]['dueDate']} </p> `

            eventListenerObject.listenerItemExpand();
        },

    displayItemFull(itemElement, array) {
        itemElement.classList.add('displayFull', 'zIndexHigh');
        itemElement.classList.remove('displaySummary');

        let itemElementId = itemElement.id; 
        // parsing array[index] references from the 'ref' id
        let i = itemElementId[3];
        let j = itemElementId[4];

        // checklistCreation(i, j, checklistHTML)

        // Prepare checklist for 'item' html, prior to preparing item
        let checklistHTML = '';
            // check number of items in the checklist array.
            var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

            // Creates <li> items for each checklist item in the checklist array
            // if no items, then no HTML is created.  

            // different html based on whether checklist item is checked or not
            for (let k = 0; k < checkItemsNumber; k++) {
                if (array[i]['items'][j]['checklist'][k]['checked']) {
                    checklistHTML += 
                        `<li>
                            ${array[i]['items'][j]['checklist'][k] ['checkItem']}
                            <input class="checkbox" id=${'checkbox'+ i + j + k} type="checkbox" checked></input> 
                        </li>`
                } else {
                    checklistHTML += 
                        `<li>
                            ${array[i]['items'][j]['checklist'][k] ['checkItem']}
                            <input class="checkbox" id=${'checkbox' + i + j + k}  type="checkbox" ></input> 
                        </li>`
                }       
            };         
           
            // Create html for item:
                // if there is a checklist present
            if (array[i]['items'][j]['checklist'].length !== 0) {
                
                itemElement.innerHTML = `
                    <p class="item-collapse"> [-] </p>
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description"> ${array[i]['items'][j]['description']} </p>
                    <p> ${ array[i]['items'][j]['dueDate']} </p>

                    <p> <strong>Checklist</strong> 
                        <ul> ${ checklistHTML} </ul>
                    </p>

                    <button class="editItem"> edit</button>
                    <button class="deleteItem">delete button but maybe include it in edit</button> `

                // or if there is no checklist present
            } else {
                itemElement.innerHTML = `
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description" > ${array[i]['items'][j]['description']} </p>
                    <p> ${ array[i]['items'][j]['dueDate']} </p>
            
                    <button class="editItem"> edit</button>
                    <button class="deleteItem">delete button but maybe include it in edit</button> </div>`
            }
            eventListenerObject.listenerItemEdit();
            eventListenerObject.listenerItemCollapse();
        },

    displayNewItemForm() {

        // Get category to apend form too.        
        let categoriesDiv = document.querySelector('.categories')  
        // Append new form to 'categories' div, created by createNewItemForm function
        categoriesDiv.appendChild(formsCreateObject.createNewItemForm());
      
        // Populating form with 'category' select options

            // Retrieving the category selector element
            const selectCategory = document.getElementById('categorySelector');
            
            // Iterating through the array and creating an option for each category.
            for (let i = 0; i < projectsObject.projectsArray.length; i++) {
                
                const optionElement = document.createElement('option');
                optionElement.value = projectsObject.projectsArray[i]['category'];
                optionElement.textContent = projectsObject.projectsArray[i]['category'];
                selectCategory.appendChild(optionElement);
                }  
        eventListenerObject.listenerAddChecklistItem();
        eventListenerObject.listenerDeleteChecklistItem() 
        },

    populateEditItemForm(categoryindex, itemindex) {

        let array = projectsObject.getProjectsArray();

        //inserting category type
        let categorySelector = document.getElementById('categorySelector')
        categorySelector.value = array[categoryindex]['category'];

        // inserting title
        let title = document.getElementById('title');
        title.value = array[categoryindex]['items'][itemindex]['title']

        // inserting description
        let description = document.getElementById('description');
        description.value = array[categoryindex]['items'][itemindex]['description']

        // checklist length
        let itemFormChecklistElement = document.getElementById('itemFormChecklistUL')
        console.log(itemFormChecklistElement)
        itemFormChecklistElement.value = this.checklistCreation(categoryindex, itemindex, itemFormChecklistElement);

        // inserting dueDate
        let dueDate = document.getElementById('dueDate');
        dueDate.value = array[categoryindex]['items'][itemindex]['dueDate']

        // inserting status
        let status = document.getElementById('status');
        status.value = array[categoryindex]['items'][itemindex]['status']

        // inserting priority
        let priority = document.getElementById('priority');
        priority.value = array[categoryindex]['items'][itemindex]['priority']
    },

        checklistCreation(categoryindex, itemindex, checklistElement) {

            alert('checklist creation called')
            // NOTE: checklistCreation differs from checklist creation in displayItemFull()
            // as it includes a 'input' text box.
            let itemElement = checklistElement;
            let i = categoryindex;
            let j = itemindex;

            let array = projectsObject.getProjectsArray();

            //test for checklist
            let checklistHTML = '';
            // items in the checklist array.
            var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

            // Creates checklist HTML <li> items based on checklist array
            // if none, then there is no HTML created.  
            for (let k= 0; k < checkItemsNumber; k++) {
                if (array[i]['items'][j]['checklist'][k]['checked']) {
                    checklistHTML += 
                        `<li>
                            <input type="text" name="title" class="input-checklist" 
                                value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                            <input class="checkbox" type="checkbox" checked></input> 
                            <button class="checklistDeleteBtn"> - </button> 
                        </li>`
                } else {
                    checklistHTML += 
                        `<li>
                            <input type="text" name="title" class="input-checklist" 
                                value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                            <input class="checkbox"  type="checkbox" ></input> 
                            <button class="checklistDeleteBtn"> - </button>
                        </li>`
                }       
            };
            itemElement.innerHTML = checklistHTML;
        },

    displayNewCategoryForm() {

        let newCategory = document.querySelector('.categories')
        let newCategoryForm = document.createElement('div');
    
        newCategoryForm = formsCreateObject.createNewCategoryForm(newCategoryForm);
        newCategory.appendChild(newCategoryForm);
        },
    } 

export { screenControlObject};