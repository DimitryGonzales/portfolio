(() => {
    const STORAGE_KEY = "preferred-language";
    const DEFAULT_LANGUAGE = "english";

    const SUPPORTED_LANGUAGES = {
        english: "en",
        portuguese: "pt",
    };

    const translations = new Map();
    const originalText = new Map();

    const normalizeLanguage = (value) => {
        if (!value) {
            return null;
        }

        const language = value.toLowerCase();

        if (language in SUPPORTED_LANGUAGES) {
            return language;
        }

        if (language.startsWith("pt")) {
            return "portuguese";
        }

        if (language.startsWith("en")) {
            return "english";
        }

        return null;
    };

    const getInitialLanguage = () => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored && stored in SUPPORTED_LANGUAGES) {
            return stored;
        }

        const browserLanguages = navigator.languages ?? [navigator.language];

        for (const browserLanguage of browserLanguages) {
            const supported = normalizeLanguage(browserLanguage);

            if (supported) {
                return supported;
            }
        }

        return DEFAULT_LANGUAGE;
    };

    const getLanguageFilePath = (language) => {
        return `/i18n/${SUPPORTED_LANGUAGES[language]}.json`;
    };

    const saveOriginalText = () => {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            originalText.set(key, element.textContent);
        });
    };

    const loadTranslations = async (language) => {
        if (translations.has(language)) {
            return translations.get(language);
        }

        const path = getLanguageFilePath(language);
        const response = await fetch(path, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(
                `Could not load ${path}: ${response.status} ${response.statusText}`,
            );
        }

        const dictionary = await response.json();
        translations.set(language, dictionary);
        return dictionary;
    };

    const updateLanguageRadios = (language) => {
        document
            .querySelectorAll("input[name='language-toggle']")
            .forEach((radio) => {
                radio.checked = radio.value === language;
            });
    };

    const applyEnglish = () => {
        document.documentElement.lang = SUPPORTED_LANGUAGES.english;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const value = originalText.get(key);

            if (typeof value === "string") {
                element.textContent = value;
            }
        });

        updateLanguageRadios(DEFAULT_LANGUAGE);
    };

    const applyTranslations = (language, dictionary) => {
        document.documentElement.lang = SUPPORTED_LANGUAGES[language];

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const value = dictionary[key];

            if (typeof value === "string") {
                element.textContent = value;
            } else {
                console.warn(`Missing translation key: "${key}"`);
            }
        });

        updateLanguageRadios(language);
    };

    const setLanguage = async (language, persist = true) => {
        if (!(language in SUPPORTED_LANGUAGES)) {
            console.warn(`Unsupported language: "${language}"`);
            return;
        }

        try {
            if (persist) {
                localStorage.setItem(STORAGE_KEY, language);
            }

            if (language === DEFAULT_LANGUAGE) {
                applyEnglish();
                return;
            }

            const dictionary = await loadTranslations(language);
            applyTranslations(language, dictionary);
        } catch (error) {
            console.error("Failed to apply language:", error);
        }
    };

    const init = async () => {
        saveOriginalText();

        document.addEventListener("change", (event) => {
            const radio = event.target;

            if (
                radio instanceof HTMLInputElement &&
                radio.name === "language-toggle" &&
                radio.checked
            ) {
                setLanguage(radio.value);
            }
        });

        await setLanguage(getInitialLanguage(), false);
    };

    document.addEventListener("DOMContentLoaded", init);
})();
