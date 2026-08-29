// ================================
// GALOULOU TOOLBOX - SCRIPT.JS
// ================================


// ================================
// SELECT ELEMENTS
// ================================

const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");

const themeToggle = document.getElementById("themeToggle");

const favoriteButtons = document.querySelectorAll(".favorite");
const favoritesButton = document.getElementById("favoritesButton");


// ================================
// SEARCH TOOLS
// ================================

function searchTools() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let visibleTools = 0;

    toolCards.forEach((tool) => {

        // Ignore Coming Soon tools for search
        if (tool.classList.contains("coming-soon")) {
            return;
        }

        const toolName = tool.dataset.name || "";

        if (toolName.includes(searchValue)) {

            tool.style.display = "";
            visibleTools++;

        } else {

            tool.style.display = "none";

        }

    });


    // Show / hide "No results"
    if (searchValue !== "" && visibleTools === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchInput.addEventListener("input", searchTools);


// ================================
// CTRL + K SEARCH SHORTCUT
// ================================

document.addEventListener("keydown", (event) => {

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {

        event.preventDefault();

        searchInput.focus();

    }

});


// ================================
// THEME SYSTEM
// ================================

// Get saved theme
const savedTheme = localStorage.getItem("theme");


// Apply saved theme
if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML = `
        <i class="fa-solid fa-sun"></i>
    `;

} else {

    themeToggle.innerHTML = `
        <i class="fa-solid fa-moon"></i>
    `;

}


// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");


    // Check current theme
    const isLightMode = document.body.classList.contains("light-mode");


    if (isLightMode) {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML = `
            <i class="fa-solid fa-sun"></i>
        `;

    } else {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML = `
            <i class="fa-solid fa-moon"></i>
        `;

    }

});


// ================================
// FAVORITES SYSTEM
// ================================

// Get favorites from localStorage
let favorites = JSON.parse(
    localStorage.getItem("favorites")
) || [];


// Update favorite buttons
function updateFavoriteButtons() {

    favoriteButtons.forEach((button) => {

        const toolName = button.dataset.tool;

        const icon = button.querySelector("i");


        if (favorites.includes(toolName)) {

            button.classList.add("active");

            icon.className = "fa-solid fa-heart";

        } else {

            button.classList.remove("active");

            icon.className = "fa-regular fa-heart";

        }

    });

}


// Add / remove favorites
favoriteButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        // Prevent opening the tool link
        event.preventDefault();

        event.stopPropagation();


        const toolName = button.dataset.tool;


        if (favorites.includes(toolName)) {

            // Remove favorite
            favorites = favorites.filter(
                (favorite) => favorite !== toolName
            );

        } else {

            // Add favorite
            favorites.push(toolName);

        }


        // Save favorites
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        // Update icons
        updateFavoriteButtons();

    });

});


// Load favorites on startup
updateFavoriteButtons();


// ================================
// SHOW FAVORITES
// ================================

let showingFavorites = false;


favoritesButton.addEventListener("click", () => {

    showingFavorites = !showingFavorites;


    toolCards.forEach((tool) => {

        // Ignore Coming Soon tools
        if (tool.classList.contains("coming-soon")) {
            return;
        }


        const favoriteButton = tool.querySelector(".favorite");


        if (!favoriteButton) {
            return;
        }


        const toolName = favoriteButton.dataset.tool;


        if (showingFavorites) {

            if (favorites.includes(toolName)) {

                tool.style.display = "";

            } else {

                tool.style.display = "none";

            }

        } else {

            tool.style.display = "";

        }

    });


    // Change button text
    if (showingFavorites) {

        favoritesButton.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            Showing Favorites
        `;

    } else {

        favoritesButton.innerHTML = `
            <i class="fa-regular fa-heart"></i>
            Favorites
        `;

    }

});


// ================================
// CONSOLE MESSAGE 😎
// ================================

console.log(
    "%c🧰 Welcome to Galoulou Toolbox!",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cSimple tools. One place.",
    "font-size: 14px;"
);
