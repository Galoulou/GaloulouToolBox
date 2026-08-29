// =========================================
// GALOULOU TOOLBOX
// MAIN SCRIPT
// =========================================


// =========================================
// SELECT ELEMENTS
// =========================================

const searchInput = document.getElementById("searchInput");

const toolCards = document.querySelectorAll(".tool-card");

const noResults = document.getElementById("noResults");

const toolsCount = document.getElementById("toolsCount");

const themeToggle = document.getElementById("themeToggle");

const favoriteButtons = document.querySelectorAll(".favorite");


// =========================================
// SEARCH TOOLS
// =========================================

function searchTools() {

    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();


    let visibleTools = 0;


    toolCards.forEach((tool) => {

        const toolName =
            tool.dataset.name || "";


        // Check if the search matches

        if (toolName.includes(searchValue)) {

            tool.style.display = "";

            visibleTools++;

        } else {

            tool.style.display = "none";

        }

    });


    // Update tools counter

    if (searchValue === "") {

        toolsCount.textContent =
            `${toolCards.length} tools`;

    } else {

        toolsCount.textContent =
            `${visibleTools} found`;

    }


    // Show "No results"

    if (visibleTools === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// Listen for search

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchTools
    );

}


// =========================================
// CTRL + K
// SEARCH SHORTCUT
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


// =========================================
// ESCAPE
// CLEAR SEARCH
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            searchTools();

            searchInput.blur();

        }

    }
);


// =========================================
// THEME SYSTEM
// =========================================


// Get saved theme

const savedTheme =
    localStorage.getItem("theme");


// Apply theme

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

        themeToggle.innerHTML = `
            <i class="fa-solid fa-sun"></i>
        `;

    } else {

        document.body.classList.remove("light-mode");

        themeToggle.innerHTML = `
            <i class="fa-solid fa-moon"></i>
        `;

    }

}


// Load saved theme

if (savedTheme === "light") {

    applyTheme("light");

} else {

    applyTheme("dark");

}


// Toggle theme

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLightMode =
                document.body.classList.contains(
                    "light-mode"
                );


            if (isLightMode) {

                applyTheme("dark");

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            } else {

                applyTheme("light");

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


// =========================================
// FAVORITES SYSTEM
// =========================================


// Get favorites from localStorage

let favorites;

try {

    favorites = JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

} catch {

    favorites = [];

}


// =========================================
// UPDATE FAVORITE BUTTONS
// =========================================

function updateFavoriteButtons() {

    favoriteButtons.forEach((button) => {

        const toolName =
            button.dataset.tool;


        const icon =
            button.querySelector("i");


        if (
            favorites.includes(toolName)
        ) {

            button.classList.add("active");

            icon.className =
                "fa-solid fa-heart";


        } else {

            button.classList.remove("active");

            icon.className =
                "fa-regular fa-heart";

        }

    });

}


// =========================================
// SAVE FAVORITES
// =========================================

function saveFavorites() {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}


// =========================================
// TOGGLE FAVORITE
// =========================================

favoriteButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            // Prevent opening the tool

            event.preventDefault();

            event.stopPropagation();


            const toolName =
                button.dataset.tool;


            // Remove favorite

            if (
                favorites.includes(toolName)
            ) {

                favorites =
                    favorites.filter(
                        (favorite) =>
                            favorite !== toolName
                    );


            // Add favorite

            } else {

                favorites.push(toolName);

            }


            // Save

            saveFavorites();


            // Update UI

            updateFavoriteButtons();

        }
    );

});


// Load favorites

updateFavoriteButtons();


// =========================================
// FAVORITE ANIMATION
// =========================================

favoriteButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            button.animate(

                [

                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(1.25)"
                    },

                    {
                        transform: "scale(1)"
                    }

                ],

                {

                    duration: 250,

                    easing: "ease-out"

                }

            );

        }
    );

});


// =========================================
// CARD KEYBOARD ACCESSIBILITY
// =========================================

toolCards.forEach((tool) => {

    tool.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter"
            ) {

                tool.click();

            }

        }
    );

});


// =========================================
// SMOOTH NAVIGATION
// =========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });


// =========================================
// CONSOLE MESSAGE 😎
// =========================================

console.log(
    "%c🧰 Welcome to Galoulou Toolbox!",
    "font-size: 20px; font-weight: bold;"
);


console.log(
    "%cSimple tools. One place.",
    "font-size: 14px;"
);


console.log(
    "%cMade with HTML, CSS & JavaScript.",
    "font-size: 12px;"
);
