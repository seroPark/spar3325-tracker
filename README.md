
# Film Log - Project Overview

Film Log is a web application that allows users to track their media consumption, specifically movies - hence the name Film Log. Users can keep track of the different movies
they have watched, along with detailed information of each movie such as the genres, synopsis, poster image, and release date.

### Features

There are 4 main functions of the application which are the following:

**Adding new movies**

Users can save movies and its information by either manually inputting everything (from the 'title' to the 'synopsis'), or search up a movie which will fetch all the data from an API source, and save automatically.

**Viewing saved movies**

Users can review their saved items and edit (editting is not coded as it is not part of the assignment criteria, but can be in the future)

**Deleting movies**

Users can delete movies from their saved list

**Rating movies**

Users can give a personal rating out of 5 when saving a new movie




## Source References

#### MOVIE API

Movie data (for when users search up and save - not manually) was fetched from an API source by @tarekraafat.

```
https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js

{
    "adult": false,
    "backdrop_path": "/1IM8i8HiomFC4y6NRyBuDrHJWg3.jpg",
    "genre_ids": [12, 10751, 14, 10749],
    "id": 447277,
    "original_language": "en",
    "original_title": "The Little Mermaid",
    "overview": "The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.",
    "popularity": 1482.026,
    "poster_path": "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
    "release_date": "2023-05-18",
    "title": "The Little Mermaid",
    "video": false,
    "vote_average": 6.098,
    "vote_count": 512
}
```

Above is an example of a JSON for The Little Mermaid.

Only the necessary key:value s were extracted from each movie object and saved into the local storage.


#### JS VANILLA

A Javascript vanilla library was used to achieve the auto complete element for when users search for movies.

```
https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js

```

And the css file was downloaded and edited to fit the design style of the web application.


## User Guide

When the website is initially run, there will not be any "movie tiles" as there's no movie data saved in the local storage.

**To add a movie:**

1. Click on the add button (pencil image in the top right corner)

This will open a search bar

2. Start typing the title of the movie you want to add and click on the movie you are after

If the movie you're after does not come up, there is an option to "Add Manually" which should pop up beneath the search bar as a button.

3. Once you've selected a movie, or chose to add manually, a pop up window should open with input fields.

4. Put in all necessary information and 'Save'.

5. If the data has successfully been saved into the local storage, a portrait tile with a movie poster image, title and your rating should be displayed on the main page.

    

**To view a saved movie:**

Tap a movie tile (on the main page, that you saved) you want to view, and a pop up window with all of its information should be displayed. You can also delete the saved item with the 'delete' button on this window.





    
## Development Process

the development process, iterations, and improvements, with a strong emphasis on lessons learned and best practices.

#### Setting Up Code Repository

GitHub was used to set up a code repository as it allows easy version controls