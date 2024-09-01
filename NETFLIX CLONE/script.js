const api = "api_key=1adec1a78e9ba33298ea25f3b4150365";

const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";

const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanticMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function createRow(data, titleText, className) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row " + className;

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = titleText;
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);

    data.results.forEach((movie) => {
        if (movie.backdrop_path) {
            const poster = document.createElement("img");
            poster.className = className === "netflixrow" ? "row_posterLarge" : "row_poster";
            poster.id = movie.id;
            poster.src = img_url + movie.backdrop_path;
            row_posters.appendChild(poster);
        }
    });

    headrow.appendChild(row);
}

fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner_title");
        var banner_desc = document.getElementById("banner_description");

        if (setMovie.backdrop_path) {
            banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
            banner_desc.innerText = truncate(setMovie.overview, 150);
            banner_title.innerText = setMovie.name || setMovie.title || setMovie.original_name;
        } else {
            console.log('No backdrop path found for selected movie.');
        }
    })
    .catch(error => console.error("Error fetching Netflix Originals:", error));

fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => createRow(data, "Netflix Originals", "netflixrow"))
    .catch(error => console.error("Error fetching Netflix Originals row:", error));

fetch(requests.fetchTrending)
    .then((res) => res.json())
    .then((data) => createRow(data, "Top Rated", ""))
    .catch(error => console.error("Error fetching Trending row:", error));

fetch(requests.fetchActionMovies)
    .then((res) => res.json())
    .then((data) => createRow(data, "Action Movies", ""))
    .catch(error => console.error("Error fetching Action Movies row:", error));

fetch(requests.fetchComedyMovies)
    .then((res) => res.json())
    .then((data) => createRow(data, "Comedy Movies", ""))
    .catch(error => console.error("Error fetching Comedy Movies row:", error));

fetch(requests.fetchHorrorMovies)
    .then((res) => res.json())
    .then((data) => createRow(data, "Horror Movies", ""))
    .catch(error => console.error("Error fetching Horror Movies row:", error));

fetch(requests.fetchRomanticMovies)
    .then((res) => res.json())
    .then((data) => createRow(data, "Romantic Movies", ""))
    .catch(error => console.error("Error fetching Romantic Movies row:", error));

fetch(requests.fetchDocumentaries)
    .then((res) => res.json())
    .then((data) => createRow(data, "Documentaries", ""))
    .catch(error => console.error("Error fetching Documentaries row:", error));
