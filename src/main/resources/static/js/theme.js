const radios = document.getElementsByName("theme-toggle");

function applyTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "light" || theme === "dark") {
        document.documentElement.setAttribute("data-theme", theme);
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    radios.forEach((radio) => {
        radio.checked = radio.value === (theme || "auto");
    });
}

radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
        if (!event.target.checked) return;

        const value = event.target.value;

        if (value === "light" || value === "dark") {
            localStorage.setItem("theme", value);
        } else {
            localStorage.removeItem("theme");
        }

        applyTheme();
    });
});

applyTheme();
