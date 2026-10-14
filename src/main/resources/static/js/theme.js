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
    radio.addEventListener("change", (e) => {
        if (!e.target.checked) return;

        const val = e.target.value;
        if (val === "light" || val === "dark") {
            localStorage.setItem("theme", val);
        } else {
            localStorage.removeItem("theme");
        }

        applyTheme();
    });
});

applyTheme();
