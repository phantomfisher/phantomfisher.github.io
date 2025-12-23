document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("items-container");

  // Prices based on class
  const classPrices = {
    sticker: 3,
    resin: 5,
    postcard: 2
  };

  const shippingFee = 5;

  // Create total display element
  const totalDisplay = document.createElement("p");
  totalDisplay.id = "order-total";
  totalDisplay.style.fontWeight = "bold";
  totalDisplay.textContent = `Total: $${shippingFee} (Shipping included)`;
  container.parentNode.appendChild(totalDisplay);

  // Function to update total
  function updateTotal() {
    let total = 0;

    const rows = container.querySelectorAll(".item-row");
    rows.forEach(row => {
      const select = row.querySelector("select[name='Items']");
      const qtyInput = row.querySelector("input[name='Quantites']");
      if (!select || !qtyInput) return;

      const selectedOption = select.options[select.selectedIndex];
      const qty = parseInt(qtyInput.value) || 0;

      if (selectedOption && qty > 0) {
        const itemClass = selectedOption.className;
        const price = classPrices[itemClass] || 0;
        total += price * qty;
      }
    });

    total += shippingFee;
    totalDisplay.textContent = `Total: $${total} (Shipping included)`;
  }

  // Update total whenever quantity or selection changes
  container.addEventListener("input", updateTotal);
  container.addEventListener("change", updateTotal);

  // Initial calculation
  updateTotal();

  // Apply prices visually to select options (from previous pricing.js)
  function applyPrices(select) {
    select.querySelectorAll("option").forEach(option => {
      if (option.dataset.priceApplied) return;

      if (option.classList.contains("sticker")) option.textContent += " - $3";
      if (option.classList.contains("resin")) option.textContent += " - $5";
      if (option.classList.contains("postcard")) option.textContent += " - $2";

      option.dataset.priceApplied = "true";
    });
  }

  // Apply to all existing selects
  document.querySelectorAll("select[name='Items']").forEach(select => {
    applyPrices(select);
  });

  // Observe dynamically added rows
  if (container) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const select = node.querySelector("select[name='Items']");
            if (select) applyPrices(select);
            updateTotal();
          }
        });
      });
    });
    observer.observe(container, { childList: true });
  }

  // Optional: Append order info to a hidden input to send via Formspree
  const form = container.closest("form");
  if (form) {
    const orderInput = document.createElement("input");
    orderInput.type = "hidden";
    orderInput.name = "Order Details";
    form.appendChild(orderInput);

    function updateOrderInput() {
      let orderText = "";
      const rows = container.querySelectorAll(".item-row");
      rows.forEach(row => {
        const select = row.querySelector("select[name='Items']");
        const qtyInput = row.querySelector("input[name='Quantites']");
        if (!select || !qtyInput) return;
        if (!select.value) return;

        orderText += `${select.value} x ${qtyInput.value}\n`;
      });
      orderText += `Shipping: $${shippingFee}\n`;
      orderInput.value = orderText;
    }

    // Update on any change
    container.addEventListener("input", updateOrderInput);
    container.addEventListener("change", updateOrderInput);
    updateOrderInput();
  }

});
