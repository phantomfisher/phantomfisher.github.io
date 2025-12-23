// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form[action*='formspree.io']");

  if (!form) return; // safety check

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default submission

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    const originalValue = submitButton.value;
    submitButton.value = "Submitting...";

    // Collect all form data
    const formData = new FormData(form);

    // Send form data via fetch to Formspree
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Redirect to your thank-you page
          window.location.href = "thanks.html";
        } else {
          alert("There was a problem submitting your form. Please try again.");
          submitButton.disabled = false;
          submitButton.value = originalValue;
        }
      })
      .catch(error => {
        console.error("Form submission error:", error);
        alert("There was a problem submitting your form. Please try again.");
        submitButton.disabled = false;
        submitButton.value = originalValue;
      });
  });
});
