
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

function showOverlay(){
    overlay.style.display = "block";
  }

function askConfirm() {
    var confirmWindow = document.getElementById("askConfirm_container");
    //console.log("cancel?");
    askConfirm_container.classList.remove("hidden");
    showOverlay();
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
    if (searchContainer && !searchContainer.contains(targetElement) && !addButton.contains(targetElement)) {
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




