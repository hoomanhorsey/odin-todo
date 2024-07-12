import { screenControlObject } from "./screenControl.js";
import { projectsObject } from "./projectsObject.js";
import { eventListenerObject } from "./eventListeners.js";

addEventListener("DOMContentLoaded", () => {

    setTimeout( () => {
        eventListenerObject.createNewItemListener(); 
        eventListenerObject.createNewCategoryListener();
     }, 1000)

screenControlObject.displayFullList()

});
