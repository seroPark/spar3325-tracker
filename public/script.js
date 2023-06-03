function showSearchBar() {
    var searchContainer = document.getElementById("autoComplete_wrapper");
    searchContainer.classList.toggle("hidden");

// Add

    if (!autoComplete_wrapper.classList.contains("hidden")){
        document.addEventListener("click", handleOutsideClick);
    } else {
        document.removeEventListener("click", handleOutsideClick);
    }
}

function handleOutsideClick(event) {
    var searchContainer = document.getElementById("autoComplete_wrapper");
    var addButton = document.getElementById("add-button");
    var targetElement = event.target;
  
    // Check if the click target is outside of the search container and search button
    if (!searchContainer.contains(targetElement) && !addButton.contains(targetElement)) {
      searchContainer.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  }


  // The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
    data: {
      src: async () => {
        try {
          // Loading placeholder text
          document
            .getElementById("autoComplete")
            .setAttribute("placeholder", "Loading...");
          // Fetch External Data Source
          const source = await fetch(
            "https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
          );
          const data = await source.json();
          // Post Loading placeholder text
          document
            .getElementById("autoComplete")
            .setAttribute("placeholder", autoCompleteJS.placeHolder);
          // Returns Fetched data
          return data;
        } catch (error) {
          return error;
        }
      },
      keys: ["food", "cities", "animals"],
      cache: true,
      filter: (list) => {
        // Filter duplicates
        // incase of multiple data keys usage
        const filteredResults = Array.from(
          new Set(list.map((value) => value.match))
        ).map((food) => {
          return list.find((value) => value.match === food);
        });
  
        return filteredResults;
      }
    },
    placeHolder: "Search for Food & Drinks!",
    resultsList: {
      element: (list, data) => {
        const info = document.createElement("p");
        if (data.results.length > 0) {
          info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
        } else {
          info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true
    },
    resultItem: {
      element: (item, data) => {
        // Modify Results Item Style
        item.style = "display: flex; justify-content: space-between;";
        // Modify Results Item Content
        item.innerHTML = `
        <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
          ${data.match}
        </span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
          ${data.key}
        </span>`;
      },
      highlight: true
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS.input.value.length) autoCompleteJS.start();
        }
      }
    }
  });


  // user selection leads to add new movie thing
//   autoCompleteJS.input.addEventListener("selection", function (event) {
//     const feedback = event.detail;
//     autoCompleteJS.input.blur();
//     // Prepare User's Selected Value
//     const selection = feedback.selection.value[feedback.selection.key];
//     // Render selected choice to selection div
//     document.querySelector(".selection").innerHTML = selection;
//     // Replace Input value with the selected value
//     autoCompleteJS.input.value = selection;
//     // Console log autoComplete data feedback
//     console.log(feedback);
//   });


const action = (action) => {
    const title = document.querySelector("h1");
    const mode = document.querySelector(".mode");
    const selection = document.querySelector(".selection");
    const footer = document.querySelector(".footer");
  
    if (action === "dim") {
      title.style.opacity = 1;
      mode.style.opacity = 1;
      selection.style.opacity = 1;
    } else {
      title.style.opacity = 0.3;
      mode.style.opacity = 0.2;
      selection.style.opacity = 0.1;
    }
  };
  
  // Blur/unBlur page elements on input focus
  ["focus", "blur"].forEach((eventType) => {
    autoCompleteJS.input.addEventListener(eventType, () => {
      // Blur page elements
      if (eventType === "blur") {
        action("dim");
      } else if (eventType === "focus") {
        // unBlur page elements
        action("light");
      }
    });
  });