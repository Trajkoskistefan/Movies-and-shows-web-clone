async function getShows() {
  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();
  return data;
}

const moviesContainer = document.getElementById("show");

function renderShows(shows) {
  moviesContainer.innerHTML = '';
  shows.forEach((show) => {
      const showCard = document.createElement("div");
      showCard.classList.add("news");

      showCard.innerHTML = `
          <h2>${show.name}</h2>
          <img class="imgs" src="${show.image ? show.image.medium : 'https://via.placeholder.com/250'}" alt="${show.name}">
          <p>Rating: ${show.rating.average || "N/A"}</p>
          <p>${show.summary ? show.summary.substring(0, 200) + "..." : "No summary available"}</p>
          <a href="episodes.html?id=${show.id}">View Episodes</a>
      `;

      moviesContainer.appendChild(showCard);
  });
}


function handleSearch() {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");

  if (searchTerm) {
      getShows().then((shows) => {
          const filteredShows = shows.filter((show) =>
              show.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          renderShows(filteredShows);
      });
  } else {
      getShows().then(renderShows);
  }
}

handleSearch();
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Add event listeners after the header has been loaded
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".butn");

        searchButton.addEventListener("click", () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });

        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                searchButton.click();
            }
        });
    });
