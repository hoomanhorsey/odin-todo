
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
const firstItem = new Todo('See a man about a dog', 'This is the first item', '2024-12-12', 'High');
const secondItem = new Todo('Fix a hole', 'This is the second item', '2024-10-06', 'Low')
const thirdItem = new Todo('Do SWAT', 'This is the third item', '2024-09-22', 'Medium',)
const fourthItem = new Todo('Live Life, give it time', 'This is the fourth item', '2024-05-03', 'High')
const fifthItem = new Todo('Fifth Item', 'This is the fifth item', '2024-11-10', 'Low')

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
    },

    getItem(categoryIndex, itemIndex) {
        return this.projectsArray[categoryIndex]['items'][itemIndex];
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
        getFormInfo();
        alert('call getFormInfo, listener to extract form data')


    }
)
  

};



function editItemEventListener(){
    let editButtons = document.querySelectorAll('.editItem');
    console.log(editButtons);
    editButtons.forEach((e) => {
        e.addEventListener('click', (pointerEvent) => {
            alert('edit an item, now add the functionality. ie. the contents of the item preformatted into a form')
            pointerEvent.stopPropagation();
            editItem(e.parentElement);
        })
    } )

    }

    setTimeout( () => {
        itemEventListener();
        createNewItemListener(); 
     }, 1000)

function displayList(array) {

    const categories = document.querySelector('.categories');
    categories.innerHTML = '';


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
    <button class="editItem"> edit</button>
    <button class="deleteItem">delete</button>`
    editItemEventListener();
};

function displayNewItemForm() {

    let newItem = document.querySelector('.newItem')

    let newItemForm = document.createElement('div');



    // this.title = title;
    // this.description = description;
    // this.dueDate = dueDate;
    // this.priority = priority;

    newItemForm = createNewForm(newItemForm);


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
    
    }




function createNewForm(newItemForm) {
    newItemForm.innerHTML = ` <form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50"></textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority" class="label-priority">Priority</label>
    <select id=priority class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
};


function createEditForm(newItemForm, item, categoryindex, itemindex) {

    alert(item.description)

    console.log(item.title)
    newItemForm.innerHTML = ` <form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title" value="${item.title}">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50">${item.description}</textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate" value="${item.dueDate}">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority${categoryindex + itemindex}" class="label-priority">Priority</label>
    <select id=priority${categoryindex + itemindex} class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
};



function getFormInfo() {
alert('getFormInto is actually called')
const newItemFormData = document.querySelector('.newBookBtn')
console.log(newItemFormData);

newItemFormData.addEventListener('click', (e) => {
    e.preventDefault();

    let category = document.querySelector('.select-category').value;
    let title = document.querySelector('.input-title').value;
    let description = document.querySelector('.input-description').value;
    let dueDate = document.querySelector('.input-dueDate').value;

    let status = document.querySelector('.select-status').value;
    let priority = document.querySelector('.select-priority').value;


    console.log(category + title + description + dueDate + priority + status);




   const newItem = new Todo(title, description, dueDate, priority);

projectsObject.addItem(category, newItem);

displayList(projectsObject.projectsArray)
itemEventListener();

})
};



function editItem(e) {
    alert('hello, editing item')

    // Getting the item from the Project array, via the dataset index
    console.log(e.id)
   
    console.log(e.dataset.categoryindex + e.dataset.itemindex);

    const categoryindex = e.dataset.categoryindex;
    const itemindex = e.dataset.itemindex;


    console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex).title);

    console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex));
    
    const item = projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex);

    console.log(item.title, item.description)

    // Display the data in a form?

    let element = document.getElementById(e.id)
    console.log(element)

    let newItemForm = document.createElement('div');

    newItemForm = createEditForm(newItemForm, item, categoryindex, itemindex);

    console.log(newItemForm)

    element.appendChild(newItemForm);

    console.log(item.priority);
    let prioritySelector = document.getElementById(`priority${categoryindex+itemindex}`)

    for (var i = 0; i < prioritySelector.options.length; i++) {
        if (prioritySelector.options[i].value === item.priority) {
            prioritySelector.selectedIndex = i;
            break;
        }
    }





    // - get the elment by ID
    // replace javascript with a form
    // prefill the form with the data from the array
    // save the form by updating the
    

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
