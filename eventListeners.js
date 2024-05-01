import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsObject } from "./forms.js";

// item Event listener

const eventListenerObject ={
    
    itemToggleListener() {
        var items = document.querySelectorAll('.item');
    
        items.forEach((e) => {
            e.addEventListener('click', () => {
                console.log(e)
                const itemElement = document.getElementById(`ref${e.dataset.categoryindex}${e.dataset.itemindex}`)
                
                if (itemElement.classList.contains('full')) {
                    console.log(itemElement.classList)
                    screenControlObject.itemDisplaySummary(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex)
                } else {
                    screenControlObject.itemDisplayFull(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex);
                }
            })
        })
        },
    
    createNewItemListener() {
            let createNewItemButton = document.querySelector('.createNewItem');
                createNewItemButton.addEventListener('click', () => {
                createNewItemButton.disabled = true;
                screenControlObject.displayNewItemForm();
                console.log('create new item')

                this.newItemCancel(createNewItemButton);

                formsObject.getNewItemFormInfo();
                console.log('call getFormInfo, listener to extract form data')
                }
            )
          },

    newItemCancel(createNewItemButton) {
        alert('new item cancel called')
        let newItemCancelBtn = document.querySelector('.newItemCancelBtn');

        newItemCancelBtn.addEventListener('click', (e) => {
            alert(e)
            e.preventDefault();
            alert('press') 
            formsObject.refreshNewItemForm();
            createNewItemButton.disabled = false;
            
    })},
    
    createNewCategoryListener() {
            let createNewCategoryButton = document.querySelector('.createNewCategory');
            createNewCategoryButton.addEventListener('click', () => {
                createNewCategoryButton.disabled = true;
                screenControlObject.displayNewCategoryForm();
                formsObject.getNewCategoryFormInfo();
                }
            )
          },

    itemEditListener(){
            let editButtons = document.querySelectorAll('.editItem');
            editButtons.forEach((e) => {
                e.addEventListener('click', (pointerEvent) => {
                    console.log('edit an item, now add the functionality. ie. the contents of the item preformatted into a form')
                    pointerEvent.stopPropagation();
                    screenControlObject.displayEditItemForm(e.parentElement);
        
                    console.log('e' +e.parentElement.dataset.categoryindex+e.parentElement.dataset.itemindex)
                    document.getElementById(`form${e.parentElement.dataset.categoryindex}${e.parentElement.dataset.itemindex}`).addEventListener('click', function(event) {
                        console.log('Form clicked');
                        event.stopPropagation(); // Prevent event from propagating to the parent div
                })        
                })
            } )
            }
}

export {eventListenerObject }