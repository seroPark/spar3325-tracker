// The autoComplete.js Engine instance creator 
// from https://tarekraafat.github.io/autoComplete.js/#/
let searchBar = document.querySelector("#autoComplete");
const autoCompleteJS = new autoComplete({
    data: {
        src: async () => {
        try {
            // Loading placeholder text
            document.getElementById("autoComplete").setAttribute("placeholder", "Loading...");
            
            // Get API Data Source
            const source = await fetch("https://api.themoviedb.org/3/search/movie?api_key=5774e26c490bad12ed714f0dba3b87d3");
            const data = await source.json();
            
            // Post Loading placeholder text
            document.getElementById("autoComplete").setAttribute("placeholder", autoCompleteJS.placeHolder);
            
            // Returns obtained data
            return data;
            } catch (error) {
                return error;
            }
        },
        
        cache: true,
    },
    
    placeHolder: "Search Title to Add a Movie",
    
    // Modify Results : Poster and Title in auto complete result list
    resultItem: {
        element: (item, data) => {
        item.style = "display: flex; justify-content: space-between; margin-left: 0;";
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

    // When there is no matching result to what the user searched, it will display a "Add Manually" button
    resultsList: {
    element: (list, data) => {
        // Create "No Results" message list element
        if(!data.results.length) {
            const message = document.createElement("div");
            // Add message text content
            message.innerHTML = `<button id = "manualAdd" onclick="addManually()">Add Manually</button>`;
            // Add message list element to the list
            list.appendChild(message);
        }
    },
    noResults: true,
    maxResults: 10,
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

// When movie is selected using the search bar, movie info is fetched and displayed on popup, and saved into local storage
// Add/Save Automatically
autoCompleteJS.input.addEventListener("selection", function(event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    const selection = feedback.selection.value;

    // Replaces the dummy text placeholders with fetched Poster and Title
    document.querySelector('#addExist_container img').src = `https://image.tmdb.org/t/p/original${selection['poster_path']}`;
    document.querySelector('#addExist_container h2').textContent = `${selection['title']}`;
    // searchbar is hidden, and add movie window is shown
    autoComplete_container.classList.add("hidden");
    overlay.style.display = "block";

    // Required Data is extracted from API source and saved into local storage
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

        // Access html form element
        const form = document.getElementById('addExistForm');

        const title = selection.title; 
        const poster = 'https://image.tmdb.org/t/p/original/' + selection.poster_path;
        const synopsis = selection.overview;
        const released = selection.release_date;

        // listen for form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            //Get input data
            //Store as object
            const rating = document.getElementById('rate_exist').value;
            var movie = {
                title: title,
                poster: poster,
                synopsis: synopsis,
                added: today,
                released: released,
                genre: genre_string,
                rating: rating
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

            
            localStorage.setItem('favMovies',JSON.stringify(favMovies));
            console.log(JSON.parse(localStorage.getItem('favMovies')));

            renderSaved();
            overlay.style.display = "none";
        });
    });
    addExist_container.classList.remove("hidden");
})