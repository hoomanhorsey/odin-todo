
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
const firstItem = new Todo("First Item", "This is the first item", "20 April 2024", "High");
const secondItem = new Todo('Second Item', 'This is the second item', '21 April 2024', 'Low')
const thirdItem = new Todo('Third Item', 'This is the third item', '1 April 2024', 'Medium',)
const fourthItem = new Todo('Fourth Item', 'This is the fourth item', '9 April 2024', 'High')
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
                alert('The category of "' + oldCategory + '" has been deleted')          
                return;
                } 
            }
    },

    addItem(category, itemName) {
        // checklist:
        // - check if item of same name already exists - TODO - or maybe it's okay if there are two items of the same name....
    
        for (let i = 0; i < (this.projectsArray.length); i++) {
            // console.log('category: '+ this.projectsArray[i]['category'] + ', argument category '+ category)

            if (this.projectsArray[i]['category'] === category) {
                 this.projectsArray[i]['items'].push(itemName); 
            }
        };
    },

    deleteItem(category, itemName){
        // checklist: 
        // - check if item exists - DONE .  If it doesn't exist, returns.
        for (let i = 0; i < (this.projectsArray.length); i++) {
            // console.log('category: '+ this.projectsArray[i]['category'] + ', category '+ category)
            // finds the matching category
            if (this.projectsArray[i]['category'] === category) {
                // console.log("It's a match") // console.log('Now address the item....by name?') // console.log('itemName.title:  ' +itemName);   // finds the title of the item that matches
                let index = this.projectsArray[i]['items'].findIndex(obj => obj['title'] === itemName);
                this.projectsArray[i]['items'].splice(index, 1);
                return;
                // console.log(this.projectsArray[i]['items']);
                }
            }
    }
};


console.log(projectsObject.projectsArray)

console.table(projectsObject.altArray)

console.log(projectsObject.altArray[0])

console.log(Object.keys(projectsObject.altArray[0]))



// function checkIfCategoryExists(categoryName){
//     for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
//         if (categoryName.toLowerCase() === projectsObject.projectsArray[i]['category'].toLowerCase()) {
//             return true;
//         }
//     }
// }

function checkIfCategoryExists(categoryName){
    return projectsObject.projectsArray.findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
}


// item Event listener

function itemEventListener() {
    console.log('eventlistener called')
    var items = document.querySelectorAll('.item');
    console.log(items)

    items.forEach((e) => {
        e.addEventListener('click', () => {
            console.log(e)
            alert( e.dataset.item)
            alert(projectsObject.projectsArray[e.dataset.categoryindex]['items'][e.dataset.itemindex]['description'])
        })
    })
    }

    setTimeout( () => {
        itemEventListener() }, 1000)





function displayList(array) {



for (let i = 0; i < array.length; i++ ) {
    const categoryElement = document.createElement('div');

    categoryElement.innerHTML = array[i]['category'];
    categoryElement.classList.add('category', `${array[i]['category']}'`); 
    // Note, categories have spaces, and if you include them as a class you can't have spaces.
    // So do you need to have a class based on the category name at all? And if so, can you abbreviate it? 
    // Or use another way of referencing it?

    const categories = document.querySelector('.categories');
    categories.appendChild(categoryElement);

    for (let j = 0; j < array[i]['items'].length; j++) {
        const itemElement = document.createElement('p');
        itemElement.dataset.categoryindex = i;
        itemElement.dataset.category = array[i]['category'];
        itemElement.dataset.itemindex = j;
        itemElement.dataset.item = array[i]['items'][j]['title'];
           

        itemElement.classList.add('item', `${array[i]['items'][j]['priority']}`, );

        itemElement.innerHTML = `<p> ${array[i]['items'][j]['title']} </p> 
        <p class="item-description" > ${array[i]['items'][j]['description']} </p>
        <p> ${ array[i]['items'][j]['dueDate']} </p>`
        
        
        categoryElement.appendChild(itemElement)

    }
}



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
