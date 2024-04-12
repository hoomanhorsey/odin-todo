
addEventListener("DOMContentLoaded", () => {

// Object for each 'Todo' item
class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

// Instantiating 'Todo Items
const firstItem = new Todo("See a man about a dog", "This is the first item", "20 April 2024", "High");
const secondItem = new Todo('Fix a hole', 'This is the second item', '21 April 2024', 'Low')
const thirdItem = new Todo('Do SWAT', 'This is the third item', '1 April 2024', 'Medium',)
const fourthItem = new Todo('Live Life, give it time', 'This is the fourth item', '9 April 2024', 'High')
const fifthItem = new Todo('Fifth Item', 'This is the fifth item', '10 April 2024', 'Low')

// projectsObject, including a 'projectsArray'
const projectsObject = {   

    // main array for storing items
    projectsArray: [ 
        {   category : 'Home',
            items: [thirdItem, fourthItem, fifthItem] // initial population of array
        },
        {   category : 'Sport',
            items: [firstItem, secondItem]
        }, 
        {   category : 'Leisure',
            items: [firstItem, secondItem]
        }
    ],

    // alternative structure for array. I don't it's necessary, or better in this instance
    altArray: [
        {   Home : [thirdItem, fourthItem, fifthItem] // initial population of array
        },
        {   Sport : [firstItem, secondItem]
        }, 

    ],
   
    // methods
    addCategoryToProjectsArray(newCategory) {
        // checklist: 
        // - checks if category already exists - DONE
        // - converts category to upper case, or lowercase - TODO 
        if (checkIfCategoryExists(newCategory) > 0) {
            alert(`The category "${newCategory}" already exists. Please choose a new category`)
        } else {
        this.projectsArray.push({category: `${newCategory}`, items: []});
        };
    },

    deleteCategoryFromProjectArray(oldCategory) {    
        // checklist: 
        // - check if category exists - DONE .  If it doesn't exist, returns.
        // - if category exists, checks if category has items - DONE. If category has items, returns
        let categoryIndex = checkIfCategoryExists(oldCategory); // returns index if exists, -1 if not

        if (categoryIndex < 0)  {
            alert(`The category "${oldCategory}" doesn't exist and so cannot be deleted`);
            return;
        } else if (categoryIndex >= 0) {
            if (this.projectsArray[categoryIndex]['items'].length !=0){     
                alert(`The '${oldCategory}' category cannot be deleted as it has items attached to it. Please reassign or delete them first before deleting this category.`)
                return;
            } else {
                this.projectsArray.splice(categoryIndex, 1);
                alert('The category of "' + oldCategory + '" has been deleted');          
                return;
                } 
            }
    },

    addItem(category, itemName) {
        // checklist:
        // - check if item of same name already exists - TODO - or maybe it's okay if there are two items of the same name....  
        for (let i = 0; i < (this.projectsArray.length); i++) {
            if (this.projectsArray[i]['category'] === category) {
                 this.projectsArray[i]['items'].push(itemName); 
            }
        };
    },

    deleteItem(category, itemName){
        // checklist: 
        // - check if item exists - DONE .  If it doesn't exist, returns.
        for (let i = 0; i < (this.projectsArray.length); i++) {
            // finds the matching category
            if (this.projectsArray[i]['category'] === category) {
                let index = this.projectsArray[i]['items'].findIndex(obj => obj['title'] === itemName);
                this.projectsArray[i]['items'].splice(index, 1);
                return;
                }
            }
    }
};




function checkIfCategoryExists(categoryName){
    return projectsObject.projectsArray.findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
}

// item Event listener

function itemEventListener() {
    var items = document.querySelectorAll('.item');
    console.log(items)

    items.forEach((e) => {
        e.addEventListener('click', () => {

            console.log(e)
            const itemElement = document.getElementById(`ref${e.dataset.categoryindex}${e.dataset.itemindex}`)
            
            if (itemElement.classList.contains('full')) {
                console.log(itemElement.classList)
            
                itemDisplaySummary(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex)
            } else {
                itemDisplayFull(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex);
            }
        })
    })
    }

function createNewItemListener() {
    let createNewItemButton = document.querySelector('.createNewItem');
    createNewItemButton.addEventListener('click', () => {
        createNewItemButton.disabled = true;

        displayNewItemForm();
        alert('create new item')

    }
)
  

};



function editItemEventListener(){
    let editButtons = document.querySelectorAll('.editItem');
    console.log(editButtons);
    editButtons.forEach((e) => {
        e.addEventListener('click', () => {
            alert('edit an item, now add the functionality. ie. the contents of the item preformatted into a form')
            event.stopPropagation();
        })
    } )

    }

    setTimeout( () => {
        itemEventListener();
        createNewItemListener(); 
     }, 1000)

function displayList(array) {

    // add 'divs' for each category
    for (let i = 0; i < array.length; i++ ) {
        const categoryElement = document.createElement('div');

        categoryElement.innerHTML = array[i]['category'];
        categoryElement.classList.add('category', `${array[i]['category']}'`); 
        // Note, categories have spaces, and if you include them as a class you can't have spaces.
        // So do you need to have a class based on the category name at all? And if so, can you abbreviate it? 
        // Or use another way of referencing it?

        const categories = document.querySelector('.categories');
        categories.appendChild(categoryElement);

        // add 'p' elements for each item
        for (let j = 0; j < array[i]['items'].length; j++) {      
            let itemElement = categoryElement.appendChild(setItemElementDetails(array, i, j));
            itemDisplaySummary(itemElement, array, i, j);
            }
    }

}
function setItemElementDetails(array, i, j) {
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
    // categoryElement.appendChild(itemElement)   
};

function itemDisplaySummary(itemElement, array, i, j) {
    //todo
    console.log('Summary called')
    itemElement.classList.add('summary');
    itemElement.classList.remove('full');
    itemElement.innerHTML = `<p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
    <p> ${ array[i]['items'][j]['dueDate']} </p>`
};

function itemDisplayFull(itemElement, array, i, j) {
    console.log('Full called')
    itemElement.classList.add('full');
    itemElement.classList.remove('summary');
    itemElement.innerHTML = `<p class="itemTitle" > ${array[i]['items'][j]['title']} </p> 
    <p class="item-description" > ${array[i]['items'][j]['description']} </p>
    <p> ${ array[i]['items'][j]['dueDate']} </p>
    <button class="editItem"> edit</button>`
    editItemEventListener();
};

function displayNewItemForm() {

    let newItem = document.querySelector('.newItem')

    let newItemForm = document.createElement('div');


    newItemForm.innerHTML = ` <form action="https://httpbin.org/post" method="post" class="newbook" autocomplete="off">
    

    <div>
        <label for="author" class="label-author">Author</label>
        <input type="text" id="author" name="author" class="author">
    </div>
    <div>
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="title">
    </div>

    <div>
        <label for="pages" class="label-pages">Number of pages</label>
        <input type="number" id="pages" name="pages" class="pages">
    </div>
    
    <div>
        <label for="read" class="label-read">Read status</label>
        <select id=read class="read">
            <option value="read">read</option>   
            <option value="unread">unread</option> 
        </select>
    </div>

    <button>cancel</button>
    hmm, cancel doesn't work. maybe fix
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

    newItem.appendChild(newItemForm);

}

// Sample array manipulations
projectsObject.addCategoryToProjectsArray('Poo Catcher');
projectsObject.addCategoryToProjectsArray('Zucchni');
projectsObject.addCategoryToProjectsArray('sport');
projectsObject.addCategoryToProjectsArray('SpecialOps');
console.table(projectsObject.projectsArray);

projectsObject.deleteCategoryFromProjectArray('Sport');
projectsObject.deleteCategoryFromProjectArray('Poo Catcher');
projectsObject.deleteCategoryFromProjectArray('Smeg Catcher');
projectsObject.deleteCategoryFromProjectArray("Doesn't exist and so can't be deleted");

projectsObject.addItem('Zucchni', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));
projectsObject.addItem('SpecialOps', new Todo("Special Ops Item", "This is the special ops item", "23 April 2025", "High", "Special"));
projectsObject.addItem('Leisure', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));

displayList(projectsObject.projectsArray)

});




// Sample array manipulations

// projectsObject.addCategoryToProjectsArray('Poo Catcher');
// projectsObject.addCategoryToProjectsArray('Zucchni');
// projectsObject.addCategoryToProjectsArray('sport');
// projectsObject.addCategoryToProjectsArray('Special Ops');
// console.table(projectsObject.projectsArray);

// projectsObject.deleteCategoryFromProjectArray('Sport');
// projectsObject.deleteCategoryFromProjectArray('Poo Catcher');
// projectsObject.deleteCategoryFromProjectArray('Smeg Catcher');
// projectsObject.deleteCategoryFromProjectArray("Doesn't exist and so can't be deleted");

// projectsObject.addItem('Zucchni', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));
// projectsObject.addItem('Special Ops', new Todo("Special Ops Item", "This is the special ops item", "23 April 2025", "High", "Special"));
// projectsObject.addItem('Leisure', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));


// setTimeout( () => {
//     projectsObject.deleteItem('Leisure','Second Item')}, 5000)
// setTimeout( () => {
//     console.table(projectsObject.projectsArray) }, 7000)

// function checkForItems(category){
//     console.log(category)
//     if (category['items']) {
//         console.log('there are items here, in this category')     
//     } else {
//     console.log('no items in category')
//         }
//     };


// for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
//     console.log('each category from the array: ' + i)
//     console.log(projectsObject.projectsArray[i])
//     console.log('Category Name only:' +projectsObject.projectsArray[i]['category'])
// }
