function showSearchBar() {
    var searchContainer = document.getElementById("autoComplete_wrapper");
    searchContainer.classList.toggle("hidden");

// Clicking on Add button opens search bar/clicking outside of search bar removes search bar

    if (!autoComplete_wrapper.classList.contains("hidden")){
        document.addEventListener("click", handleOutsideClick);
    } else {
        document.removeEventListener("click", handleOutsideClick);
    }
}

// function showAddMan() {
//         var addManContainer = document.getElementById("addMan_container");
//         addManContainer.classList.toggle("hidden");
    
//     // Clicking on Add button opens add manually window/clicking outside of window removes window
    
//         if (!addMan_container.classList.contains("hidden")){
//             document.addEventListener("click", handleOutsideClick);
//         } else {
//             document.removeEventListener("click", handleOutsideClick);
//         }
//     }


function handleOutsideClick(event) {
    var searchContainer = document.getElementById("autoComplete_wrapper");
    var addButton = document.getElementById("add_button");
    var targetElement = event.target;
  
    // Check if the click target is outside of the search container and search button
    if (!searchContainer.contains(targetElement) && !addButton.contains(targetElement)) {
      searchContainer.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  }

//   function handleOutsideClick(event) {
//     var addManWindow = document.getElementById("addMan_container");
//     var addButton = document.getElementById("add_button");
//     var targetElement = event.target;
  
//     // Check if the click target is outside of the search container and search button
//     if (!addManWindow.contains(targetElement) && !addButton.contains(targetElement)) {
//         addManWindow.classList.add("hidden");
//         document.removeEventListener("click", handleOutsideClick);
//     }
//   }