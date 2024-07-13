
import { Todo } from "./class.js";

const checklist1 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist2 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist3 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist4 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist5 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];


// Instantiating 'Todo Items
const firstItem = new Todo('See a man about a dog', 'This is the first item', checklist1, '2024-12-12', 'High', 'incomplete');
const secondItem = new Todo('Fix a hole', 'This is the second item', checklist2, '2024-10-06', 'Low', 'incomplet  e')
const thirdItem = new Todo('Do SWAT', 'This is the third item', checklist3, '2024-09-22', 'Medium', 'incomplete')
const fourthItem = new Todo('Live Life, give it time',  'This is the fourth item', checklist4, '2024-05-03', 'High', 'incomplete')
const fifthItem = new Todo('Fifth Item', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')


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

    toggleChecklistCheckbox(i, j, k, status) {
        console.log('this.toggleChecklistCheckbox has been called: ' + status)
        this.projectsArray[i]['items'][j]['checklist'][k]['checked'] = status;
    }
    
    
};

function checkIfCategoryExists(categoryName){
    return projectsObject.projectsArray.findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
}

export {projectsObject, Todo} ;
