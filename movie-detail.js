// movie-detail.js
const BASE_URL = 'https://yts.mx/api/v2/';

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");

    if (movieId) {
        try {
            const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
            
            const movie = response.data.data.movie;

            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("movieImage").src = movie.large_cover_image;
            document.getElementById("movieSynopsis").textContent = movie.description_full;
            document.getElementById("movieRating").textContent = movie.rating;
            document.getElementById("movieGenres").textContent = movie.genres.join(", ");
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    }
});
