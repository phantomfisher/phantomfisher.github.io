document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form[action*='formspree.io']");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default submission

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    const originalValue = submitButton.value;
    submitButton.value = "Submitting...";

    const formData = new FormData(form);

    // 1️⃣ Send to Formspree
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (!response.ok) throw new Error("Formspree submission failed");

      // 2️⃣ Send confirmation email to user via EmailJS
      const userEmail = form.querySelector('input[name="Email"]').value;
      const userName = form.querySelector('input[name="Name"]').value;
      const orderDetails = form.querySelector('input[name="Order Details"]').value;
      const orderTotal = document.getElementById("order-total").textContent.replace("Total: $", "");

      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        user_email: userEmail,
        user_name: userName,
        order_details: orderDetails,
        order_total: orderTotal
      })
      .then(() => {
        // Redirect to thank-you page after both emails are sent
        window.location.href = "thanks.html";
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("Your order was submitted, but the confirmation email failed. We'll still process your order.");
        window.location.href = "thanks.html";
      });

    })
    .catch(error => {
      console.error("Form submission error:", error);
      alert("There was a problem submitting your form. Please try again.");
      submitButton.disabled = false;
      submitButton.value = originalValue;
    });
  });
});
