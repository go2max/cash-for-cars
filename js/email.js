document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        formMessage.textContent = "⏳ Sending...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            });

            const result = await response.text();

            if (result.trim() === "success") {
                formMessage.textContent = "✅ Message sent successfully!";
                form.reset();
            } else {
                console.error("Mail error:", result);
                formMessage.textContent = "❌ There was an error sending your message.";
            }
        } catch (error) {
            console.error("Network error:", error);
            formMessage.textContent = "⚠️ Network error — please try again later.";
        }
    });
});
