import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsObject } from "./forms.js";

// item Event listener

const eventListenerObject ={
    
    itemToggleListener() {
        var items = document.querySelectorAll('.item');
    
        items.forEach((e) => {
            e.addEventListener('click', (event) => {
                console.log(e)
                const itemElement = document.getElementById(`ref${e.dataset.categoryindex}${e.dataset.itemindex}`)
                event.stopPropagation();


                if (itemElement.classList.contains('full')) {
                    console.log(itemElement.classList)
                    screenControlObject.itemDisplaySummary(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex)
                } else {
                    screenControlObject.itemDisplayFull(itemElement, projectsObject.projectsArray, e.dataset.categoryindex, e.dataset.itemindex);
                }
            })
        })
        },


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
            console.log('create new item')

            this.newItemCancel(createNewItemButton);

            formsObject.getNewItemFormInfo();
            console.log('call getFormInfo, listener to extract form data')
            
            }
        )
          },

    addChecklistItemListener() {
        let addChecklistItemBtn = document.getElementById('addchecklistItem');
        console.log(addChecklistItemBtn)
        addChecklistItemBtn.addEventListener('click', (e) => {
            alert('add new item')
            e.preventDefault();  

            const newChecklistItem = document.createElement('p');
            

            var firstItem = document.getElementById('checklist0');
            alert(firstItem)
            var parentNode = firstItem.parentNode;
            var siblings = parentNode.children;
            alert(siblings.length)


            
            newChecklistItem.classList.add('checklistItem');
            newChecklistItem.innerHTML = `<input type="text" id="checklist${(siblings.length -1) + 1}" name="title" class="input-checklist">
                    `
            const parentDiv = document.getElementById('checklistSubDiv');

            parentDiv.appendChild(newChecklistItem);          

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