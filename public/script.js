function showSearchBar() {
    var searchContainer = document.getElementById("search-container");
    searchContainer.classList.toggle("hidden");

// Add

    if (!searchContainer.classList.contains("hidden")){
        document.addEventListener("click", handleOutsideClick);
    } else {
        document.removeEventListener("click", handleOutsideClick);
    }
}

function handleOutsideClick(event) {
    var searchContainer = document.getElementById("search-container");
    var addButton = document.getElementById("add-button");
    var targetElement = event.target;
  
    // Check if the click target is outside of the search container and search button
    if (!searchContainer.contains(targetElement) && !addButton.contains(targetElement)) {
      searchContainer.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  }