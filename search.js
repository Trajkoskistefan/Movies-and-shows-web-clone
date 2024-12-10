fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

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
