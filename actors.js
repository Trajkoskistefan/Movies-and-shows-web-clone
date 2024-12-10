async function getActors(showId) {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/cast`);
    const data = await response.json();
    return data;
}

function renderActors(actors) {
    const actorsContainer = document.getElementById("actors");
    actorsContainer.innerHTML = '';

    if (actors.length === 0) {
        actorsContainer.innerHTML = '<p>No actors available for this show.</p>';
        return;
    }

    actors.forEach((actor) => {
        const actorCard = document.createElement("div");
        actorCard.classList.add("actor-card");

        actorCard.innerHTML = `
            <h3>${actor.person.name}</h3>
            <img src="${actor.person.image ? actor.person.image.medium : 'https://via.placeholder.com/250'}" alt="${actor.person.name}">
            <p>Character: ${actor.character.name}</p>
        `;

        actorsContainer.appendChild(actorCard);
    });
}

if (window.location.pathname.includes("actors.html")) {
    const params = new URLSearchParams(window.location.search);
    const showId = params.get("id");

    if (showId) {
        getActors(showId).then(renderActors).catch(error => {
            console.error("Error fetching actors:", error);
            document.getElementById("actors").innerHTML = "<p>Failed to load actors.</p>";
        });
    } else {
        document.getElementById("actors").innerHTML = "<p>No show selected.</p>";
    }
}
