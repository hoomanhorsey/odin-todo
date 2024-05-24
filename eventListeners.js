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
        console.log('called' )
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
            
            alert(e);
            e.preventDefault();
            alert('press');
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