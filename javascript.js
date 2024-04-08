
addEventListener("DOMContentLoaded", () => {

// Object for each 'Todo' item
class Todo {
    constructor(title, description, dueDate, priority, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
    }
}

// Instantiating 'Todo Items
const firstItem = new Todo("First Item", "This is the first item", "20 April 2024", "High", "First");
const secondItem = new Todo('Second Item', 'This is the very second item', '21 April 2024', 'Low', 'First')

// projectsObject, including a 'projectsArray'

const projectsObject = {   

    projectsArray: [
        {
            category : 'Sport',
            items: [firstItem, secondItem] // initial population of array
        },
        {
            category : 'Leisure',
            items: [firstItem, secondItem]
        }
    ],

    addCategoryToProjectsArray: function (newCategory) {      
        if (checkIfCategoryExists(newCategory)) {
            alert('Nah man, I said it already exists. Choose a new category')
        } else {
        this.projectsArray.push({category: `${newCategory}`, items: []});
        };
        console.log('add category method from projectsObject called, added category')
    },

    deleteCategoryFromProjectArray: function (oldCategory) {      
        console.log('delete Category method called')
        // check if catgory exists
        let categoryIndex = checkIfCategoryExistsForDelete(oldCategory); 
        if (categoryIndex > -1) {

            if (this.projectsArray[categoryIndex]['items'])
            {
                console.log("Yo, sorry bra. Can't delete cos you have items")
                return;
            } else {
            // checkForItems(this.projectsArray[categoryIndex]);
            
            console.log(this.projectsArray[categoryIndex])

            this.projectsArray.splice(categoryIndex, 1);
            
            alert("Yeah man, category exists. Let's delete it")
            console.log(oldCategory)


            // console.log(this.projectsArray[`'${oldCategory}'`])
            
            // delete this.projectsArray[`${oldCategory}`];

          console.log('array from inside object ' + this.projectsArray[0]['category'])
                return;
        } 
        
    } else {

        // this.projectsArray.push({category: `${newCategory}`});
        console.log("Who you kidding, category doesn't exist?" )

        };
        // method currently empty
    },

    addItem: function (category, itemName){

        console.log('add item called')
        for (let i = 0; i < (this.projectsArray.length); i++) {
            console.log('category: '+ this.projectsArray[i]['category'] + ', argument category '+ category)

            if (this.projectsArray[i]['category'] === category) {
                console.log("It's a match")


                this.projectsArray[i]['items'].push(itemName); 
            }
        };
    },

    deleteItem: function(category, itemName){
        for (let i = 0; i < (this.projectsArray.length); i++) {
            console.log('category: '+ this.projectsArray[i]['category'] + ', argument category '+ category)

            if (this.projectsArray[i]['category'] === category) {
                console.log("It's a match")
                console.log('Now address the item....by name?')
                // this.projectsArray.splice(i, 1);
                console.log('itemName.title:  ' +itemName.title);              

                // function isTitle(title) {
                //     return title.title === itemName.title;
                // }
                // console.log(this.projectsArray[i]['items'].find(isTitle));

                // let foundObject = this.projectsArray[i]['items'].find(obj => obj['title'] === itemName.title);
                // console.log(this.projectsArray[i]['items']);
                // console.log(foundObject)

                let index = this.projectsArray[i]['items'].findIndex(obj => obj['title'] === itemName.title);
                console.log(index);

                this.projectsArray[i]['items'].splice(index, 1);
                console.log(this.projectsArray[i]['items']);
                }
            }
    }
};



projectsObject.addCategoryToProjectsArray('Poo Catcher');
projectsObject.addCategoryToProjectsArray('Zucchni');
projectsObject.addCategoryToProjectsArray('sport');
projectsObject.addCategoryToProjectsArray('Special Ops');

projectsObject.deleteCategoryFromProjectArray('Sport');

projectsObject.deleteCategoryFromProjectArray('Poo Catcher');
projectsObject.deleteCategoryFromProjectArray('Smeg Catcher');

console.log(projectsObject.projectsArray);



// projectsObject.addItem('Sport', firstItem);
projectsObject.addItem('Leisure', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));
projectsObject.addItem('Zucchni', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));
projectsObject.addItem('Special Ops', new Todo("Special Ops Item", "This is the special ops item", "23 April 2025", "High", "Special"));

console.log(projectsObject.projectsArray);

setTimeout( () => {
    projectsObject.deleteItem('Leisure', firstItem)}, 1000)
    console.log(projectsObject.projectsArray)

function checkIfCategoryExists(categoryName){
    for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
        if (categoryName.toLowerCase() === projectsObject.projectsArray[i]['category'].toLowerCase()) {
            // console.log('Nah man, already exists bro')
            return true;
        }
    }
}

function checkIfCategoryExistsForDelete(categoryName){
    for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
        if (categoryName.toLowerCase() === projectsObject.projectsArray[i]['category'].toLowerCase()) {
            console.log('category does exist - array index:' + i)
            return i;
        }
    }
}

function checkForItems(category){
    console.log(category)
    if (category['items']) {
        console.log('there are items here, in this category')
        
    } else {
        console.log('no items in category')
    }

};




});



// for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
//     console.log('each category from the array: ' + i)
//     console.log(projectsObject.projectsArray[i])
//     console.log('Category Name only:' +projectsObject.projectsArray[i]['category'])
// }
