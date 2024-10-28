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

            const price = (Math.random() * 300 + 55).toFixed(2); // Randomized price since API lacks this field
            document.getElementById("moviePrice").textContent = price;

            document.getElementById("addToCartButton").addEventListener("click", () => {
                // Retrieve the cart from localStorage, or initialize as an empty array
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Check if the movie is already in the cart
                const isInCart = cart.some(item => item.id === movie.id);
                
                if (isInCart) {
                    // Alert the user if the movie is already in the cart
                    alert("This movie is already in your cart.");
                } else {
                    // Add the movie to the cart
                    cart.push({ 
                        id: movie.id, 
                        title: movie.title, 
                        price: price, 
                        poster: movie.medium_cover_image 
                    });

                    // Save the updated cart back to localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.location.href = `checkout.html`;
                }
            });

        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    }
});
