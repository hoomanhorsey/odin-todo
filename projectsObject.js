
import { Todo } from "./class.js";

const checklist1 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist2 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist3 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist4 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];
const checklist5 = [{checkItem: "No body knows me", checked: false}, {checkItem: "Everybody knows this is knowhere", checked: true}];


// Instantiating 'Todo Items
const firstItem = new Todo('Scratch coffe table', 'This is the first item', checklist1, '2024-12-12', 'High', 'incomplete');
const secondItem = new Todo('Eat chicken', 'This is the second item', checklist2, '2024-10-06', 'High', 'incomplet  e')
const thirdItem = new Todo('Vom up a hairball', 'This is the third item', checklist3, '2024-09-22', 'Medium', 'incomplete')
const fourthItem = new Todo("Scratch Yosh's legs",  'This is the fourth item', checklist4, '2024-05-03', 'Low', 'incomplete')
const fifthItem = new Todo('Sit on Rug', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')
const sixthItem = new Todo('Snooze in the sleeping bag hollow', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')
const seventhItem = new Todo('Stare out back window', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')
const eightItem = new Todo('Miaow outside the portal', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')
const ninthItem = new Todo('Go zoomies', 'This is the fifth item', checklist5, '2024-11-10', 'Low', 'incomplete')

const projectArray = {
    // main array for storing items
    // set up as a separate object, kept private as not returned by this module
       projectArray: [ 
        {   category : 'Home',
            items: [firstItem, secondItem, thirdItem] // initial population of array
        },
        {   category : 'Sport',
            items: [fourthItem, fifthItem, sixthItem, seventhItem] 
        }, 
        {   category : 'Leisure',
            items: [eightItem, ninthItem]
        }
    ],
}

const projectsObject = {   
    // methods
    getProjectArray(){
        return projectArray.projectArray;
    },

    addCategoryToProjectArray(newCategory) {
        if (checkIfCategoryExists(newCategory) >= 0) {
            alert(`The category "${newCategory}" already exists. Please choose a different category name.`)
        } else {
        projectArray.projectArray.push({category: `${newCategory}`, items: []});
        };
    },

    deleteCategoryFromProjectArray(oldCategory) {    
        let categoryIndex = checkIfCategoryExists(oldCategory); // returns index if exists, -1 if not

        if (categoryIndex < 0)  {
            alert(`The category "${oldCategory}" doesn't exist and so cannot be deleted.`);
            return;
        } else if (categoryIndex >= 0) {
            if (projectArray.projectArray[categoryIndex]['items'].length !=0){     
                alert(`The '${oldCategory}' category cannot be deleted as it has items attached to it. Please reassign items or delete them first before deleting this category.`)
                return;
            } else {
                projectArray.projectArray.splice(categoryIndex, 1);
                console.log('The category of "' + oldCategory + '" has been deleted');          
                return;
                } 
            }
    },

    addItem(category, itemName) {
        for (let i = 0; i < (projectArray.projectArray.length); i++) {
            if (projectArray.projectArray[i]['category'] === category) {
                 projectArray.projectArray[i]['items'].push(itemName); 
            }
        };
    },

    deleteItem(category, itemName){
        let answer = prompt("Are you sure you want to delete? Type 'YES' to confirm") 
        
        if (answer === 'YES') {
            console.log(category, itemName)

            console.log(projectArray.projectArray[category]['items'][itemName])
            projectArray.projectArray[category]['items'].splice(itemName, 1);
            projectArray.projectArray[category]['items'][itemName];
            console.log(projectArray.projectArray)
        
        } else { 
            alert("Okay. Item won't be deleted") 
            return }
    },

    getItem(categoryIndex, itemIndex) {
        return projectArray.projectArray[categoryIndex]['items'][itemIndex];
    },

    toggleChecklistCheckbox(i, j, k, status) {
        console.log('this.toggleChecklistCheckbox has been called: ' + status)
        projectArray.projectArray[i]['items'][j]['checklist'][k]['checked'] = status;
    },

    updateItem(categoryIndex, itemIndex, updatedItem) {
          projectArray.projectArray[categoryIndex]['items'][itemIndex] = updatedItem;
    },
};

function checkIfCategoryExists(categoryName){

    let test = projectsObject.getProjectArray().findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
    console.log('this returns the index of an existing category if there is one, and -1 if there isnt: ' + test)
    return test

    // let btest = projectsObject.getProjectArray()
    // let testResult =  btest.findIndex(testForDuplicate)
    // console.log(testResult)

    // const barray = projectsObject.getProjectArray();
    // const bindex = barray.findIndex(element => element['category'] === categoryName)
    // console.log(bindex)

    // const array = [1, 2, 3, 4, 5];
    // const index = array.findIndex(element => element === 3);
    // console.log(index); // Output: 2

    function testForDuplicate(category) {
        console.log(categoryName + ' ' + category)
        return categoryName === category
    }


}

export {projectsObject} ;
