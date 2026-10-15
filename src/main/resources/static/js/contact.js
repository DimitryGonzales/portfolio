const contactForm = document.getElementById("contact-form");
const contactStatusClassName = "contact-me-status";

const contactMessages = {
    sending: "Sending...",
    sent: "Message sent!",
    invalid: "Please check the fields.",
    rateLimited: "Too many messages. Try again later.",
    error: "Could not send. Try again later.",
    network: "Network error. Try again later.",
};

function showContactStatus(message) {
    let statusElement = document.querySelector("." + contactStatusClassName);

    if (!statusElement) {
        statusElement = document.createElement("p");
        statusElement.className = contactStatusClassName;
        statusElement.setAttribute("role", "status");

        contactForm.appendChild(statusElement);
    }

    statusElement.textContent = message;
}

function hideContactStatus() {
    const statusElement = document.querySelector("." + contactStatusClassName);

    if (statusElement) {
        statusElement.remove();
    }
}

if (!contactForm) {
    console.error("contact.js: element with id 'contact-form' not found.");
} else if (contactForm.tagName !== "FORM") {
    console.error(
        "contact.js: element with id 'contact-form' is not a <form>. Found:",
        contactForm.tagName,
    );
} else {
    contactForm.addEventListener("submit", async (submitEvent) => {
        submitEvent.preventDefault();

        showContactStatus(contactMessages.sending);

        const requestUrl = contactForm.action;
        const requestBody = new URLSearchParams(new FormData(contactForm));

        try {
            const response = await fetch(requestUrl, {
                method: "POST",
                body: requestBody,
            });

            if (response.ok) {
                showContactStatus(contactMessages.sent);

                contactForm.reset();

                setTimeout(hideContactStatus, 4000);
            } else if (response.status === 400) {
                showContactStatus(contactMessages.invalid);
            } else if (response.status === 429) {
                showContactStatus(contactMessages.rateLimited);
            } else {
                console.error(
                    "contact.js: unexpected response status",
                    response.status,
                );

                showContactStatus(contactMessages.error);
            }
        } catch (fetchError) {
            console.error("contact.js: fetch failed", fetchError);

            showContactStatus(contactMessages.network);
        }
    });
}
