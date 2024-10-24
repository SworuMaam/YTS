const popularMovies = [
    { title: "The Kite Runner", releaseDate: "2007", imageSrc: "../Clone-Website/media/kite-runner.jpg", rating: "8.2", genre: "Drama" },
    { title: "Zodiac", releaseDate: "2017", imageSrc: "../Clone-Website/media/zodiac.jfif", rating: "7.7", genre: "Thriller" },
    { title: "Hannibal", releaseDate: "2010", imageSrc: "../Clone-Website/media/hannibal.jfif", rating: "8.6", genre: "Thriller" },
    { title: "The Pale Blue Eyes", releaseDate: "2011", imageSrc: "../Clone-Website/media/pale-blue.jpg", rating: "6.8", genre: "Mystery" },
    { title: "Psycho", releaseDate: "1960", imageSrc: "../Clone-Website/media/psycho.jpg", rating: "9", genre: "Mystery, Thrille" }

];

const latestMovies = [
    { title: "Fall Guy", releaseDate: "2024", imageSrc: "../Clone-Website/media/fall-guy.jfif", rating: "7.5", genre: "Action" },
    { title: "The Union", releaseDate: "2024", imageSrc: "../Clone-Website/media/union.jpg", rating: "6", genre: "Drama" },
    { title: "Jackpot!", releaseDate: "2024", imageSrc: "../Clone-Website/media/jackpot.jfif", rating: "5.2", genre: "Comedy" },
    { title: "Abigail", releaseDate: "2024", imageSrc: "../Clone-Website/media/abigail.jpg", rating: "6.2", genre: "Fantasy" },
    { title: "Madame Web", releaseDate: "2023", imageSrc: "../Clone-Website/media/madame.jfif", rating: "4.2", genre: "Science Fiction" }

];

const upcomingMovies = [
    { title: "Avatar: Fire and Ash", releaseDate: "2025", imageSrc: "../Clone-Website/media/avatar.jpg", rating: "N/A", genre: "Sci-Fi" },
    { title: "Thunderbolts", releaseDate: "2025", imageSrc: "../Clone-Website/media/thunderbolts.jfif", rating: "N/A", genre: "Action" },
    { title: "F1", releaseDate: "2025", imageSrc: "../Clone-Website/media/f1.webp", rating: "N/A", genre: "Action" },
    { title: "Tron: Ares", releaseDate: "2025", imageSrc: "../Clone-Website/media/tron.jfif", rating: "N/A", genre: "Sci-Fi" },
    { title: "Shrek 5", releaseDate: "2026", imageSrc: "../Clone-Website/media/shrek.png", rating: "N/A", genre: "Animation" }

];

//all arrays combined together
const allMovies = [...popularMovies, ...latestMovies, ...upcomingMovies]; //...=spread operator

function displayMovies(movieArray, containerId) {//movieArray=new array for the categories , containerID= ID of html
    const container = document.getElementById(containerId);
    movieArray.forEach(movie => {const movieItem = ` 
        <div class="m1">
                <div class="m2">
                <a href="#">
                    <img src="${movie.imageSrc}" alt="${movie.title}">
                    <div class="movie-details">
                        <p>Rating: ${movie.rating}</p>
                        <p>Genre: ${movie.genre}</p>
                        <a href="#button"><button class="button">View Details</button></a>
                    </div>
                </a>
                </div>
                <h3>${movie.title}</h3>
                <p class="release-date" style="color:grey">${movie.releaseDate}</p>
            </div>
        `; //``= necessary for html codes?
        container.innerHTML += movieItem;
    });
}

function searchMovies() {
    const input = document.querySelector('.search-input');
    const filter = input.value.toLowerCase();
    const dropdownResults = document.getElementById('dropdownResults');
    
    dropdownResults.innerHTML = ''; //clears the previous parts
    
    if (filter) {
        const filteredMovies = popularMovies.filter(movie => 
            movie.title.toLowerCase().includes(filter)
        );

        if (filteredMovies.length > 0) {
            dropdownResults.style.display = 'block';
            filteredMovies.forEach(movie => {
                const listItem = `
                    <li>
                        <img src="${movie.imageSrc}" alt="${movie.title}" style="width: 30px; height: auto; margin-right: 8px; vertical-align: middle;">
                        ${movie.title}<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        <span class="year">${movie.releaseDate}</span>
                    </li>
                `;
                dropdownResults.innerHTML += listItem;
            });
        } else {
            dropdownResults.style.display = 'none'; 
        }
    } else {
        dropdownResults.style.display = 'none'; 
    }
}

displayMovies(popularMovies, 'popularMovies');
displayMovies(latestMovies, 'latestMovies');
displayMovies(upcomingMovies, 'upcomingMovies');
