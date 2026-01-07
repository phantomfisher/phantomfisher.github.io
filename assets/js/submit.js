document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const submitBtn = form.querySelector('input[type="image"]');

  if (!form || !submitBtn) {
    console.error("Order form or submit button not found");
    return;
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Disable button to prevent double submits
    submitBtn.style.pointerEvents = "none";
    submitBtn.style.opacity = "0.6";

    // Collect cart items (one per line)
    const cartItems = Array.from(document.querySelectorAll("#cartItems li"))
      .map(li => li.textContent.trim())
      .join("\n");

    document.getElementById("cartData").value = cartItems || "No items";

    // Send confirmation email to customer
    emailjs.sendForm(
      "service_l2dwyoa",
      "template_pomqveb",
      form
    )
    .then(() => {
      // Send internal notification email
      return emailjs.sendForm(
        "service_l2dwyoa",
        "template_x9yrjrp",
        form
      );
    })
    .then(() => {
      // Success → redirect
      window.location.href = "thanks.html";
    })
    .catch(error => {
      console.error("EmailJS error:", error);
      alert("There was a problem submitting your order. Please try again.");

      // Re-enable button on failure
      submitBtn.style.pointerEvents = "auto";
      submitBtn.style.opacity = "1";
    });
  });
});
