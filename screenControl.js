import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";
import { formsCreateObject } from "./formsCreateObject.js";

const screenControlObject = {

    displayFullList() {

        const array = projectsObject.getProjectsArray();
        const categories = document.querySelector('.categories');
        
        categories.innerHTML = '';
        
        // Creating 'Category' element
        for (let i = 0; i < array.length; i++ ) {
            const categoryElement = document.createElement('div');
            categoryElement.innerHTML = array[i]['category'];
            categoryElement.classList.add('category'); 
            categories.appendChild(categoryElement);

            // Create 'item' elements of each item in category
            for (let j = 0; j < array[i]['items'].length; j++) {
                // set details of item element....      
                let itemElement = categoryElement.appendChild(this.setItemElementDetails(array, i, j));
                this.itemDisplaySummary(itemElement, array, i, j);
                }}
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
        itemElement.classList.add('displaySummary');
        itemElement.classList.remove('displayFull', 'zIndexHigh' ); // zIndexHigh positions the display of the element in front of other items       

        itemElement.innerHTML = `
            <p class="item-expand"> [+] </p>
            <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
            <p> Priority: ${array[i]['items'][j]['priority']} </p> 
            <p> Due date: ${array[i]['items'][j]['dueDate']} </p> `

        eventListenerObject.itemListenerExpand();
    },

    itemDisplayFull(itemElement, array, i, j) {
        itemElement.classList.add('displayFull', 'zIndexHigh');
        itemElement.classList.remove('displaySummary');

        let checklistHTML = '';
            // check number of items in the checklist array.
            var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

            // Creates checklist HTML <li> items based on checklist array
            // if none, then there is no HTML created.  
            // TODO - determine if you need checkbox id
            for (let k = 0; k < checkItemsNumber; k++) {
                if (array[i]['items'][j]['checklist'][k]['checked']) {
                    checklistHTML += 
                        `<li>
                            ${array[i]['items'][j]['checklist'][k] ['checkItem']}
                            <input class="checkbox" id="checkbox${i + j + k}"  
                            type="checkbox" checked></input> 
                        </li>`
                } else {
                    checklistHTML += 
                        `<li>
                            ${array[i]['items'][j]['checklist'][k] ['checkItem']}
                            <input class="checkbox" id="checkbox${i + j + k}" 
                            type="checkbox" ></input> 
                        </li>`
                }       
            };
           
            // Create html based on whether there is a checklist.
            if (array[i]['items'][j]['checklist'].length !== 0) {
                
                itemElement.innerHTML = `
                    <p class="item-collapse"> [-] </p>
                    <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                    <p class="item-description"> ${array[i]['items'][j]['description']} </p>
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
        

            alert('item has displayed in full, item edit listener has been called')

            eventListenerObject.itemEditListener();
            eventListenerObject.itemListenerCollapse();


        },

    // displayEditItemForm(e) {    
    //     // Getting the item from the Project array, via the dataset indexes
    
    //     const categoryindex = e.dataset.categoryindex;
    //     const itemindex = e.dataset.itemindex;
        
    //     const item = projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex);
    
    //     // get the parent element, add a form as a new child, delete previous summary child element
    //         let newItemForm = document.createElement('form');
    //         newItemForm = formsCreateObject.createEditForm(newItemForm, item, categoryindex, itemindex);
             
    //         e.replaceWith(newItemForm);
        
    //     let prioritySelector = document.getElementById(`priority${categoryindex+itemindex}`)
    
    //     for (var i = 0; i < prioritySelector.options.length; i++) {
    //         if (prioritySelector.options[i].value === item.priority) {
    //             prioritySelector.selectedIndex = i;
    //             break;
    //         }
    //     }
    //     let statusSelector = document.getElementById(`status${categoryindex + itemindex}`)
    //     statusSelector.value = item.status;
        
    //     eventListenerObject.addEditChecklistItemListener();
    //     eventListenerObject.deleteChecklistItemListener()
    
    // },

    displayNewItemForm() {

        let newItem = document.querySelector('.categories')
        let newItemForm = document.createElement('div');
            newItemForm.classList.add('newItemFormDiv');

        newItemForm = formsCreateObject.createNewItemForm(newItemForm);
        newItem.appendChild(newItemForm);
      
        const selectCategory = document.getElementById('category');
        
        for (let i = 0; i < projectsObject.projectsArray.length; i++) {
            
            const optionElement = document.createElement('option');
            optionElement.value = projectsObject.projectsArray[i]['category'];

            optionElement.textContent = projectsObject.projectsArray[i]['category'];
            selectCategory.appendChild(optionElement);
            }  

        eventListenerObject.addChecklistItemListener();
        eventListenerObject.deleteChecklistItemListener() 
        },

    populateEditItemFormWithData(categoryindex, itemindex) {

        console.log('called populateFormWithData()')
        let array = projectsObject.getProjectsArray();

        console.log(array[categoryindex]['category']);

        //inserting category type
        let category = document.getElementById('category')
        console.log(category)
        category.value = array[categoryindex]['category'];

        // inserting title
        let title = document.getElementById('title');
        title.value = array[categoryindex]['items'][itemindex]['title']

        // inserting description
        let description = document.getElementById('description');
        description.value = array[categoryindex]['items'][itemindex]['description']


        // checklist length
        var checkItemsNumber = (array[categoryindex]['items'][itemindex]['checklist'].length);
        console.log(checkItemsNumber)


            let checklistElement = document.getElementById('newItemFormChecklist')
            newItemFormChecklist.value = this.checklistCreation(categoryindex, itemindex, checklistElement);

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

        let itemElement = checklistElement;
        let i = categoryindex;
        let j = itemindex;

        let array = projectsObject.getProjectsArray();

        //test for checklist
        let checklistHTML = '';
        // items in the checklist array.
        var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

        // Creates checklist HTML <li> items based on checklist array
        // if none, then there is no HTML created.  // Need to change 'false' to a checkbox.
        for (let k= 0; k < checkItemsNumber; k++) {
            if (array[i]['items'][j]['checklist'][k]['checked']) {
                checklistHTML += 
                    `<li>
                        <input type="text" name="title" class="input-checklist" 
                            value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                        <input class="checkbox" id="checkbox${i + j + k}" type="checkbox" checked></input> 
                        <button class="checklistDeleteBtn"> - </button> 
                    </li>`
            } else {
                checklistHTML += 
                    `<li>
                        <input type="text" name="title" class="input-checklist" 
                            value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                        <input class="checkbox" id="checkbox${i + j + k}" type="checkbox" ></input> 
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
//end of screenControlObject

export { screenControlObject};