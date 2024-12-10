
async function getEpisodes(showId) {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    const data = await response.json();
    return data;
}

function renderEpisodes(episodes) {
    const episodesContainer = document.getElementById("episodes");
    episodesContainer.innerHTML = '';
    episodes.forEach((episode) => {
        const episodeCard = document.createElement("div");
        episodeCard.classList.add("episode");

        episodeCard.innerHTML = `
            <h3>${episode.name}</h3>
            <img src="${episode.image ? episode.image.medium : 'https://via.placeholder.com/250'}" alt="${episode.name}">
            <p>Season ${episode.season}, Episode ${episode.number}</p>
            <a href="episode.html?id=${episode.id}">View Details</a>
            
        `;

        episodesContainer.appendChild(episodeCard);
    });
}

if (window.location.pathname.includes("episodes.html")) {
    const params = new URLSearchParams(window.location.search);
    const showId = params.get("id");

    if (showId) {
        getEpisodes(showId).then(renderEpisodes);
    } else {
        document.getElementById("episodes").innerHTML = "<p>No show selected.</p>";
    }
}



