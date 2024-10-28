const BASE_URL = 'https://yts.mx/api/v2/';

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");

    if (movieId) {
        try {
            const response = await axios.get(`${BASE_URL}movie_details.json?movie_id=${movieId}`);
            const movie = response.data.data.movie;

            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("movieImage").src = movie.medium_cover_image;
            document.getElementById("movieSynopsis").textContent = movie.description_full;
            document.getElementById("movieRating").textContent = movie.rating;
            document.getElementById("movieGenres").textContent = movie.genres.join(", ");

            const price = (Math.random() * 300 + 55).toFixed(2); //since api didnt have price , it will be randomized
            document.getElementById("moviePrice").textContent = price;

            document.getElementById("addToCartButton").addEventListener("click", () => {
                const totalPrice = price;

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({ 
                    id: movie.id, 
                    title: movie.title, 
                    price: price, 
                    poster: movie.medium_cover_image 
                });

                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = `checkout.html`;
            });

        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    }
});
