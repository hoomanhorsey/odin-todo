import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsCreateObject } from "./formsCreateObject.js";
import { formsRetrieveObject } from "./formsRetrieveObject.js";

const eventListenerObject ={

    // ****item Event listener****

    // Sets listener for items expansion
    itemListenerExpand() {
        var items = document.querySelectorAll('.item-expand');
        items.forEach((e) => {
            e.addEventListener('click', eventListenerObject.itemExpand)                    
            })
        },

        // Function for expansion of item. 
        // Set up as a standalone function to allow for disabling of '+' button'
        itemExpand() {   
            const parent = this.parentNode;
            const itemElement = document.getElementById(parent.id)
                screenControlObject.itemDisplayFull(
                itemElement, projectsObject.projectsArray, 
                parent.dataset.categoryindex,parent.dataset.itemindex);
            
            eventListenerObject.checklistToggleListener(); 

            var items = document.querySelectorAll('.item-expand');
            items.forEach((e) => {
                e.removeEventListener('click', eventListenerObject.itemExpand)
                })

            eventListenerObject.disableNewItemCategoryButtons();
            },
    
    itemListenerCollapse() {
        var items = document.querySelectorAll('.item-collapse');
    
        items.forEach((e) => {
            e.addEventListener('click', () => {
                const parent = e.parentNode;

                const itemElement = document.getElementById(parent.id)
                    screenControlObject.itemDisplaySummary(
                    itemElement, projectsObject.projectsArray, 
                    parent.dataset.categoryindex, parent.dataset.itemindex);
                
                eventListenerObject.enableNewItemCategoryButtons();
                });
            });
        },


    /// **** New Items & New Categories ****
    
    createNewItemListener() {
        let createNewItemButton = document.querySelector('.createNewItem');

        createNewItemButton.addEventListener('click', () => {
            screenControlObject.displayNewItemForm();

            this.newItemCancelBtnListener();

            formsRetrieveObject.getNewItemFormInfo();
            
            this.disableNewItemCategoryButtons();
            })
        },

        // New Item Cancel Btn Listener
        newItemCancelBtnListener() {
            let newItemCancelBtn = document.querySelector('.newItemCancelBtn');

            newItemCancelBtn.addEventListener('click', (e) => {          
                e.preventDefault();

                // removes the form from display
                let newItemFormDiv = document.querySelector('.newItemFormDiv');
                    newItemFormDiv.remove()

                this.enableNewItemCategoryButtons();
                }
            )},

    createNewCategoryListener() {
        let createNewCategoryButton = document.querySelector('.createNewCategory');
        createNewCategoryButton.addEventListener('click', () => {

            screenControlObject.displayNewCategoryForm();
            this.newCategoryCancelBtnListener();

            formsRetrieveObject.getNewCategoryFormInfo();

            this.disableNewItemCategoryButtons();
            })
        },

        newCategoryCancelBtnListener() {
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

    addChecklistItemListener() {       
        let addChecklistItemBtn = document.getElementById('addCheckListItem');

        addChecklistItemBtn.addEventListener('click', (e) => {
            e.preventDefault();  

            const checklistTally = document.getElementById('newItemFormChecklist');
            const newChecklistItem = document.createElement('li'); 

            newChecklistItem.classList.add('checklistItem');        
            newChecklistItem.innerHTML = 
                `<input type="text"  
                name="title" class="input-checklist"> 
                <button class="checklistDeleteBtn"> - </button>`
            const parentList = document.getElementById('newItemFormChecklist');
            parentList.appendChild(newChecklistItem);         

            eventListenerObject.deleteChecklistItemListener();
        })

        // `<input type="text" id="checklist${ (checklistTally.children.length) }" 
        // name="title" class="input-checklist"> 
        // <button class="checklistDeleteBtn"> - </button>`

///TODO - Need to add IDs to checklist via a for loop, upon submit button. Not as you create them. Because otherwise as they jumble in and out of order, they will go in and out of order.
    },

    // Edit Item - Add checklist Item
    addEditChecklistItemListener(){

        const addChecklistItemBtns = document.querySelectorAll('.editAddChecklistItem');

            addChecklistItemBtns.forEach( (button) => {
                button.addEventListener('click', (pointerEvent) => {
                    pointerEvent.preventDefault(); 

                    let bParent = button.parentNode;
                    let bGrandparent = bParent.parentNode;
                    let bGreatGrandparent = bGrandparent.parentNode
                    console.log(bGreatGrandparent.id)
                    let formId = bGreatGrandparent.id

                    console.log(formId[4]+ formId[5])

                    let categoryindex = formId[4] 
                    let itemindex = formId[5]

                    console.log(`newItemFormChecklist${formId[4]+formId[5]}`)
                    
                    const checklistTally = document.getElementById(`newItemFormChecklist${formId[4]+formId[5]}`);

                        console.log(checklistTally.children.length)

                    const newChecklistItem = document.createElement('li'); 

                    // Creating an object to store dynamically generated variables.
                    // May be useful in ensuring event listener is triggered for specific items, and keeps tallies.
                    var dynamicCheckId = {};
                    let variableRef = `ref${formId[4]+formId[5]}`;
                    console.log('variable ref: ' + variableRef);
                    var propertyName =  variableRef;
                    console.log('property name: '+ propertyName)
                    dynamicCheckId[propertyName] = `ref${formId[4]+formId[5]}`;

                    console.log(dynamicCheckId[variableRef]);
                    console.table(dynamicCheckId)

                    newChecklistItem.classList.add('checklistItem');        
                    newChecklistItem.innerHTML = 

                        ` <label for="checklist${categoryindex+itemindex+checklistTally.children.length}" class="label-checklist"></label>
                        <input type="text" id="checklist${(categoryindex+itemindex+checklistTally.children.length)}" 
                        name="checklist" class="input-checklistItem">
        
                        <input type="checkbox" ></input> 
                        <button class="checklistDeleteBtn"> - </button>`
                    const parentList = document.getElementById('editNewItemFormChecklist');
                    checklistTally.appendChild(newChecklistItem);         
        
                    eventListenerObject.deleteChecklistItemListener();
                     }
                    )
                })       
    },

    deleteChecklistItemListener() {
        let deleteChecklistItemBtn = document.querySelectorAll('.checklistDeleteBtn');

        deleteChecklistItemBtn.forEach((e) => {        
            e.addEventListener('click', (del) => {      
                
                // alert('press del')
                del.preventDefault();
                e.parentNode.remove()
            })
        })
    },
    
    editItemCancelListener() {
        let cancelEditBtn = document.querySelector('.cancelEditBtn');
        cancelEditBtn.addEventListener('click', (e) => {
            screenControlObject.displayFullList();
        })
    },

   
   

    checklistToggleListener() {
        // console.log('called checklistToggleListener()')
        let checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach( (e) => {
            // console.log(e)
            e.addEventListener('change', () => {
                // console.log(e.id)

                let array = projectsObject.getProjectsArray()
                console.log(array)

                // console.log(array[0]['category']['items'])

                console.log(array[0]['items'][0]['checklist'][0]['checked'])

                // Need to create a function that changes the array in the project object.

                console.log(e.id[8])
                console.log(e.id[9])
                console.log(e.id[10])


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



    itemEditListener(){
            let editButtons = document.querySelectorAll('.editItem');
            editButtons.forEach((e) => {
                e.addEventListener('click', (pointerEvent) => {
                    pointerEvent.stopPropagation();
                    console.log('e: ' +e.parentElement.dataset.categoryindex+e.parentElement.dataset.itemindex)

                    screenControlObject.displayEditItemForm(e.parentElement);
        
                    document.getElementById(`form${e.parentElement.dataset.categoryindex}${e.parentElement.dataset.itemindex}`).addEventListener('click', function(event) {
                        console.log('Form clicked');
                        event.stopPropagation(); // Prevent event from propagating to the parent div
                })    
                eventListenerObject.editItemCancelListener(); 
                })
            } )
            },

// Utilities - enabling and disabling new item/category buttons, upon selection of new item/category
    disableNewItemCategoryButtons(){
        let createNewCategoryButton = document.querySelector('.createNewCategory');
            createNewCategoryButton.disabled = true;
        let createNewItemButton = document.querySelector('.createNewItem');
            createNewItemButton.disabled = true;
    },

    enableNewItemCategoryButtons(){
        let createNewCategoryButton = document.querySelector('.createNewCategory');
            createNewCategoryButton.disabled = false;
        let createNewItemButton = document.querySelector('.createNewItem');
            createNewItemButton.disabled = false;
    },
}

export {eventListenerObject }