import { screenControlObject } from "./screenControl.js";
import { eventListenerObject } from "./eventListeners.js";

addEventListener("DOMContentLoaded", () => {

    setTimeout( () => {
        eventListenerObject.listenerCreateNewItem(); 
        eventListenerObject.listenerCreateNewCategory();
     }, 1000)

screenControlObject.displayAllCategoriesAndItems()

});
