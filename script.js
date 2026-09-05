```javascript
// ==========================================
// GALOULOU TOOLBOX
// MAIN SCRIPT
// ==========================================


// ==========================================
// TOOLS DATABASE
// ==========================================

const tools = [

    {
        id: "galoulou-ai",
        name: "Galoulou AI",
        description: "Your smart AI shopping assistant.",
        icon: "fa-wand-magic-sparkles",
        category: "AI",
        link: "tools/galoulou-ai.html"
    },

    {
        id: "password",
        name: "Password Generator",
        description: "Create strong and secure passwords instantly.",
        icon: "fa-key",
        category: "Security",
        link: "tools/password.html"
    },

    {
        id: "qr-code",
        name: "QR Code Generator",
        description: "Create QR codes from links or text.",
        icon: "fa-qrcode",
        category: "Everyday",
        link: "tools/qr-code.html"
    },

    {
        id: "timer",
        name: "Timer",
        description: "Use a countdown or stopwatch.",
        icon: "fa-clock",
        category: "Productivity",
        link: "tools/timer.html"
    },

    {
        id: "quick-notes",
        name: "Quick Notes",
        description: "Write and save notes directly in your browser.",
        icon: "fa-note-sticky",
        category: "Productivity",
        link: "tools/quick-notes.html"
    },

    {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick colors and copy their HEX values.",
        icon: "fa-eye-dropper",
        category: "Creative",
        link: "tools/color-picker.html"
    },

    {
        id: "todo",
        name: "To-Do List",
        description: "Organize your tasks and stay productive.",
        icon: "fa-list-check",
        category: "Productivity",
        link: "tools/todo.html"
    },

    {
        id: "calculator",
        name: "Calculator",
        description: "A fast and simple everyday calculator.",
        icon: "fa-calculator",
        category: "Everyday",
        link: "tools/calculator.html"
    },

    {
        id: "pomodoro",
        name: "Pomodoro",
        description: "Focus with customizable work sessions.",
        icon: "fa-stopwatch",
        category: "Productivity",
        link: "tools/pomodoro.html"
    },

    {
        id: "converter",
        name: "Unit Converter",
        description: "Convert length, weight, temperature and more.",
        icon: "fa-arrows-rotate",
        category: "Converters",
        link: "tools/converter.html"
    },

    {
        id: "percentage",
        name: "Percentage Calculator",
        description: "Calculate percentages quickly.",
        icon: "fa-percent",
        category: "Calculators",
        link: "tools/percentage.html"
    },

    {
        id: "text-counter",
        name: "Text Counter",
        description: "Count words, characters and lines.",
        icon: "fa-font",
        category: "Text",
        link: "tools/text-counter.html"
    },

    {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text to upper, lower and other cases.",
        icon: "fa-text-height",
        category: "Text",
        link: "tools/case-converter.html"
    },

    {
        id: "date-calculator",
        name: "Date Calculator",
        description: "Calculate dates and time differences.",
        icon: "fa-calendar-days",
        category: "Calculators",
        link: "tools/date-calculator.html"
    },

    {
        id: "random-generator",
        name: "Random Generator",
        description: "Generate random numbers, choices and values.",
        icon: "fa-dice",
        category: "Everyday",
        link: "tools/random-generator.html"
    },

    {
        id: "color-palette",
        name: "Color Palette",
        description: "Create beautiful color combinations.",
        icon: "fa-palette",
        category: "Creative",
        link: "tools/color-palette.html"
    },

    {
        id: "image-resizer",
        name: "Image Resizer",
        description: "Resize images directly in your browser.",
        icon: "fa-expand",
        category: "Images",
        link: "tools/image-resizer.html"
    },

    {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Reduce image file size quickly.",
        icon: "fa-compress",
        category: "Images",
        link: "tools/image-compressor.html"
    },

    {
        id: "base64",
        name: "Base64 Encoder",
        description: "Encode and decode Base64 text.",
        icon: "fa-code",
        category: "Developer",
        link: "tools/base64.html"
    },

    {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode and decode URLs instantly.",
        icon: "fa-link",
        category: "Developer",
        link: "tools/url-encoder.html"
    }

];


// ==========================================
// ELEMENTS
// ==========================================

const toolsGrid =
    document.getElementById("toolsGrid");

const recentGrid =
    document.getElementById("recentGrid");

const recentSection =
    document.getElementById("recentSection");

const searchInput =
    document.getElementById("searchInput");

const toolsCount =
    document.getElementById("toolsCount");

const noResults =
    document.getElementById("noResults");

const categoriesContainer =
    document.getElementById("categories");

const themeToggle =
    document.getElementById("themeToggle");


// ==========================================
// STORAGE
// ==========================================

let favorites =
    JSON.parse(
        localStorage.getItem("galoulou_favorites") || "[]"
    );

let recent =
    JSON.parse(
        localStorage.getItem("galoulou_recent") || "[]"
    );


// ==========================================
// CATEGORIES
// ==========================================

const categories = [
    "All",
    "AI",
    "Productivity",
    "Everyday",
    "Security",
    "Converters",
    "Calculators",
    "Text",
    "Creative",
    "Images",
    "Developer"
];

let activeCategory = "All";


// ==========================================
// CREATE CATEGORY BUTTONS
// ==========================================

function renderCategories() {

    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.className = "category-button";

        if (category === activeCategory) {

            button.classList.add("active");

        }

        button.textContent = category;

        button.addEventListener("click", () => {

            activeCategory = category;

            renderCategories();

            renderTools();

        });

        categoriesContainer.appendChild(button);

    });

}


// ==========================================
// TOOL CARD
// ==========================================

function createToolCard(tool) {

    const card =
        document.createElement("a");

    card.href = tool.link;

    card.className = "tool-card";

    if (tool.id === "galoulou-ai") {

        card.classList.add("featured-tool");

    }

    card.dataset.name =
        (
            tool.name +
            " " +
            tool.description +
            " " +
            tool.category
        ).toLowerCase();


    const isFavorite =
        favorites.includes(tool.id);


    card.innerHTML = `

        <div class="tool-card-top">

            <div class="tool-icon">

                <i class="fa-solid ${tool.icon}"></i>

            </div>


            <button
                class="favorite ${isFavorite ? "active" : ""}"
                data-tool="${tool.id}"
                aria-label="Favorite ${tool.name}"
            >

                <i class="${
                    isFavorite
                    ? "fa-solid"
                    : "fa-regular"
                } fa-heart"></i>

            </button>

        </div>


        <div class="tool-content">

            <h3>
                ${tool.name}
            </h3>

            <p>
                ${tool.description}
            </p>

        </div>


        <div class="tool-footer">

            <span class="tool-category">

                ${tool.category}

            </span>


            <span class="open-tool">

                Open

                <i class="fa-solid fa-arrow-right"></i>

            </span>

        </div>

    `;


    // FAVORITE BUTTON

    const favoriteButton =
        card.querySelector(".favorite");

    if (favoriteButton) {

        favoriteButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                toggleFavorite(tool.id);

            }
        );

    }


    // RECENTLY USED

    card.addEventListener("click", () => {

        addRecent(tool.id);

    });


    return card;

}


// ==========================================
// RENDER TOOLS
// ==========================================

function renderTools() {

    if (!toolsGrid) return;


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    toolsGrid.innerHTML = "";


    const filtered =
        tools.filter(tool => {

            const matchesSearch =
                (
                    tool.name +
                    " " +
                    tool.description +
                    " " +
                    tool.category
                )
                .toLowerCase()
                .includes(search);


            const matchesCategory =
                activeCategory === "All" ||
                tool.category === activeCategory;


            return matchesSearch && matchesCategory;

        });


    filtered.forEach(tool => {

        toolsGrid.appendChild(
            createToolCard(tool)
        );

    });


    if (toolsCount) {

        toolsCount.textContent =
            search || activeCategory !== "All"
                ? `${filtered.length} found`
                : `${tools.length} tools`;

    }


    if (noResults) {

        if (filtered.length === 0) {

            noResults.classList.remove("hidden");

        } else {

            noResults.classList.add("hidden");

        }

    }

}


// ==========================================
// FAVORITES
// ==========================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "galoulou_favorites",
        JSON.stringify(favorites)
    );


    renderTools();

}


// ==========================================
// RECENT TOOLS
// ==========================================

function addRecent(id) {

    recent =
        recent.filter(
            item => item !== id
        );


    recent.unshift(id);


    recent =
        recent.slice(0, 4);


    localStorage.setItem(
        "galoulou_recent",
        JSON.stringify(recent)
    );


    renderRecent();

}


// ==========================================
// RENDER RECENT
// ==========================================

function renderRecent() {

    if (!recentSection || !recentGrid) return;


    if (recent.length === 0) {

        recentSection.classList.add("hidden");

        return;

    }


    recentSection.classList.remove("hidden");

    recentGrid.innerHTML = "";


    recent.forEach(id => {

        const tool =
            tools.find(
                item => item.id === id
            );


        if (tool) {

            recentGrid.appendChild(
                createToolCard(tool)
            );

        }

    });

}


// ==========================================
// SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderTools
    );

}


// ==========================================
// CTRL + K
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

            }

        }

    }
);


// ==========================================
// ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            searchInput &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            renderTools();

            searchInput.blur();

        }

    }
);


// ==========================================
// THEME
// ==========================================

function applyTheme(theme) {

    if (!themeToggle) return;


    if (theme === "light") {

        document.body.classList.add("light-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        document.body.classList.remove("light-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}


const savedTheme =
    localStorage.getItem("galoulou_theme") || "dark";


applyTheme(savedTheme);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            const newTheme =
                isLight ? "dark" : "light";


            localStorage.setItem(
                "galoulou_theme",
                newTheme
            );


            applyTheme(newTheme);

        }
    );

}


// ==========================================
// APK DOWNLOAD
// ==========================================

const apkButtons =
    document.querySelectorAll(
        ".download-apk-button"
    );


apkButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const originalContent =
                button.innerHTML;


            button.classList.add(
                "download-started"
            );


            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Download started
            `;


            setTimeout(() => {

                button.innerHTML =
                    originalContent;

                button.classList.remove(
                    "download-started"
                );

            }, 1800);

        }
    );

});


