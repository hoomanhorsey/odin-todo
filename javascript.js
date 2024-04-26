import { screenControlObject } from "./screenControl.js";
import { projectsObject , Todo} from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";

addEventListener("DOMContentLoaded", () => {


// item Event listener

// const eventListenerObject ={
    
//     itemEventListener() {
//         var items = document.querySelectorAll('.item');
    
//         items.forEach((e) => {
//             e.addEventListener('click', () => {
//                 console.log(e)
//                 const itemElement = document.getElementById(`ref${e.dataset.categoryindex}${e.dataset.itemindex}`)
                
//                 if (itemElement.classList.contains('full')) {
//                     console.log(itemElement.classList)
//                     screenControlObject.itemDisplaySummary(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex)
//                 } else {
//                     screenControlObject.itemDisplayFull(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex);
//                 }
//             })
//         })
//         },
    
//     createNewItemListener() {
//             let createNewItemButton = document.querySelector('.createNewItem');
//             createNewItemButton.addEventListener('click', () => {
//                 createNewItemButton.disabled = true;
//                 displayNewItemForm();
//                 console.log('create new item')
//                 getFormInfo();
//                 console.log('call getFormInfo, listener to extract form data')
//                 }
//             )
//           },
    
//     createNewCategoryListener() {
//             let createNewCategoryButton = document.querySelector('.createNewCategory');
//             createNewCategoryButton.addEventListener('click', () => {
//                 createNewCategoryButton.disabled = true;
//                 displayNewCategoryForm();
//                 getNewCategoryFormInfo();
//                 }
//             )
//           }
// }


// function itemEventListener() {
//     var items = document.querySelectorAll('.item');

//     items.forEach((e) => {
//         e.addEventListener('click', () => {

//             console.log(e)
//             const itemElement = document.getElementById(`ref${e.dataset.categoryindex}${e.dataset.itemindex}`)
            
//             if (itemElement.classList.contains('full')) {
//                 console.log(itemElement.classList)
//                 screenControlObject.itemDisplaySummary(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex)
//             } else {
//                 screenControlObject.itemDisplayFull(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex);
//             }
//         })
//     })
//     }



//   function createNewCategoryListener() {
//     let createNewCategoryButton = document.querySelector('.createNewCategory');
//     createNewCategoryButton.addEventListener('click', () => {
//         createNewCategoryButton.disabled = true;
//         displayNewCategoryForm();
//         getNewCategoryFormInfo();
//         }
//     )
//   };


    setTimeout( () => {
        eventListenerObject.itemEventListener();
        eventListenerObject.createNewItemListener(); 
        eventListenerObject.createNewCategoryListener();
     }, 1000)


// function displayNewItemForm() {

//     let newItem = document.querySelector('.newItem')
//     let newItemForm = document.createElement('div');
//     newItemForm.classList.add('newItemFormDiv');

//     newItemForm = createNewForm(newItemForm);
//     newItem.appendChild(newItemForm);

//         const buttonInFunction = document.querySelector('.newBookBtn')
//         console.log(buttonInFunction)
    
//     const selectCategory = document.getElementById('category');

//     for (let i = 0; i < projectsObject.projectsArray.length; i++) {
        
//         const optionElement = document.createElement('option');
//         optionElement.value = projectsObject.projectsArray[i]['category'];

//         optionElement.textContent = projectsObject.projectsArray[i]['category'];
//         selectCategory.appendChild(optionElement);
//         }  
//     }

// function displayNewCategoryForm() {

//     let newCategory = document.querySelector('.newCategory')
//     let newCategoryForm = document.createElement('div');

//     newCategoryForm = createCategoryForm(newCategoryForm);
//     newCategory.appendChild(newCategoryForm);
// }

// function refreshNewItemForm() {
//     let newItemFormDiv = document.querySelector('.newItemFormDiv');
//     newItemFormDiv.remove()
// }


// function getFormInfo() {
//     console.log('getFormInto is actually called')
//     const newItemFormData = document.querySelector('.newBookBtn')
//     console.log(newItemFormData);

//     newItemFormData.addEventListener('click', (e) => {
//         e.preventDefault();

//         let category = document.querySelector('.select-category').value;
//         let title = document.querySelector('.input-title').value;
//         let description = document.querySelector('.input-description').value;
//         let dueDate = document.querySelector('.input-dueDate').value;

//         let status = document.querySelector('.select-status').value;
//         let priority = document.querySelector('.select-priority').value;
//         console.log(category + title + description + dueDate + priority + status);
//         const newItem = new Todo(title, description, dueDate, priority);

//     projectsObject.addItem(category, newItem);

//     screenControlObject.displayList();
//     refreshNewItemForm();
//     let createNewItemButton = document.querySelector('.createNewItem');

//     createNewItemButton.disabled = false;

//     itemEventListener();
//     })
//     };

function getNewCategoryFormInfo() {
    const newCategoryBtn = document.querySelector('.newCategoryBtn');
    
    newCategoryBtn.addEventListener('click',  (e) => {
        console.log('called new Category')  
        e.preventDefault();
        let newCategoryName = document.querySelector('.input-newCategory').value;
        projectsObject.addCategoryToProjectsArray(newCategoryName);
        displayList(projectsObject.projectsArray);
        }
    );
} 

// function displayEditItem(e) {
//     console.log('hello, editing item')

//     // Getting the item from the Project array, via the dataset index
//     console.log(e.id) 
//     console.log(e.dataset.categoryindex + e.dataset.itemindex);

//     const categoryindex = e.dataset.categoryindex;
//     const itemindex = e.dataset.itemindex;
//     console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex).title);
//     console.log("get Item: " + projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex));
    
//     const item = projectsObject.getItem(e.dataset.categoryindex, e.dataset.itemindex);
//     console.log(item.title, item.description)

//     //remove event listener for Item
//     // var eventListener = switchItemDisplay(e);
//     alert('did you get this far')
//     // Display the data in a form?  
//     let element = document.getElementById(e.id)
//     console.log(element)

//     let newItemForm = document.createElement('div');

//     newItemForm = createEditForm(newItemForm, item, categoryindex, itemindex);

//     console.log(newItemForm)

//     element.appendChild(newItemForm);

//     console.log(item.priority);
//     let prioritySelector = document.getElementById(`priority${categoryindex+itemindex}`)

//     for (var i = 0; i < prioritySelector.options.length; i++) {
//         if (prioritySelector.options[i].value === item.priority) {
//             prioritySelector.selectedIndex = i;
//             break;
//         }
//     }
//     // - get the elment by ID
//     // replace javascript with a form
//     // prefill the form with the data from the array
//     // save the form by updating the

// }


screenControlObject.displayList()

});
