// Displays saved movie data in local storage as movie info window

function renderSaved() {
    document.querySelector('.grid_container').innerHTML = "";
    let favMovies = JSON.parse(localStorage.getItem('favMovies'));
    console.log(favMovies);
    favMovies.forEach(function (object) {
        // Creates html elements and adds class and style to use for editing later
        let grid_item = document.createElement("div");
        grid_item.classList.add("grid_item");
        grid_item.id = favMovies.indexOf(object); // gives each grid item a unique id so that specific movie data/item can be called to show info or delete
        grid_item.style.backgroundImage = `url(${object["poster"]})`;
        let movieTile_content = document.createElement("div");
        movieTile_content.classList.add("movieTile_content")
        let movieTile =  document.createElement("h4");
        movieTile.classList.add("movieTile");
        movieTile.innerHTML = object["title"];
        let movieTileRate =  document.createElement("p");
        movieTileRate.classList.add("movieTile");
        movieTileRate.innerHTML = object["rating"];
        movieTile_content.appendChild(movieTile);
        movieTile_content.appendChild(movieTileRate);
        grid_item.appendChild(movieTile_content);
    
        let grid_container = document.querySelector(".grid_container");
        grid_container.appendChild(grid_item);

        grid_item.addEventListener('click',function() {
            const id = grid_item.id;
            // console.log((favMovies[grid_item.id]));
            const selectedMovie = favMovies[id];
            console.log(selectedMovie);
            
            // Edit content by fetching the movie data
            document.getElementById('info_poster').src = selectedMovie.poster;
            document.getElementById('info_title').textContent = selectedMovie.title;
            document.getElementById('info_genre').textContent = selectedMovie.genre;
            document.getElementById('info_rating').textContent = selectedMovie.rating;
            document.getElementById('info_about').textContent = selectedMovie.synopsis;
            document.getElementById('info_released').textContent = selectedMovie.released;
            document.getElementById('info_added').textContent = selectedMovie.added;
            movieInfo_container.classList.remove("hidden");
            overlay.style.display = "block";
            document.querySelector(".delete_button").addEventListener('click', function() {
                favMovies.splice(id, 1);
                localStorage.setItem('favMovies',JSON.stringify(favMovies));
                JSON.parse(localStorage.getItem('favMovies'));

                renderSaved();
            })
        })
    });
}

renderSaved();
