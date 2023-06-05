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
  let searchBar = document.querySelector("#autoComplete");
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
              "https://api.themoviedb.org/3/search/movie?api_key=5774e26c490bad12ed714f0dba3b87d3"
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
          cache: true,
      },
      placeHolder: "Search for Movies!",
      resultsList: {
          element: (list, data) => {
              // Create "No Results" message list element
              const message = document.createElement("div");
              // Add message text content
              message.innerHTML = `<button id = "manualAdd">Add Manually</button>`;
              // Add message list element to the list
              list.prepend(message);
          },
          noResults: true,
          maxResults: 15,
          tabSelect: true
      },
      resultItem: {
          element: (item, data) => {
          // Modify Results Item Style
          item.style = "display: flex; justify-content: space-between; margin-left: 0;";
          // Modify Results Item Content
          item.innerHTML = `
          <span>
              <img src="https://image.tmdb.org/t/p/original/${data.value.poster_path}" height="100">
          </span>
          <div style="width: 60%; padding-left: 10%; display: flex; align-items: center">
              <span style="align-items: center; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                  ${data.match}
              </span>
          </div>
          <span style="display: flex; align-items: flex-end; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
              ${data.value.release_date ? data.value.release_date : 'xxxx-xx-xx'}
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

  searchBar.oninput = function(){
    console.log(this.value);
    autoCompleteJS.data = {
        src: async () => {
        try {
            // Loading placeholder text
            document
            .getElementById("autoComplete")
            .setAttribute("placeholder", "Loading...");
            // Fetch External Data Source
            const source = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=5774e26c490bad12ed714f0dba3b87d3&query=${this.value}`
            );
            const data = await source.json();
            // Post Loading placeholder text
            document
            .getElementById("autoComplete")
            .setAttribute("placeholder", autoCompleteJS.placeHolder);
            // Returns Fetched data
            return data.results;
        } catch (error) {
            return error;
        }
        },
        keys: ["title"]
    };
}


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