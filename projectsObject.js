
// projectsObject, including a 'projectsArray'
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


const projectsObject = {   

    // main array for storing items
    projectsArray: [ 
        {   category : 'Home',
            items: [thirdItem, fourthItem, fifthItem] // initial population of array
        },
        {   category : 'Sport',
            items: [firstItem, secondItem, fourthItem] 
        }, 
        {   category : 'Leisure',
            items: [firstItem, secondItem]
        }
    ],
   
    // methods

    getProjectsArray(){
        return this.projectsArray;
    },


    addCategoryToProjectsArray(newCategory) {
        // checklist:         // - checks if category already exists - DONE        // - converts category to upper case, or lowercase - TODO 
        if (checkIfCategoryExists(newCategory) > 0) {
            console.log(`The category "${newCategory}" already exists. Please choose a new category`)
        } else {
        this.projectsArray.push({category: `${newCategory}`, items: []});
        };
    },

    deleteCategoryFromProjectArray(oldCategory) {    
        // checklist:         // - check if category exists - DONE .  If it doesn't exist, returns.         // - if category exists, checks if category has items - DONE. If category has items, returns
        let categoryIndex = checkIfCategoryExists(oldCategory); // returns index if exists, -1 if not

        if (categoryIndex < 0)  {
            console.log(`The category "${oldCategory}" doesn't exist and so cannot be deleted`);
            return;
        } else if (categoryIndex >= 0) {
            if (this.projectsArray[categoryIndex]['items'].length !=0){     
                console.log(`The '${oldCategory}' category cannot be deleted as it has items attached to it. Please reassign or delete them first before deleting this category.`)
                return;
            } else {
                this.projectsArray.splice(categoryIndex, 1);
                console.log('The category of "' + oldCategory + '" has been deleted');          
                return;
                } 
            }
    },

    addItem(category, itemName) {
        // checklist:         // - check if item of same name already exists - TODO - or maybe it's okay if there are two items of the same name....  
        for (let i = 0; i < (this.projectsArray.length); i++) {
            if (this.projectsArray[i]['category'] === category) {
                 this.projectsArray[i]['items'].push(itemName); 
            }
        };
    },

    deleteItem(category, itemName){
        // checklist:      // - check if item exists - DONE .  If it doesn't exist, returns.
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
    },
    
    
};

function checkIfCategoryExists(categoryName){
    return projectsObject.projectsArray.findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
}


// // Sample array manipulations
// projectsObject.addCategoryToProjectsArray('Poo Catcher');
// projectsObject.addCategoryToProjectsArray('Zucchni');
// projectsObject.addCategoryToProjectsArray('sport');
// projectsObject.addCategoryToProjectsArray('SpecialOps');
// console.table(projectsObject.projectsArray);

// projectsObject.deleteCategoryFromProjectArray('Sport');
// projectsObject.deleteCategoryFromProjectArray('Poo Catcher');
// projectsObject.deleteCategoryFromProjectArray('Smeg Catcher');
// projectsObject.deleteCategoryFromProjectArray("Doesn't exist and so can't be deleted");

// projectsObject.addItem('Zucchni', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));
// projectsObject.addItem('SpecialOps', new Todo("Special Ops Item", "This is the special ops item", "23 April 2025", "High", "Special"));
// projectsObject.addItem('Leisure', new Todo("Third Item", "This is the third item", "20 April 2025", "Low", "Third"));


export {projectsObject} ;
