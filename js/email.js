<script>
    document.getElementById("contact-form").addEventListener("submit", async function(e) {
        e.preventDefault();
    const form = e.target;
    const formMessage = document.getElementById("form-message");

    const response = await fetch(form.action, {
        method: "POST",
    body: new FormData(form)
    });
    const result = await response.text();

    if (result.includes("success")) {
        formMessage.textContent = "✅ Message sent successfully!";
    form.reset();
    } else {
        formMessage.textContent = "❌ There was an error. Please try again.";
    }
});
</script>