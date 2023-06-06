const overlay = document.getElementById("overlay");

function toggleSearchBar() {
    var searchContainer = document.getElementById("autoComplete_container");
    searchContainer.classList.toggle("hidden");

    if (!autoComplete_container.classList.contains("hidden")){
        document.addEventListener("click", hideSearchBar);
    } else {
        document.removeEventListener("click", hideSearchBar);
    }

    // overlay.style.display = "block";
}

function askConfirm() {
    var confirmWindow = document.getElementById("askConfirm_container");
    //console.log("cancel?");
    askConfirm_container.classList.remove("hidden");
}

function closeConfirm() {
    var confirmWindow = document.getElementById("askConfirm_container");
    console.log("no");
    askConfirm_container.classList.add("hidden");
}

function hideSearchBar(event) {
    var searchContainer = document.getElementById("autoComplete_container");
    var addButton = document.getElementById("add_button");
    var targetElement = event.target;
  
    // Check if the click target is outside of the search container and search button
    if (!searchContainer.contains(targetElement) && !addButton.contains(targetElement)) {
      searchContainer.classList.add("hidden");
      document.removeEventListener("click", hideSearchBar);
    }
  }

function addManually() {
    addMan_container.classList.remove("hidden");
    autoComplete_container.classList.add("hidden");
}



  // The autoComplete.js Engine instance creator 
  // from https://tarekraafat.github.io/autoComplete.js/#/
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
      placeHolder: "Search Title to Add a Movie",
      
      resultItem: {
          element: (item, data) => {
          // Modify Results Item Style
          item.style = "display: flex; justify-content: space-between; margin-left: 0;";
          // Modify Results Item Content
          // text-overflow: ellipsis; white-space: nowrap; overflow: hidden;
          item.innerHTML = `
          <div style="width: 20%; padding-left: 10%; display: flex; align-items: center">
              <span style="align-items: center; ">
                  ${data.match}
              </span>
          </div>`;
          },
          highlight: true
      },

      resultsList: {
        element: (list, data) => {
            // Create "No Results" message list element
            const message = document.createElement("div");
            // Add message text content
            message.innerHTML = `<button id = "manualAdd" onclick="addManually()">Add Manually</button>`;
            // Add message list element to the list
            list.prepend(message);
        },
        noResults: true,
        maxResults: 5,
        tabSelect: true
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

// when movie is selected using the search bar, movie info is fetched and displayed on popup, and saved into local storage
autoCompleteJS.input.addEventListener("selection", function(event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    const selection = feedback.selection.value;
    // console.log(selection);
    document.querySelector('#addExist_container img').src = `https://image.tmdb.org/t/p/original${selection['poster_path']}`;
    document.querySelector('#addExist_container h2').textContent = `${selection['title']}`;
    autoComplete_container.classList.add("hidden");

    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5774e26c490bad12ed714f0dba3b87d3&language=en-US')
    .then((response) => response.json())
    .then((data) => {
        var genre_string = '';
        var genre = data['genres'];
        // console.log(genre);
        selection['genre_ids'].forEach(function(item) {
            // console.log(item);
            genre_string += genre.find(o => o.id === item)['name'] + '      ';
        })
        document.querySelector('#addExist_container h6').textContent = genre_string;

        // saving into local storage

        // let favMovies = JSON.parse(localStorage.getItem('favMovies'));
        // console.log(favMovies);

        // if (favMovies == null) {
        //     favMovies = [movie]
        // } else {
        //     if (favMovies.find(element =>element.title === movie.title)) {
        //         console.log('Movie already exists')
        // } else {
        //     favMovies.push(movie)
        //     }
        // }

        const title = selection.title; 
        const poster = selection.poster_path;
        const synopsis = selection.overview;
        const released = selection.release_date;
        // console.log(synopsis);

        //store as object
        var movieInfo = {
            title: title,
            poster: poster,
            synopsis: synopsis,
            released: released
        }

        localStorage.setItem('movieInfo',JSON.stringify(movieInfo));
        console.log(localStorage.getItem('movieInfo'));


        
    });
    addExist_container.classList.remove("hidden");
})