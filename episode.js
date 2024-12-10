async function getEpisodeDetails(episodeId) {
    const response = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
    const data = await response.json();
    return data;
}

function renderEpisodeDetails(episode) {
    const episodeContainer = document.getElementById("episode-details");
    const showUrl = episode._links.show.href;
    const showId = showUrl.split("/").pop();
    episodeContainer.innerHTML = `<div id=card>
        <h2>${episode.name}</h2>
        <p>Season ${episode.season}, Episode ${episode.number}</p>
        <img src="${episode.image ? episode.image.original : 'https://via.placeholder.com/250'}" alt="${episode.name}">
        <span>${episode.summary || "No summary available"}</span>
         <a href="actors.html?id=${showId}">View Cast</a></div>
    `;
}

if (window.location.pathname.includes("episode.html")) {
    const params = new URLSearchParams(window.location.search);
    const episodeId = params.get("id");

    if (episodeId) {
        getEpisodeDetails(episodeId).then(renderEpisodeDetails);
    } else {
        document.getElementById("episode-details").innerHTML = "<p>No episode selected.</p>";
    }
}
