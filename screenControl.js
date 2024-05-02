import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";
import { formsObject } from "./forms.js";


const screenControlObject = {

    displayFullList() {

    const array = projectsObject.getProjectsArray();
    const categories = document.querySelector('.categories');
    categories.innerHTML = '';
    // add 'divs' for each category
    for (let i = 0; i < array.length; i++ ) {
        const categoryElement = document.createElement('div');

        categoryElement.innerHTML = array[i]['category'];
        categoryElement.classList.add('category' ); 
        // Note, categories have spaces, and if you include them as a class you can't have spaces.
        // So do you need to have a class based on the category name at all? And if so, can you abbreviate it? 
        // Or use another way of referencing it?
        const categories = document.querySelector('.categories');
        categories.appendChild(categoryElement);
        // add 'p' elements for each item
        for (let j = 0; j < array[i]['items'].length; j++) {      
            let itemElement = categoryElement.appendChild(screenControlObject.setItemElementDetails(array, i, j));
            screenControlObject.itemDisplaySummary(itemElement, array, i, j);
            }}
        eventListenerObject.itemToggleListener();},

    setItemElementDetails(array, i, j) {
        const itemElement = document.createElement('div');
            itemElement.dataset.categoryindex = i;
            itemElement.dataset.category = array[i]['category'];
            itemElement.dataset.itemindex = j;
            itemElement.dataset.item = array[i]['items'][j]['title'];      
            itemElement.classList.remove('full');
            itemElement.classList.add('item', 'summary', `${array[i]['items'][j]['priority']}` );
            itemElement.id = `ref${i}${j}`;
        return itemElement;
    },

    itemDisplaySummary(itemElement, array, i, j) {

        console.log(array[i]['items'][j]['dueDate'])

        itemElement.classList.add('summary');
        itemElement.classList.remove('full');
        itemElement.innerHTML = `<div class="itemSummary" 
                                data-categoryindex="${i}" 
                                data-itemindex = "${j}">
                            <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
                            <p> Priority: ${ array[i]['items'][j]['priority']} </p> </div>
                            <p> Due date: ${ array[i]['items'][j]['dueDate']} </p> </div>`
        },

    itemDisplayFull(itemElement, array, i, j) {

        // items in the checklist array.
        alert(array[i]['items'][j]['checklist'].length)
        var checkItemsNumber = (array[i]['items'][j]['checklist'].length)

        for (let k= 0; k < checkItemsNumber; k++) {
           alert(array[i]['items'][j]['checklist'][k]['checkItem']);
           // TODO
           // generat a string to add into the bigger string below.....

        }

        console.log('Full called')
        itemElement.classList.add('full');
        itemElement.classList.remove('summary');

        itemElement.innerHTML = `<div class="itemFull"
                                data-categoryindex="${i}" 
                                data-itemindex = "${j}"
                                id = "subref${i}${j}"> 
        
        <p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
        <p class="item-description" > ${array[i]['items'][j]['description']} </p>
        <p> ${ array[i]['items'][j]['dueDate']} </p>

        <p> ${ array[i]['items'][j]['checklist'][0]['checkItem']} </p>

        <p> ${ array[i]['items'][j]['checklist'][0]['checked']} </p>






        <button class="editItem"> edit</button>
        <button class="deleteItem">delete</button> </div>`
        eventListenerObject.itemEditListener();
        },

    displayEditItemForm(e) {
        console.log('hello, editing item')
    
        // Getting the item from the Project array, via the dataset index
        console.log(e.id) 
        console.log(e.parentNode.id)
        console.log(e.dataset.categoryindex + e.dataset.itemindex);
    
        const categoryindex = e.dataset.categoryindex;
        const itemindex = e.dataset.itemindex;
        console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex).title);
        console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex));
        
        const item = projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex);
        console.log(item.title, item.description)
    
        //remove event listener for Item
        // var eventListener = switchItemDisplay(e);
        alert('did you get this far')
        // Display the data in a form?  

        // get the parent element, add a form as a new child, delete previous summary child element
        let element = document.getElementById(e.parentNode.id)
            console.log(element)
        
            let newItemForm = document.createElement('div');
        
            newItemForm = formsObject.createEditForm(newItemForm, item, categoryindex, itemindex);
        
            console.log(newItemForm)
        
            element.appendChild(newItemForm);

            document.getElementById(e.id).remove();
            
        
        console.log(item.priority);
        let prioritySelector = document.getElementById(`priority${categoryindex+itemindex}`)
    
        for (var i = 0; i < prioritySelector.options.length; i++) {
            if (prioritySelector.options[i].value === item.priority) {
                prioritySelector.selectedIndex = i;
                break;
            }
        }

        let statusSelector = document.getElementById(`status${categoryindex + itemindex}`)
        statusSelector.value = item.status;
        alert(item.status);


        // - get the elment by ID
        // replace javascript with a form
        // prefill the form with the data from the array
        // save the form by updating the
    
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