// ==========================================
// COOKIE CONSENT
// ==========================================

const cookieBanner =
    document.getElementById("cookieBanner");

const cookieModal =
    document.getElementById("cookieModal");

const cookieAccept =
    document.getElementById("cookieAccept");

const cookieReject =
    document.getElementById("cookieReject");

const cookieSettings =
    document.getElementById("cookieSettings");

const closeCookieModal =
    document.getElementById("closeCookieModal");

const saveCookieSettings =
    document.getElementById("saveCookieSettings");

const preferenceCookies =
    document.getElementById("preferenceCookies");

const analyticsCookies =
    document.getElementById("analyticsCookies");


// ==========================================
// CHECK SAVED CONSENT
// ==========================================

const savedConsent =
    localStorage.getItem(
        "galoulouCookieConsent"
    );


if (
    savedConsent &&
    cookieBanner
) {

    cookieBanner.classList.add(
        "hidden"
    );

}


// ==========================================
// ACCEPT
// ==========================================

if (cookieAccept) {

    cookieAccept.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "galoulouCookieConsent",
                JSON.stringify({
                    necessary: true,
                    preferences: true,
                    analytics: true
                })
            );


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// REJECT
// ==========================================

if (cookieReject) {

    cookieReject.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "galoulouCookieConsent",
                JSON.stringify({
                    necessary: true,
                    preferences: false,
                    analytics: false
                })
            );


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// OPEN COOKIE SETTINGS
// ==========================================

