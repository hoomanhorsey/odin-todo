import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { formsRetrieveObject } from "./formsRetrieveObject.js";

const eventListenerObject ={

    // ****item Event listeners****

    // Sets listener for items expansion
    listenerItemExpand() {
        let items = document.querySelectorAll('.item-expand');
        items.forEach((e) => {
            e.addEventListener('click', eventListenerObject.itemExpand)                    
            })
        },

        // Function expands item.  
        // Standalone function to allow for disabling of '+' button'
        // which is otherwise still accessible for other items
        itemExpand() {   
            const parent = this.parentNode;
            const itemElement = document.getElementById(parent.id)

            screenControlObject.displayItemFull(
                itemElement, projectsObject.getProjectArray());
            
            var items = document.querySelectorAll('.item-expand');
            items.forEach((e) => {
                e.removeEventListener('click', eventListenerObject.itemExpand)
                })

            eventListenerObject.listenerChecklistToggle(); 
            eventListenerObject.disableNewItemCategoryButtons();
            },
    // Function sets listener to collapse item, and standalone function
    // to collapse item

    listenerItemCollapse() {
        let items = document.querySelectorAll('.item-collapse');
        console.log('listener Item Collapse called')
    
        items.forEach((e) => {
            e.addEventListener('click',this.itemCollapse)})},  

        itemCollapse(e) {
            console.log('item collapsing')
            const parent = e.target.parentNode;
            const itemElement = document.getElementById(parent.id)
            itemElement.remove();
                     
            eventListenerObject.enableNewItemCategoryButtons();
            screenControlObject.displayAllCategoriesAndItems();
        },


    /// **** New Items & New Categories ****
    
    listenerCreateNewItem() {
        let createNewItemButton = document.querySelector('.createNewItem');

        createNewItemButton.addEventListener('click', () => {
            screenControlObject.displayNewItemForm();
            formsRetrieveObject.getNewItemFormInfo();

            this.listenerNewItemCancelBtn();           
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
            formsRetrieveObject.getNewCategoryFormInfo();

            this.listenerNewCategoryCancelBtn();           
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

                this.enableNewItemCategoryButtons();
        })},

    listenerDeleteNewCategory() {
        let delCategoryButton = document.querySelector('.delCategoryBtn');

        this.listenerNewCategoryCancelBtn();           
        this.disableNewItemCategoryButtons();
        delCategoryButton.addEventListener('click', (e) => {
            e.preventDefault();

            let delCategoryName = document.querySelector('.input-newCategory').value;

            projectsObject.deleteCategoryFromProjectArray(delCategoryName);   
            screenControlObject.displayAllCategoriesAndItems(); 
            this.enableNewItemCategoryButtons()
            })
       
    },


    /// ****Checklist Manipulation****

    listenerAddChecklistItem() {       
        let addChecklistItemBtn = document.getElementById('addCheckListItem');

        addChecklistItemBtn.addEventListener('click', (e) => {
            e.preventDefault();  

            const newChecklistItem = document.createElement('li'); 
                newChecklistItem.classList.add('checklistItem');        
                newChecklistItem.innerHTML = 
                    `<input type="text"  
                    name="title" class="input-checklist">
                    <input class="checkbox" type="checkbox" ></input> 
                    <button class="checklistDeleteBtn"> - </button>`

            const parentList = document.getElementById('itemFormChecklistUL');
            parentList.appendChild(newChecklistItem);   
            
            this.listenerDeleteChecklistItem();
        })
    },

    listenerDeleteChecklistItem() {
        let deleteChecklistItemBtn = document.querySelectorAll('.checklistDeleteBtn');

        deleteChecklistItemBtn.forEach((e) => {        
            e.addEventListener('click', (del) => {      
                del.preventDefault();
                e.parentNode.remove()
            })
        })
    },
     
    listenerChecklistToggle() {
        let checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((e) => {
            e.addEventListener('change', () => {
                if (e.checked) {
                    projectsObject.toggleChecklistCheckbox(e.id[8], e.id[9], e.id[10], true )
                } else {
                    projectsObject.toggleChecklistCheckbox(e.id[8], e.id[9], e.id[10], false )
                }
            })
        })      
    },

    listenerItemEdit(){
        let editButtons = document.querySelectorAll('.editItem');
        editButtons.forEach((e) => {
            e.addEventListener('click', this.testHandler)
                }
            )},        

        testHandler(event){

            // remove listenerItemCollapse
            let collapseBtn = document.querySelector('.item-collapse')
            collapseBtn.removeEventListener('click', eventListenerObject.itemCollapse);          
            
            event.stopPropagation();
            let button = event.target;


            let buttonParent = button.parentNode;

            let itemElementId = buttonParent.id;
                 let i = itemElementId[3]
                 let j = itemElementId[4]

                 screenControlObject.displayNewItemForm();
                     eventListenerObject.populateEditItemForm(i, j);
                     eventListenerObject.listenerDeleteChecklistItem();

                      // redisplay of summary of item
                    const itemElement = document.getElementById(buttonParent.id);
                     screenControlObject.displayItemSummary(
                         itemElement, projectsObject.getProjectArray(), i, j);
    
                     eventListenerObject.listenerNewItemCancelBtn();
                     eventListenerObject.listenerFormDeleteBtn();
    
                     formsRetrieveObject.getEditFormInfo(i, j);
        },

            populateEditItemForm(categoryindex, itemindex) {
                let i = categoryindex; 
                let j = itemindex;

                let array = projectsObject.getProjectArray();
        
                //inserting category type
                let categorySelector = document.getElementById('categorySelector');
                categorySelector.value = array[i]['category'];
        
                // inserting title
                let title = document.getElementById('title');
                title.value = array[i]['items'][j]['title'];
        
                // inserting description
                let description = document.getElementById('description');
                description.value = array[i]['items'][j]['description']
        
                // checklist length
                let itemFormChecklistElement = document.getElementById('itemFormChecklistUL');
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
                formUtilityBtnDiv.appendChild(deleteBtn);            },

                listenerFormDeleteBtn(){

                    let deleteBtn = document.querySelector('.deleteBtn');
                    
                    deleteBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                    
                        let delref = deleteBtn.id;
                        let categoryindex = delref[6];
                        let itemindex = delref[7];

                        // Variable to let know delItem function to engage prompt
                        let delBtn = 1;
                        projectsObject.deleteItem(categoryindex, itemindex, delBtn  );
                        
                        screenControlObject.displayAllCategoriesAndItems();;

                        eventListenerObject.enableNewItemCategoryButtons();
                        })
                    },

                checklistCreation(categoryindex, itemindex, checklistElement) {

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