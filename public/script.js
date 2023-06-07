
const overlay = document.getElementById("overlay");



// const delete_grid = document.getElementById('delete_button');
// delete_grid.addEventListener('click', function() {

// })


function toggleSearchBar() {
    var searchContainer = document.getElementById("autoComplete_container");
    searchContainer.classList.toggle("hidden");

    if (!autoComplete_container.classList.contains("hidden")){
        document.addEventListener("click", hideSearchBar);
        overlay.style.display = "block";
    } else {
        document.removeEventListener("click", hideSearchBar);
        overlay.style.display = "none";
    }
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
      overlay.style.display = "none";
    }


  }

function addManually() {
    addMan_container.classList.remove("hidden");
    autoComplete_container.classList.add("hidden");
}

function closePopUp() {
    addMan_container.classList.add("hidden");
    addExist_container.classList.add("hidden");
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
          <span>
            <img src="https://image.tmdb.org/t/p/original/${data.value.poster_path}" width="100">
          </span>
          <div style="width: 60%; padding-left: 5%; display: flex; align-items: center">
              <span style="align-items: left; ">
                  ${data.match}
              </span>
          </div>`;
          },
          highlight: true
      },

      resultsList: {
        element: (list, data) => {
            // Create "No Results" message list element
            if(!data.results.length) {
                const message = document.document.createElement("div");
                // Add message text content
                message.innerHTML = `<button id = "manualAdd" onclick="addManually()">Add Manually</button>`;
                // Add message list element to the list
                list.appendChild(message);
            }
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

let favMovies = JSON.parse(localStorage.getItem('favMovies'));


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

        // access html form element
        const form = document.getElementById('addExistForm');

        const title = selection.title; 
        const poster = selection.poster_path;
        const synopsis = selection.overview;
        const released = selection.release_date;

        // listen for form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            //get input data
            //store as object
            const rating = document.getElementById('rate_exist').value;
            console.log(rating);
            var movie = {
                title: title,
                poster: poster,
                synopsis: synopsis,
                released: released,
                genre: genre_string,
                rating: rating
            }
            // console.log(JSON.stringify(movie));

            if (favMovies == null) {
                favMovies = [movie]
            } else {
                if (favMovies.find(element =>element.title === movie.title)) {
                    console.log('This movie is already saved')
            } else {
                favMovies.push(movie)
                }
            }

            
            localStorage.setItem('favMovies',JSON.stringify(favMovies));
            console.log(JSON.parse(localStorage.getItem('favMovies')));

            renderSaved();

});

        
    });
    addExist_container.classList.remove("hidden");
})

// set max date as today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("release").setAttribute("max",today);

// save manually
// access html form element
const form = document.getElementById('saveManaullyForm');

//listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    //get input data
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const release = document.getElementById('release').value;
    const rating = document.getElementById('rate_man').value;
    const about = document.getElementById('movieAbout').value;
    const poster = document.getElementById('poster').value;

    const movie = {
        title: title,
        genre: genre,
        release: release,
        rating: rating,
        about: about,
        poster: poster
    }

    if (favMovies == null) {
        favMovies = [movie]
    } else {
        if (favMovies.find(element =>element.title === movie.title)) {
            console.log('This movie is already saved')
    } else {
        favMovies.push(movie)
        }
    }

    console.log(JSON.parse(localStorage.getItem('favMovies')));
    
    // reset input
    // document.getElementById('nameInput').value = '';
    // document.getElementById('messageInput').value = '';

    // console.log('Form data saved to local storage');
    // console.log(formData);
});