if (cookieSettings) {

    cookieSettings.addEventListener(
        "click",
        () => {

            if (cookieModal) {

                cookieModal.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// CLOSE COOKIE SETTINGS
// ==========================================

if (closeCookieModal) {

    closeCookieModal.addEventListener(
        "click",
        () => {

            if (cookieModal) {

                cookieModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// SAVE COOKIE SETTINGS
// ==========================================

if (saveCookieSettings) {

    saveCookieSettings.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "galoulouCookieConsent",
                JSON.stringify({
                    necessary: true,
                    preferences:
                        preferenceCookies
                            ? preferenceCookies.checked
                            : false,
                    analytics:
                        analyticsCookies
                            ? analyticsCookies.checked
                            : false
                })
            );


            if (cookieModal) {

                cookieModal.classList.add(
                    "hidden"
                );

            }


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ==========================================

if (cookieModal) {

    cookieModal.addEventListener(
        "click",
        event => {

            if (
                event.target === cookieModal
            ) {

                cookieModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// INITIALIZE
// ==========================================

renderCategories();

renderTools();

renderRecent();


// ==========================================
// CONSOLE
// ==========================================

console.log(
    "%c🧰 Galoulou Toolbox",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%c20 tools. One place.",
    "font-size:14px;"
);

console.log(
    "%c📱 Android APK ready.",
    "font-size:14px;"
);
```
