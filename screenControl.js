import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";
import { formsCreateObject } from "./formsCreateObject.js";

const screenControlObject = {

    displayAllCategoriesAndItems() {

        const array = projectsObject.getProjectArray();
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
                this.displayItemSummary(itemElement, array);
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
                <p> Due date: ${array[i]['items'][j]['dueDate']} </p> 
                `
            eventListenerObject.listenerItemExpand();
            
        },

    displayItemFull(itemElement, array) {

        console.log(itemElement.id)
        let itemElementId = itemElement.id; 
        // parsing array[index] references from the 'ref' id
        let i = itemElementId[3];
        let j = itemElementId[4];
     
        itemElement.className = '';
        itemElement.classList.add('item', 'displayFull', 'zIndexHigh', array[i]['items'][j].priority );

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

                    <button class="editItem"> edit</button>`

                // or if there is no checklist present
            } else {
                itemElement.innerHTML = `
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description" > ${array[i]['items'][j]['description']} </p>
                    <p> ${ array[i]['items'][j]['dueDate']} </p>
            
                    <button class="editItem"> edit</button>`
            }
            eventListenerObject.listenerItemEdit();

            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth'
              });
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
            
            let projectArray = projectsObject.getProjectArray();
            console.log(projectArray[1])

            // Iterating through the array and creating an option for each category.
            for (let i = 0; i < projectArray.length; i++) {
                
                const optionElement = document.createElement('option');
                optionElement.value = projectArray[i]['category'];
                optionElement.textContent = projectArray[i]['category'];
                selectCategory.appendChild(optionElement);
                }  
        eventListenerObject.listenerAddChecklistItem();
        eventListenerObject.listenerDeleteChecklistItem() 
        },

    displayNewCategoryForm() {

        let newCategory = document.querySelector('.categories')
        let newCategoryForm = document.createElement('div');
    
        newCategoryForm = formsCreateObject.createNewCategoryForm(newCategoryForm);
        newCategory.appendChild(newCategoryForm);
    eventListenerObject.listenerDeleteNewCategory();
        },
    } 

export { screenControlObject};