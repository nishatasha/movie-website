'use strict';

import movies from './movies.js'; // Import the movies data
import { filterMoviesByTerm, displayMovieDetails } from './utils.js'; // Import utility functions

const searchInput = document.getElementById('searchInput');
const matchedMoviesDisplay = document.querySelector('.search-dialog ul'); // Correct the selection to target the ul inside .search-dialog
const movieContainer = document.querySelector('.selected-movie');
const searchForm = document.getElementById('searchForm'); // Get the search form element
const createButton = document.querySelector('.create'); // Get the create button element

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
    // Show the matched movies display
    matchedMoviesDisplay.parentElement.classList.add('visible');
    
  } else {
    const notFoundLi = document.createElement('li');
    notFoundLi.textContent = 'Movie not found';
    matchedMoviesDisplay.appendChild(notFoundLi);
    // Hide the matched movies display if no movies found
    matchedMoviesDisplay.parentElement.classList.remove('visible');
  }
}

function copyToInputOnClick(element) {
  element.addEventListener('click', () => {
    searchInput.value = element.textContent;
    matchedMoviesDisplay.innerHTML = '';
    
  });
}

function getMovie() {
  const movieTitle = searchInput.value.trim().toLowerCase();
  const movieFound = movies.find(movie => movie.title.trim().toLowerCase() === movieTitle);

  if (movieFound) {
    displayMovieDetails(movieFound, movieContainer);
    searchInput.value = ''; // Clear the input text
  } else {
    movieContainer.innerHTML = 'Movie not found';
  }
}

// Event listener for input changes
searchInput.addEventListener('input', () => listMovies(searchInput.value));

// Event listener for create button click
createButton.addEventListener('click', () => {
  // Get movie details when the create button is clicked
  getMovie();
});

// Prevent default form submission behavior
searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

// Add event listener to the search form to toggle the visibility of the search dialogue
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  const searchDialog = document.querySelector('.search-dialog');
  searchDialog.classList.toggle('visible');
});

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchDialog = document.querySelector('.search-dialog');
  
  // Function to set the width of search dialog to match input
  const setDialogWidth = () => {
    const inputWidth = searchInput.offsetWidth;
    searchDialog.style.width = inputWidth + 'px';
  };

  // Call the function initially and on window resize
  setDialogWidth();
  window.addEventListener('resize', setDialogWidth);
});

