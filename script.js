const BASE_URL = 'https://yts.mx/api/v2/';

// Function to fetch movies from the API
async function fetchMovies(url) {
    try {
        const response = await axios.get(url);
        return response.data.data.movies; // Return the movies array
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}
async function searchMovies(query) {
    try {
        const response = await axios.get(`${BASE_URL}list_movies.json?query_term=${query}`);
        return response.data.data.movies; // Return the movie array
    } catch (error) {
        console.error("Error searching movies:", error);
        return []; // Return an empty array in case of an error
    }
}

async function filterMovies() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';

    if (searchInput) {
        const filteredMovies = await searchMovies(searchInput);

        if (filteredMovies && filteredMovies.length > 0) {
            dropdown.style.display = 'block';
            filteredMovies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('dropdown-item');
                movieItem.innerHTML = `
                    <img src="${movie.medium_cover_image}" alt="${movie.title}">
                    <span>${movie.title}</span>
                `;

                // Use addEventListener to handle redirection
                movieItem.addEventListener('click', () => {
                    window.location.href = `movie-details.html?movieId=${movie.id}`; // Redirect to movie details page
                });

                dropdown.appendChild(movieItem);
            });
        } else {
            dropdown.style.display = 'none';
            // Optionally display a message for no results
        }
    } else {
        dropdown.style.display = 'none';
    }
}


// Initialize the movie fetching and search functionality
fetchMovies();
document.getElementById('searchInput').addEventListener('input', filterMovies);



// Function to display movies
function displayMovies(movieArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear container before adding new items

    if (!movieArray || movieArray.length === 0) {
        container.innerHTML = '<li>No results found</li>'; // Show no results message
        return;
    }

    // Limit to the first 8 movies
    const limitedMovies = movieArray.slice(0, 8);

    limitedMovies.forEach(movie => {
        const movieItem = `
        <div class="m1">
            <div class="m2">
                <a href="movie-details.html?movieId=${movie.id}">
                    <img src="${movie.medium_cover_image}" alt="${movie.title}">
                    <div class="movie-details">
                        <p>Rating: ${movie.rating}</p>
                        <p>Genre: ${movie.genres.join(', ')}</p>
                        <button class="button" onclick="loadMovieDetails(${movie.id})">View Details</button>
                    </div>
                </a>
            </div>
            <h3>${movie.title}</h3>
            <p class="release-date" style="color:grey">${movie.year}</p>
        </div>
        `;
        container.innerHTML += movieItem;
    });
}


// Function to load movie details with error handling
function loadMovieDetails(movieId) {
    if (movieId) {
        window.location.href = `movie-details.html?movieId=${movieId}`;
    } else {
        console.error("Invalid movie ID");
    }
}

// Display popular movies on page load
async function displayPopularMovies() {
    const popularMovies = await fetchMovies(`${BASE_URL}list_movies.json?sort_by=downloads&order_by=desc`);
    displayMovies(popularMovies, 'popularMovies');
}

// Display latest movies on page load
async function displayLatestMovies() {
    const latestMovies = await fetchMovies(`${BASE_URL}list_movies.json?sort_by=year&order_by=desc`);
    displayMovies(latestMovies, 'latestMovies');
}

// Display upcoming movies on page load
async function displayUpcomingMovies() {
    const upcomingMovies = await fetchMovies(`${BASE_URL}list_movies.json?sort_by=year&order_by=asc`);
    displayMovies(upcomingMovies, 'upcomingMovies');
}

// Initial display of movies
async function initializeMovieDisplays() {
    await Promise.all([
        displayPopularMovies(),
        displayLatestMovies(),
        displayUpcomingMovies()
    ]);
}

// Run on page load
window.onload = initializeMovieDisplays;
