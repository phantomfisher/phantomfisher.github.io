// === CART FUNCTIONALITY ===

// Get DOM elements
const addToCartButton = document.getElementById('addToCartButton');
const productName = document.getElementById('productName');
const targetImage = document.getElementById('targetImage');

// Map classes to prices
const classPrices = {
    keychain: 12,
    sticker: 3,
    resin: 10,
    postcard: 5
};

// Function to render the cart in HTML
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');

    if (!cartItems) return; // skip if container does not exist

    cartItems.innerHTML = ""; // clear existing content
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Your cart is empty.</li>";
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" style="margin-right:8px; vertical-align:middle;">
            ${item.name} x ${item.quantity} ($${item.price} each)
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    cartItems.appendChild(totalLi);
}

// Add item to cart when button is clicked
if (addToCartButton) {
    addToCartButton.addEventListener('click', e => {
        e.preventDefault(); // prevent default anchor behavior

        // Get current product info
        const name = productName.textContent;
        const image = targetImage.src;
        const quantity = parseInt(document.getElementById('quantity').value) || 1;

        // Determine item price based on class of the clickable image that matches the product name
        let price = 0;
        const productImages = document.querySelectorAll('.clickableImage');

        productImages.forEach(img => {
            // Match by data-name if set, otherwise by alt text
            const imgName = img.dataset.name || img.alt;
            if (imgName === name) {
                for (const cls in classPrices) {
                    if (img.classList.contains(cls)) {
                        price = classPrices[cls];
                        break;
                    }
                }
            }
        });

        // Read cart from localStorage or initialize
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists in cart
        const existingIndex = cart.findIndex(item => item.name === name);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ name, image, quantity, price });
        }

        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart display
        renderCart();
    });
}

// Render cart when page loads
document.addEventListener('DOMContentLoaded', renderCart);
