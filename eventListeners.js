import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsCreateObject } from "./formsCreateObject.js";
import { formsRetrieveObject } from "./formsRetrieveObject.js";

const eventListenerObject ={

    // ****item Event listener****

    // Sets listener for items expansion
    listenerItemExpand() {
        var items = document.querySelectorAll('.item-expand');
        items.forEach((e) => {
            e.addEventListener('click', eventListenerObject.itemExpand)                    
            })
        },

        // Function for expansion of item. 
        // Set up as a standalone function to allow for disabling of '+' button'
        // that is still accessible for other items
        itemExpand() {   
            const parent = this.parentNode;
            console.log(parent.id)
            const itemElement = document.getElementById(parent.id)
                screenControlObject.displayItemFull(
                itemElement, projectsObject.getProjectArray());
            
            eventListenerObject.listenerChecklistToggle(); 

            var items = document.querySelectorAll('.item-expand');
            items.forEach((e) => {
                e.removeEventListener('click', eventListenerObject.itemExpand)
                })

            eventListenerObject.disableNewItemCategoryButtons();
            },
    
    listenerItemCollapse() {
        var items = document.querySelectorAll('.item-collapse');
    
        items.forEach((e) => {
            e.addEventListener('click', () => {
                const parent = e.parentNode;

                const itemElement = document.getElementById(parent.id)
                    screenControlObject.displayItemSummary(
                    itemElement, projectsObject.getProjectArray(), 
                    parent.dataset.categoryindex, parent.dataset.itemindex);
                
                eventListenerObject.enableNewItemCategoryButtons();
                });
            });
        },


    /// **** New Items & New Categories ****
    
    listenerCreateNewItem() {
        let createNewItemButton = document.querySelector('.createNewItem');

        createNewItemButton.addEventListener('click', () => {
            screenControlObject.displayNewItemForm();

            this.listenerNewItemCancelBtn();

            formsRetrieveObject.getNewItemFormInfo();
            
            this.disableNewItemCategoryButtons();
            })
        },

        // New Item Cancel Btn Listener
        listenerNewItemCancelBtn() {
            let newItemCancelBtn = document.querySelector('.newItemCancelBtn');

            newItemCancelBtn.addEventListener('click', (e) => {          
                e.preventDefault();

                // removes the form from display
                let newItemFormDiv = document.querySelector('.newItemFormDiv');
                    newItemFormDiv.remove()

                this.enableNewItemCategoryButtons();
                }
            )},

    listenerCreateNewCategory() {
        let createNewCategoryButton = document.querySelector('.createNewCategory');
        createNewCategoryButton.addEventListener('click', () => {

            screenControlObject.displayNewCategoryForm();
            this.listenerNewCategoryCancelBtn();

            formsRetrieveObject.getNewCategoryFormInfo();

            this.disableNewItemCategoryButtons();
            })
        },

        listenerNewCategoryCancelBtn() {
            let newCategoryCancelBtn = document.querySelector('.newCategoryCancelBtn');

                newCategoryCancelBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                // removes form from display
                let newCategoryFormDiv = document.querySelector('.newCategoryForm');
                    newCategoryFormDiv.remove();

                eventListenerObject.enableNewItemCategoryButtons();
        })},

    /// ****Checklist Manipulation****

    // New Item - Add checklist items 

    listenerAddChecklistItem() {       
        let addChecklistItemBtn = document.getElementById('addCheckListItem');

        addChecklistItemBtn.addEventListener('click', (e) => {
            e.preventDefault();  

            const newChecklistItem = document.createElement('li'); 

            newChecklistItem.classList.add('checklistItem');        
            newChecklistItem.innerHTML = 
                `<input type="text"  
                name="title" class="input-checklist"> 
                
                <button class="checklistDeleteBtn"> - </button>`
            const parentList = document.getElementById('itemFormChecklistUL');
            parentList.appendChild(newChecklistItem);         

            eventListenerObject.listenerDeleteChecklistItem();
        })

        // `<input type="text" id="checklist${ (checklistTally.children.length) }" 
        // name="title" class="input-checklist"> 
        // <button class="checklistDeleteBtn"> - </button>`

///TODO - Need to add IDs to checklist via a for loop, upon submit button. Not as you create them. Because otherwise as they jumble in and out of order, they will go in and out of order.
    },

    listenerDeleteChecklistItem() {
        let deleteChecklistItemBtn = document.querySelectorAll('.checklistDeleteBtn');

        deleteChecklistItemBtn.forEach((e) => {        
            e.addEventListener('click', (del) => {      
                
                // alert('press del')
                del.preventDefault();
                e.parentNode.remove()
            })
        })
    },
     
    listenerChecklistToggle() {
        let checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach( (e) => {
            console.log(e)
            e.addEventListener('change', () => {
                console.log(e.id)

                let array = projectsObject.getProjectArray()
                console.log(array)

                // console.log(array[0]['category']['items'])

                console.log(array[0]['items'][0]['checklist'][0]['checked'])

                // Need to create a function that changes the array in the project object.
                console.log(e.id[8])
                console.log(e.id[9])
                console.log(e.id[10])


                /// NOTE - The checklist id is in the format 'checkbox###':
                /// first # = i
                /// second # = j
                /// third # = k

                if (e.checked) {
                    console.log("and it's checked")
                    projectsObject.toggleChecklistCheckbox(e.id[8], e.id[9], e.id[10], true )

                } else {
                               //insert logic to update for non-check
                    console.log("no, it's not checked")
                    projectsObject.toggleChecklistCheckbox(e.id[8], e.id[9], e.id[10], false )

                    // array[0]['items'][0]['checklist'][0]['checked'] = false;

                }

            }

            
                // pass array into function
                // get referenct to item in array
                // pass reference to item in array.
                // update state of checkbox in array....


            )
            })      
    },


    // let deleteChecklistItemBtn = document.querySelectorAll('.checklistDeleteBtn');

    //     deleteChecklistItemBtn.forEach((e) => {        
    //         e.addEventListener('click', (del) => {             
    //             del.preventDefault();
    //             e.parentNode.remove()

    listenerItemEdit(){
            let editButtons = document.querySelectorAll('.editItem');
            editButtons.forEach((e) => {
                e.addEventListener('click', (pointerEvent) => {
                    pointerEvent.stopPropagation();
              
                    const parent = e.parentNode;

                    let itemElementId = parent.id;
                    let i = itemElementId[3]
                    let j = itemElementId[4]

                    // redisplay of summary of item
                        const itemElement = document.getElementById(parent.id)
                        screenControlObject.displayItemSummary(
                        itemElement, projectsObject.getProjectArray(), i, j 
                    );

                    screenControlObject.displayNewItemForm();
                    
                    this.populateEditItemForm(i, j);
                            alert('populateEditItems has been called, i and j, index category' + i + j )
                    this.listenerNewItemCancelBtn();

                    formsRetrieveObject.getEditFormInfo(i, j);

                    this.listenerDeleteChecklistItem();
                    this.listenerFormDeleteBtn()

                    })
                })
            },  

            populateEditItemForm(categoryindex, itemindex) {

                let i = categoryindex; 
                let j = itemindex;

                let array = projectsObject.getProjectArray();
        
                //inserting category type
                let categorySelector = document.getElementById('categorySelector')
                categorySelector.value = array[i]['category'];
        
                // inserting title
                let title = document.getElementById('title');
                title.value = array[i]['items'][j]['title'];
        
                // inserting description
                let description = document.getElementById('description');
                description.value = array[i]['items'][j]['description']
        
                // checklist length
                let itemFormChecklistElement = document.getElementById('itemFormChecklistUL')
                console.log(itemFormChecklistElement)
                itemFormChecklistElement.value = this.checklistCreation(i, j, itemFormChecklistElement);
        
                // inserting dueDate
                let dueDate = document.getElementById('dueDate');
                dueDate.value = array[i]['items'][j]['dueDate']
        
                // inserting status
                let status = document.getElementById('status');
                status.value = array[i]['items'][j]['status']
        
                // inserting priority
                let priority = document.getElementById('priority');
                priority.value = array[i]['items'][j]['priority']

                // create delete btn (form template doesn't include by default)
                let formUtilityBtnDiv = document.getElementById('formUtilityBtnDiv');
                let deleteBtn = document.createElement('button')
                deleteBtn.innerHTML = 'delete'
                deleteBtn.id = `delref${i + j}`
                deleteBtn.classList.add('deleteBtn');

                formUtilityBtnDiv.appendChild(deleteBtn)
                console.log(formUtilityBtnDiv, deleteBtn)
            },

            listenerFormDeleteBtn(){

                let deleteBtn = document.querySelector('.deleteBtn');
                
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(deleteBtn + ' ' + deleteBtn.id)

                    let delref = deleteBtn.id;
                    let categoryindex = delref[6];
                    let itemindex = delref[7];

                    console.log(delref[6] + delref[7])

                    let array = projectsObject.getProjectArray()

                    console.log(array[categoryindex]['items'][itemindex]);

                    projectsObject.deleteItem(categoryindex, itemindex);

                    
                    screenControlObject.displayAllCategoriesAndItems();;


                    eventListenerObject.enableNewItemCategoryButtons();


                }            )

                // TODO
                // Get ref of item to be deleted.
                // Delete item from array.
                // Loop through each of the items in the same category, starting from the 
                    // index item
                // Amend each item so that the index item is reduced by 1.
                // Reprint display screen



                },

            checklistCreation(categoryindex, itemindex, checklistElement) {

                alert('checklist creation called')
                // NOTE: checklistCreation differs from checklist creation in displayItemFull()
                // as it includes a 'input' text box.
                let itemElement = checklistElement;
                let i = categoryindex;
                let j = itemindex;
    
                let array = projectsObject.getProjectArray();
    
                //test for checklist
                let checklistHTML = '';
                // items in the checklist array.
                var checkItemsNumber = (array[i]['items'][j]['checklist'].length)
    
                // Creates checklist HTML <li> items based on checklist array
                // if none, then there is no HTML created.  
                for (let k= 0; k < checkItemsNumber; k++) {
                    if (array[i]['items'][j]['checklist'][k]['checked']) {
                        checklistHTML += 
                            `<li>
                                <input type="text" name="title" class="input-checklist" 
                                    value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                                <input class="checkbox" type="checkbox" checked></input> 
                                <button class="checklistDeleteBtn"> - </button> 
                            </li>`
                    } else {
                        checklistHTML += 
                            `<li>
                                <input type="text" name="title" class="input-checklist" 
                                    value="${array[i]['items'][j]['checklist'][k] ['checkItem']}"></input> 
                                <input class="checkbox"  type="checkbox" ></input> 
                                <button class="checklistDeleteBtn"> - </button>
                            </li>`
                    }       
                };
                itemElement.innerHTML = checklistHTML;
            },

// Utilities - enabling and disabling new item/category buttons, upon selection of new item/category
    disableNewItemCategoryButtons(){
        let newCategoryButton = document.querySelector('.createNewCategory');
            newCategoryButton.disabled = true;
        let newItemButton = document.querySelector('.createNewItem');
            newItemButton.disabled = true;
    },

    enableNewItemCategoryButtons(){
        let newCategoryButton = document.querySelector('.createNewCategory');
            newCategoryButton.disabled = false;
        let newItemButton = document.querySelector('.createNewItem');
            newItemButton.disabled = false;
    },
}

export {eventListenerObject }