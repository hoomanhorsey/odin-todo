
addEventListener("DOMContentLoaded", () => {


class Todo {
    constructor(title, description, dueDate, priority, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
    }
}

const firstItem = new Todo("First Item", "This is the first item", "20 April 2024", "High", "First");
console.log(firstItem);

const projects = [{'Work':['boo'] }, {'Home':[]}];

const secondItem = new Todo('Second Item', 'This is the very second item', '21 April 2024', 'Low', 'First')

// projects.push(firstItem);

console.log(projects['Work'])

projects.push(firstItem);
projects.push(secondItem);

console.log(projects);

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
    addCategory: function () {
        console.log('added category')
    },
    addProperty: function (propertyName) {
        this[propertyName] = [];
    },
    deleteProperty: function (propertyName) {
        console.log('delete Property called' + propertyName)
        if (true === checkProperty(propertyName)) {
            console.log('the property is here, delete it')
            delete this[propertyName];
        }
        ///logic to check if property exists
        /// logic to check if property is empty
            // maybe a check function?
    },



 };

function checkProperty(check) {
    for (let key in projectsObject){
        if (check === key) {
            console.log('True')
            return true;
        }
        // else {
        //     console.log('false');
        //     return false}
    }

}


projectsObject.addCategory();
projectsObject.addProperty('Play');



projectsObject['Play'].push(firstItem);

console.table(projectsObject['Play'])

checkProperty('Play');


projectsObject.addProperty('Activities');
console.log('break')
console.log(projectsObject)

projectsObject.deleteProperty('Activities');
console.log(projectsObject)





});



