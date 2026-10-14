const sections = document.querySelectorAll("main > section");

const indicators = new Map(
    [...sections].map((section) => [
        section,
        document.getElementById(`${section.id}-indicator`),
    ]),
);

let activeSection = null;

const setActiveSection = (section) => {
    if (section === activeSection) return;

    if (activeSection) {
        indicators.get(activeSection)?.classList.remove("topbar-link-active");
    }

    activeSection = section;

    if (activeSection) {
        indicators.get(activeSection)?.classList.add("topbar-link-active");
    }
};

const observer = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                setActiveSection(entry.target);
            }
        }
    },
    {
        root: null,

        rootMargin: "-50% 0px -50% 0px",

        threshold: 0,
    },
);

sections.forEach((section) => observer.observe(section));
