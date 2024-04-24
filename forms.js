// 
// function createNewForm(newItemForm) 

const createNewForm = (newItemForm) => 
// function createNewForm(newItemForm) 
{
    newItemForm.innerHTML = ` <form action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50"></textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority" class="label-priority">Priority</label>
    <select id=priority class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
};




const createEditForm = (newItemForm, item, categoryindex, itemindex) => {

    console.log(item.description)
    console.log(item.title)
    newItemForm.innerHTML = `<form id="form${categoryindex}${itemindex}" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
        <div class="formDiv" >
        <label for="category" class="label-category"   >Category </label>
        <select id=category class="select-category">
        <option></option>
        </select>
    </div>

    <div class="formDiv">
        <label for="title" class="label-title">Title</label>
        <input type="text" id="title" name="title" class="input-title" value="${item.title}">
    </div>
    <div class="formDiv">
        <label for="description" class="label-description">description</label>
        
        <textarea id="description" name="description" class="input-description" rows="4" cols="50">${item.description}</textarea>

    </div>

    <div class="formDiv">
        <label for="dueDate" class="label-dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate" class="input-dueDate" value="${item.dueDate}">
    </div>
    
    <div class="formDiv" >
        <label for="status" class="label-status">Completed status</label>
        <select id=status class="select-status">
            <option value="completed">Completed</option>   
            <option value="uncompleted">Uncompleted</option> 
        </select>
    </div>

    <div class="formDiv">
    <label for="priority${categoryindex + itemindex}" class="label-priority">Priority</label>
    <select id=priority${categoryindex + itemindex} class="select-priority">
        <option value="High">High</option>   
        <option value="Medium">Medium</option>   
        <option value="Low">Low</option> 
    </select>
    </div>

    <button>cancel</button>     

    
    <button type="submit" class="newBookBtn">Submit</button>
</form>`

return newItemForm;
};

const createCategoryForm = (newCategoryForm) => {


    newCategoryForm.innerHTML = `<form id="newCategoryForm" action="https://httpbin.org/post" method="post" class="newItemForm" autocomplete="off">
    
<div class="formDiv" >

<label for="newCategory" class="label-newCategory">New Category</label>
<input type="text" id="newCategory" name="newCategory" class="input-newCategory" value="Insert new Category Name">

<button>cancel</button>     

<button type="submit" class="newCategoryBtn">Submit</button>

</div>`

console.log('create category form has been called')

return newCategoryForm;
};


export {createNewForm, createEditForm, createCategoryForm} ;
