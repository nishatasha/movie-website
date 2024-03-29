
// app.js
'use strict';

import movies from './movies.js';
import { filterMoviesByTerm, displayMovieDetails } from './utils.js'; // Fix the import path

const searchInput = document.getElementById('searchInput');
const matchedMoviesDisplay = document.querySelector('.search-dialog ul'); // Correct the selection to target the ul inside .search-dialog
const movieContainer = document.querySelector('.selected-movie');
const form = document.getElementById('searchForm'); // Correct the selection to target the form element by id

function searchMovies(searchTerm) {
  return filterMoviesByTerm(movies, searchTerm);
}

function listMovies(input) {
  const searchTerm = input.trim().toLowerCase();

  if (searchTerm.length < 3) {
    matchedMoviesDisplay.innerHTML = '';
    return;
  }

  const matchingMovies = searchMovies(searchTerm);

  matchedMoviesDisplay.innerHTML = '';
  if (matchingMovies.length > 0) {
    matchingMovies.forEach(movie => {
      const newLi = document.createElement('li');
      newLi.textContent = movie.title;
      copyToInputOnClick(newLi);
      matchedMoviesDisplay.appendChild(newLi);
    });
  } else {
    const notFoundLi = document.createElement('li');
    notFoundLi.textContent = 'Movie not found';
    matchedMoviesDisplay.appendChild(notFoundLi);
  }
}

function copyToInputOnClick(element) {
  element.addEventListener('click', () => {
    searchInput.value = element.textContent;
    matchedMoviesDisplay.innerHTML = '';
    getMovie();
  });
}

function getMovie() {
  const movieTitle = searchInput.value.trim().toLowerCase();
  const movieFound = movies.find(movie => movie.title.trim().toLowerCase() === movieTitle);

  if (movieFound) {
    displayMovieDetails(movieFound, movieContainer);
  } else {
    movieContainer.innerHTML = 'Movie not found';
  }
}

searchInput.addEventListener('input', () => listMovies(searchInput.value));
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
});

// Your existing JavaScript

// Add event listener to the search form to toggle the visibility of the search dialogue
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  const searchDialog = document.querySelector('.search-dialog');
  searchDialog.classList.toggle('visible');
});

