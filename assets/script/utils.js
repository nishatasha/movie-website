'use strict';

// Utility function to filter movies based on search term
export function filterMoviesByTerm(movies, searchTerm) {
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Utility function to display details of the selected movie
export function displayMovieDetails(selectedMovie, container) {
  container.innerHTML = `
    <div class="selected-movie-poster">
      <img src="${selectedMovie.poster}" alt="${selectedMovie.title}">
    </div>
    <div class="selected-movie-details">
      <h2>${selectedMovie.title} (${selectedMovie.year})</h2>
      <div class="year-running-time">
      <p> ${selectedMovie.year}</p>
      <span class="dot"></span>
      <p> ${selectedMovie.runningTime}</p>
      </div>
      <p>${selectedMovie.description}</p>
    <p> ${selectedMovie.genre.map(genre => `<span class="genre">${genre}</span>`).join('')}</p>
    </div>
  `;
}
