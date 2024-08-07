import { screenControlObject } from "./screenControl.js";
import { eventListenerObject } from "./eventListeners.js";
import { projectsObject } from "./projectsObject.js";

addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    eventListenerObject.listenerCreateNewItem();
    eventListenerObject.listenerCreateNewCategory();
  }, 1000);

  //  check session

  // deleting local storage
  //  localStorage.setItem("localArray", "")

  // Check local storage session, prefilling if empty
  if (!localStorage.getItem("localArray")) {
    console.log(
      "Nothing stored locally. Populating with default prefill array"
    );

    const defaultArray = projectsObject.getDefaultProjectArray();
    localStorage.setItem("localArray", JSON.stringify(defaultArray));
    console.log(localStorage.getItem("localArray"));
  } else {
    console.log("local storage already filled");
  }

  screenControlObject.displayAllCategoriesAndItems();
});
