import { screenControlObject } from "./screenControl.js";
import { eventListenerObject } from "./eventListeners.js";
import { projectsObject } from "./projectsObject.js";

addEventListener("DOMContentLoaded", () => {

    setTimeout( () => {
        eventListenerObject.listenerCreateNewItem(); 
        eventListenerObject.listenerCreateNewCategory();
     }, 1000)

    //  check session

        // deleting local storage
    //  localStorage.setItem("localArray", "")

    // Check local storage session, prefilling if empty
    if (!localStorage.getItem("localArray")) {

        alert('Nothing stored locally. Populating with default prefill array');

        const defaultArray = projectsObject.getDefaultProjectArray()
        localStorage.setItem("localArray", JSON.stringify(defaultArray))
        console.log(localStorage.getItem('localArray'))
      } else {
        alert('local storage already filled');
        console.log(localStorage.getItem("localArray"))
      }
// localStorage.setItem('localArray', JSON.stringify(projectsObject.getProjectArray()));
// const localArrayJSON = localStorage.getItem('localArray');
// const localArray = JSON.parse(localArrayJSON)
// console.log(localArray)
// console.log(localArray[2])

screenControlObject.displayAllCategoriesAndItems()

});
