import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsObject } from "./forms.js";

// item Event listener

const eventListenerObject ={
    
    itemListenerExpand() {
        var items = document.querySelectorAll('.item-expand');
        
        items.forEach((e) => {
            e.addEventListener('click', () => {
                const parent = e.parentNode;
                const itemElement = document.getElementById(parent.id)
                screenControlObject.itemDisplayFull(itemElement, projectsObject.projectsArray, parent.dataset.categoryindex, parent.dataset.itemindex);
                eventListenerObject.checklistToggleListener(); 

                })
            })
    },

    itemListenerCollapse() {
        var items = document.querySelectorAll('.item-collapse');
    
        items.forEach((e) => {
            e.addEventListener('click', (event) => {
                const parent = e.parentNode;

                const itemElement = document.getElementById(parent.id)
                screenControlObject.itemDisplaySummary(itemElement, projectsObject.projectsArray, parent.dataset.categoryindex, parent.dataset.itemindex);
                })
        })
        },
    
    createNewItemListener() {
        let createNewItemButton = document.querySelector('.createNewItem');

        createNewItemButton.addEventListener('click', () => {
            createNewItemButton.disabled = true;
            screenControlObject.displayNewItemForm();

            this.newItemCancel(createNewItemButton);

            formsObject.getNewItemFormInfo();
            console.log('call getFormInfo, listener to extract form data')  
            })
    },

    addChecklistItemListener() {
        let addChecklistItemBtn = document.getElementById('addchecklistItem');

        addChecklistItemBtn.addEventListener('click', (e) => {
            e.preventDefault();  

            const checklistTally = document.getElementById('newItemFormChecklist');
            const newChecklistItem = document.createElement('li'); 

            newChecklistItem.classList.add('checklistItem');        
            newChecklistItem.innerHTML = `<input type="text" id="checklist${(checklistTally.children.length) }" name="title" class="input-checklist"> <button class="checklistDeleteBtn"> delete </button>`
            const parentList = document.getElementById('newItemFormChecklist');
            parentList.appendChild(newChecklistItem);         

            eventListenerObject.deleteChecklistItemListener();
        })

    },

    deleteChecklistItemListener() {
        let deleteChecklistItemBtn = document.querySelectorAll('.checklistDeleteBtn');

        deleteChecklistItemBtn.forEach((e) => {        
            e.addEventListener('click', (del) => {             
                del.preventDefault();
                e.parentNode.remove()
            })
        })
    },
    
    newItemCancel(createNewItemButton) {
        let newItemCancelBtn = document.querySelector('.newItemCancelBtn');

        newItemCancelBtn.addEventListener('click', (e) => {          
            e.preventDefault();
            formsObject.refreshNewItemForm();
            createNewItemButton.disabled = false;
    })},
    
    createNewCategoryListener() {
        let createNewCategoryButton = document.querySelector('.createNewCategory');
        createNewCategoryButton.addEventListener('click', () => {
            createNewCategoryButton.disabled = true;
            screenControlObject.displayNewCategoryForm();
            this.newCategoryCancel(createNewCategoryButton);
            formsObject.getNewCategoryFormInfo();
            }
        )
        },

    newCategoryCancel(createNewCategoryButton) {
        alert('new category cancel called')
        let newCategoryCancelBtn = document.querySelector('.newCategoryCancelBtn');
            newCategoryCancelBtn.addEventListener('click', (e) => {
            alert(e);
            e.preventDefault();
            alert('press') 
            formsObject.refreshNewCategoryForm();
            createNewCategoryButton.disabled = false;               
    })},

    checklistToggleListener() {
        console.log('called checklistToggleListener()')
        let checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach( (e) => {
            console.log(e)
            e.addEventListener('change', () => {
                console.log(e.id)

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
                    console.log('edit an item, now add the functionality. ie. the contents of the item preformatted into a form')
                    pointerEvent.stopPropagation();
                    console.log('e' +e.parentElement.dataset.categoryindex+e.parentElement.dataset.itemindex)

                    screenControlObject.displayEditItemForm(e.parentElement);
        
                    document.getElementById(`form${e.parentElement.dataset.categoryindex}${e.parentElement.dataset.itemindex}`).addEventListener('click', function(event) {
                        console.log('Form clicked');
                        event.stopPropagation(); // Prevent event from propagating to the parent div
                })        
                })
            } )
            }
}

export {eventListenerObject }