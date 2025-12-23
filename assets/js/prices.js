document.addEventListener("DOMContentLoaded", () => {

  // Function to append prices based on class
  function applyPrices(select) {
    select.querySelectorAll("option").forEach(option => {
      // Avoid appending multiple times
      if (option.dataset.priceApplied) return;

      if (option.classList.contains("sticker")) {
        option.textContent += " - $3";
      } else if (option.classList.contains("resin")) {
        option.textContent += " - $10";
      } else if (option.classList.contains("postcard")) {
        option.textContent += " - $5";
      }
      
      // Mark as processed
      option.dataset.priceApplied = "true";
    });
  }

  // Apply prices to all existing selects
  document.querySelectorAll("select[name='Items']").forEach(select => {
    applyPrices(select);
  });

  // If your form dynamically adds new item rows, use MutationObserver
  const container = document.getElementById("items-container");
  if (container) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element
            const select = node.querySelector("select[name='Items']");
            if (select) applyPrices(select);
          }
        });
      });
    });

    observer.observe(container, { childList: true });
  }

});
