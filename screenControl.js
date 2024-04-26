import { projectsObject } from "./projectsObject.js";


const screenControlObject = {

    displayList() {

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
            }}},

    setItemElementDetails(array, i, j) {
        console.log(array)
        console.log('setItemElementDetails called')
        const itemElement = document.createElement('p');
            itemElement.dataset.categoryindex = i;
            itemElement.dataset.category = array[i]['category'];
            itemElement.dataset.itemindex = j;
            itemElement.dataset.item = array[i]['items'][j]['title'];      
            itemElement.classList.remove('full');
            itemElement.classList.add('item', 'summary', `${array[i]['items'][j]['priority']}`, );
            itemElement.id = `ref${i}${j}`;
        return itemElement;
    },

    itemDisplaySummary(itemElement, array, i, j) {
        //todo
        console.log('Summary called')
        itemElement.classList.add('summary');
        itemElement.classList.remove('full');
        itemElement.innerHTML = `<p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
        <p> ${ array[i]['items'][j]['dueDate']} </p>`
        },

    itemDisplayFull(itemElement, array, i, j) {
        console.log('Full called')
        itemElement.classList.add('full');
        itemElement.classList.remove('summary');
        itemElement.innerHTML = `<p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
        <p class="item-description" > ${array[i]['items'][j]['description']} </p>
        <p> ${ array[i]['items'][j]['dueDate']} </p>
        <button class="editItem"> edit</button>
        <button class="deleteItem">delete</button>`
        editItemEventListener();
        },
        
    } //end of screenControlObject

export { screenControlObject};