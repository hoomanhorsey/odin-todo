
import { Todo } from "./class.js";

const checklist1 = [{checkItem: "Scratch with right paw", checked: false}, {checkItem: "Scratch with left paw", checked: false}];
const checklist2 = [{checkItem: "Get the chicken with paw", checked: false}, {checkItem: "Get chicken onto ground", checked: false}, {checkItem: "Nom nom nom the chicken", checked: false}];
const checklist3 = [{checkItem: "Find place to vom, preferably someobody's bed", checked: false}, {checkItem: "Get the riddim going", checked: false}, {checkItem: "Do the hurl", checked: false}];
const checklist4 = [{checkItem: "Find a hide place", checked: false}, {checkItem: "Wait for a leg", checked: false}, {checkItem: "Pounce on leg!", checked: false}];
const checklist5 = [{checkItem: "Get on rug", checked: false}, {checkItem: "Lower body onto rug", checked: false}, {checkItem: "Roll to side", checked: false}, {checkItem: "Close eyes", checked: false}];
const checklist6 = [{checkItem: "Jump onto Andrew's bed", checked: false}, {checkItem: "Find hollow in sleep bag", checked: false}, {checkItem: "Lie down in hollow", checked: false}, {checkItem: "Snooze", checked: false}];
const checklist7 = [{checkItem: "Go sit near back door", checked: false}, {checkItem: "Stare out back door", checked: false}];
const checklist8 = [{checkItem: "Go to portal", checked: false}, {checkItem: "Do miaow", checked: false}, {checkItem: "Do another miaow", checked: false}, {checkItem: "Then another miawo", checked: false}];
const checklist9 = [{checkItem: "Stand still", checked: false}, {checkItem: "Run very fast one direction", checked: false}, {checkItem: "Turn around", checked: false}, {checkItem: "Run very fast in other direction", checked: false}];
const checklistProForma = [{checkItem: "#", checked: false}, {checkItem: "#", checked: false}, {checkItem: "#", checked: false}, {checkItem: "#", checked: false}];


// Instantiating 'Todo Items
const firstItem = new Todo('Scratch coffe table', 'Scratch the coffee table. But only on the leg. And only one leg.', checklist1, '2024-12-12', 'Low', 'incomplete');
const secondItem = new Todo('Eat chicken', 'Eat the delicious chicken', checklist2, '2024-10-06', 'High', 'incomplete')
const thirdItem = new Todo('Vom up a hairball', 'On no I feel like me going to be sick!', checklist3, '2024-09-22', 'Medium', 'incomplete')
const fourthItem = new Todo("Scratch Yosh's legs",  "Try and slice one of Yosh's legs off", checklist4, '2024-05-03', 'Medium', 'incomplete')
const fifthItem = new Todo('Lie on Rug', 'This a easy one. Lie on the rug', checklist5, '2024-11-10', 'Medium', 'incomplete')
const sixthItem = new Todo('Snooze in the sleeping bag hollow', 'Time to snooze in the hollow!', checklist6, '2024-11-10', 'High', 'incomplete')
const seventhItem = new Todo('Stare out back door', 'If I keep staring something will happen. I just know it.', checklist7, '2024-11-10', 'Low', 'incomplete')
const eighthItem = new Todo('Miaow outside the portal', 'If I keep miaowing someone will help me move through the portal', checklist8, '2024-11-10', 'Low', 'incomplete')
const ninthItem = new Todo('Go zoomies', 'Zooming around the world', checklist9, '2024-11-10', 'Medium', 'incomplete')

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
            items: [eighthItem, ninthItem]
        }
    ],
}

