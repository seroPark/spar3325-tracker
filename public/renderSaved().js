function renderSaved() {
    document.querySelector('.grid_container').innerHTML = "";
    let favMovies = JSON.parse(localStorage.getItem('favMovies'));
    console.log(favMovies);
    favMovies.forEach(function (object) {
        let grid_item = document.createElement("div");
        grid_item.classList.add("grid_item");
        grid_item.id = favMovies.indexOf(object);
        grid_item.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${object["poster"]})`;
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
        // let grid_delete = document.querySelector('.delete_button');
        // grid_delete.id = favMovies.indexOf(object);
    
        let grid_container = document.querySelector(".grid_container");
        grid_container.appendChild(grid_item);

        grid_item.addEventListener('click',function() {
            console.log(grid_item.id);
            // console.log((favMovies[grid_item.id]));
            const selectedMovie = favMovies[grid_item.id];
            console.log(selectedMovie);
            

            document.getElementById('info_poster').src = `url(https://image.tmdb.org/t/p/original/${selectedMovie.poster})`;
            document.getElementById('info_title').textContent = selectedMovie.title;
            // console.log(document.getElementById('info_title').textContent);
            document.getElementById('info_genre').textContent = selectedMovie.genre;
            document.getElementById('info_rating').textContent = selectedMovie.rating;
            // document.getElementById('info_release').textContent = selectedMovie.released;
            document.getElementById('info_about').textContent = selectedMovie.synopsis;
            movieInfo_container.classList.remove("hidden");
            overlay.style.display = "block";
        })

        

        //grid_item.addEventListener('click', function() {})
    });
}

renderSaved();
