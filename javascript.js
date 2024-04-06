
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
            items: [firstItem, secondItem]
        },
        {
            category : 'Leisure',
            items: [firstItem, secondItem]
        }
    ],

    Home: [firstItem],
    Work: [secondItem],

    addCategoryToProjectsArray: function (newCategory) {      
        // todo, logic to check if category exists
        if (checkIfCategoryExists(newCategory)) {
            alert('Nah man, I said it already exists. Choose a new category')
        } else {
        this.projectsArray.push({category: `${newCategory}`});
        };

        console.log('add category method from projectsObject called, added category')
        // method currently empty
    },

    deleteCategoryFromProjectArray: function (oldCategory) {      
        // todo, logic to check if category exists

        delete this.projectsArray[oldCategory];
        console.log('deleted array' + this.projectsArray)
        if (checkIfCategoryExists(oldCategory)) {
            alert('Nah man, I said it already exists. Choose a new category')
        } else {
        // this.projectsArray.push({category: `${newCategory}`});
        };

        console.log('delete category method from projectsObject called, added category')
        // method currently empty
    },
    addProperty: function (propertyName) {
        this[propertyName] = [];
    },
    deleteProperty: function (propertyName) {
        console.log('delete Property method called from projectsObject: ' + propertyName)
        if (true === checkProperty(propertyName)) {
            console.log('the property is here, delete it')
            delete this[propertyName];
        }
        ///logic to check if property exists
        /// logic to check if property is empty
            // maybe a check function?
    },

 };


 // I don't think I need this function anymore.....
function checkProperty(check) {
    for (let key in projectsObject){
        console.log("key: " + key + ", check: " +check)
        if (check.toLowerCase() === key.toLowerCase()) {
            console.log('True')
            return true;
        }
        // else {
        //     console.log('false');
        //     return false}
    }

}



projectsObject.addProperty('Play');



projectsObject['Play'].push(firstItem);

console.table(projectsObject['Play'])

checkProperty('Play');


projectsObject.addProperty('Activities');
console.log('break')
console.log(projectsObject)

projectsObject.deleteProperty('Activities');
console.log(projectsObject)


// console.log(projectsObject.projectsArray)



projectsObject.addCategoryToProjectsArray('Poo Catcher');
projectsObject.addCategoryToProjectsArray('Zucchni');

projectsObject.addCategoryToProjectsArray('sport');

projectsObject.projectsArray.push({ category: 'Special Ops',  items: [firstItem, secondItem]});


for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
    console.log('each category from the array: ' + i)
    console.log(projectsObject.projectsArray[i])
    console.log('Category Name only:' +projectsObject.projectsArray[i]['category'])
}

projectsObject.deleteCategoryFromProjectArray('Sport');
console.log(projectsObject.projectsArray);

function checkIfCategoryExists(categoryName)
{
    for (let i = 0; i < (projectsObject.projectsArray.length) ; i++) {
        if (categoryName.toLowerCase() === projectsObject.projectsArray[i]['category'].toLowerCase()) {
            console.log('Nah man, already exists bro')
            return true;
        }

    }
}




// Straight array

const projects = [{'Work':['boo'] }, {'Home':[]}];
projects.push(firstItem);
projects.push(secondItem);
// console.log(projects);


});