const projectsObject = {   
    // methods
    getDefaultProjectArray(){
        console.log('getting default Array for prefill')
        return projectArray.projectArray;
    },
    // get the local storage array
    getProjectArray(){
        const localArray = this.localStorageGet();
        return localArray;
        // return projectArray.projectArray;
    },

    addCategoryToProjectArray(newCategory) {
        if (checkIfCategoryExists(newCategory) >= 0) {
            alert(`The category "${newCategory}" already exists. Please choose a different category name.`)
        } else {

        // Saving locally
        let localArray = this.localStorageGet();
        localArray.push({category: `${newCategory}`, items: []});
        this.localStorageSet(localArray)

        // projectArray.projectArray.push({category: `${newCategory}`, items: []});

        };
    },

    deleteCategoryFromProjectArray(oldCategory) {    

        const localArray = this.localStorageGet();

        let categoryIndex = checkIfCategoryExists(oldCategory); // returns index if exists, -1 if not

        if (categoryIndex < 0)  {
            alert(`The category "${oldCategory}" doesn't exist and so cannot be deleted.`);
            return;
        } else if (categoryIndex >= 0) {
            if (localArray[categoryIndex]['items'].length !=0){     
                alert(`The '${oldCategory}' category cannot be deleted as it has items attached to it. Please reassign items or delete them first before deleting this category.`)
                return;
            } else {
                // Getting local array
                localArray.splice(categoryIndex, 1);

                // projectArray.projectArray.splice(categoryIndex, 1);
                console.log('The category of "' + oldCategory + '" has been deleted');    

                 // Saving locally

                this.localStorageSet(localArray)      
                return;
                } 
            }
    },

    addItem(category, itemName) {

        let localArray = this.localStorageGet();
        
        for (let i = 0; i < (localArray.length); i++) {
            console.log('addItem: category: ' + category +' , item: ' + itemName.title)

            if (localArray[i]['category'] === category) {

                console.log('inside test' + category + '' + itemName.title)
                 localArray[i]['items'].push(itemName); 

                // Saving locally
                this.localStorageSet(localArray)
            }
        };
    },

    deleteItem(category, itemName, delBtn){
        
        if (delBtn === 1) {
            let answer = prompt("Are you sure you want to delete? Type 'YES' to confirm") 
            
            if (answer === 'YES') {
                console.log(category, itemName)

                let localArray = this.localStorageGet();

                localArray[category]['items'].splice(itemName, 1);
                localArray[category]['items'][itemName];

                  // Saving locally
                  this.localStorageSet(localArray)
            
            } else { 
                alert("Okay. Item won't be deleted") 
                return }
        } else {
            let localArray = this.localStorageGet();


            localArray[category]['items'].splice(itemName, 1);
            localArray[category]['items'][itemName];

            // Saving locally
            this.localStorageSet(localArray)
        }
    },

    getItem(categoryIndex, itemIndex) {

        const localArray = this.localStorageGet();
        
        return localArray[categoryIndex]['items'][itemIndex];
        // return projectArray.projectArray[categoryIndex]['items'][itemIndex];
    },

    toggleChecklistCheckbox(i, j, k, status) {
        console.log('this.toggleChecklistCheckbox has been called: ' + status)

        const localArray = this.localStorageGet();

        localArray[i]['items'][j]['checklist'][k]['checked'] = status;

        this.localStorageSet(localArray);


        // projectArray.projectArray[i]['items'][j]['checklist'][k]['checked'] = status;
    },

    updateItem(categoryIndex, itemIndex, updatedItem) {
        const localArray = this.localStorageGet();

        localArray[categoryIndex]['items'][itemIndex] = updatedItem;

        this.localStorageSet(localArray);

        //   projectArray.projectArray[categoryIndex]['items'][itemIndex] = updatedItem;
    },

    localStorageSet(array) {
        console.log('called LocalStorageSet')
        localStorage.setItem('localArray', JSON.stringify(array));
    },

    localStorageGet() {
        console.log('called localStorageGET')
        let localArrayJSON = localStorage.getItem('localArray');
        let localArray = JSON.parse(localArrayJSON);
        return localArray
    }

};

function checkIfCategoryExists(categoryName){

    const localArray = projectsObject.localStorageGet();


    let test = localArray.findIndex(obj => obj['category'].toLowerCase() === categoryName.toLowerCase());
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
