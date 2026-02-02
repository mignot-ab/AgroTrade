let search = document.querySelector('.search-box')
 document.querySelector('#search-icon').onclick = () =>{
  search.classList.toggle('active')
  navbar.classList.remove('active')
 }
 let navbar = document.querySelector('.navbar')
 document.querySelector('#menu-icon').onclick = () =>{
  navbar.classList.toggle('active')
  search.classList.remove('active')
 }
 window.onscroll = () =>{
  navbar.classList.remove('active')
  search.classList.remove('active')
 }

const learnMore = document.getElementById("learnMore");
const overlay = document.getElementById("agriOverlay");
const closeOverlay = document.getElementById("closeOverlay");

// Open overlay
learnMore.addEventListener("click", function(e) {
  e.preventDefault();
  overlay.classList.add("active");
});

// Close overlay with X
closeOverlay.addEventListener("click", function() {
  overlay.classList.remove("active");
});

// Close overlay by clicking outside modal
overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});

// Close overlay with ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    overlay.classList.remove("active");
  }
});
let header = document.querySelector('header')
window.addEventListener('scroll',() => {
  header.classList.toggle('shadow',window.scrollY > 0);
})
// Cart state
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');

// Initialize cart from localStorage
function initCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Toggle cart sidebar
cartToggle.addEventListener('click', () => {
  cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
  if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
    cartSidebar.classList.remove('active');
  }
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  
  // Add click event to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productElement = e.target.closest('.product');
      const productId = productElement.dataset.id || Math.random().toString(36).substr(2, 9);
      const productName = productElement.querySelector('.product-name').textContent;
      const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g, ""));
      const productImage = productElement.querySelector('img')?.src || '';
      
      addToCart(productId, productName, productPrice, productImage);
      
      // Show cart sidebar
      cartSidebar.classList.add('active');
    });
  });
});

// Add item to cart
function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  }
  
  updateCart();
  saveCartToStorage();
}

// Update cart display
function updateCart() {
  cartTotal = 0;
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="minus" data-id="${item.id}">-</button>
          <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
          <button class="plus" data-id="${item.id}">+</button>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  cartTotalPrice.textContent = `$${cartTotal.toFixed(2)}`;
  cartCount.textContent = cart.length;
}


// Handle quantity change
function handleQuantityChange(e) {
  const id = e.target.dataset.id;
  const item = cart.find(item => item.id === id);
  
  if (e.target.classList.contains('plus')) {
    item.quantity += 1;
  } else if (e.target.classList.contains('minus') && item.quantity > 1) {
    item.quantity -= 1;
  }
  
  updateCart();
  saveCartToStorage();
}

// Handle quantity input change
function handleQuantityInput(e) {
  const id = e.target.dataset.id;
  const item = cart.find(item => item.id === id);
  const newQuantity = parseInt(e.target.value);
  
  if (newQuantity > 0) {
    item.quantity = newQuantity;
    updateCart();
    saveCartToStorage();
  }
}

// Handle remove item
function handleRemoveItem(e) {
  const id = e.target.dataset.id;
  cart = cart.filter(item => item.id !== id);
  updateCart();
  saveCartToStorage();
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert(`Checkout completed! Total: $${cartTotal.toFixed(2)}`);
  cart = [];
  updateCart();
  saveCartToStorage();
  cartSidebar.classList.remove('active');
});


  // Select form using DOM
 document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const messageBox = document.getElementById("formMessage");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        // Clear styles
        [fullName, email, subject, message].forEach(field => {
            field.style.borderColor = "";
        });

        // Validation
        if (fullName.value.trim() === "") {
            fullName.style.borderColor = "red";
            valid = false;
        }

        if (email.value.trim() === "") {
            email.style.borderColor = "red";
            valid = false;
        }

        if (subject.value.trim() === "") {
            subject.style.borderColor = "red";
            valid = false;
        }

        if (message.value.trim() === "") {
            message.style.borderColor = "red";
            valid = false;
        }

        if (!valid) {
            messageBox.textContent = "❌ Please fill in all required fields.";
            messageBox.style.color = "red";
            return;
        }

        // Success
        messageBox.textContent = "✅ Message sent successfully!";
        messageBox.style.color = "green";

        form.reset();
    });
});
document.addEventListener("DOMContentLoaded", () => {

  const sellerOverlay = document.getElementById("seller-overlay");
  const closeSeller = document.getElementById("close-seller");

  // OPEN OVERLAY
  document.querySelectorAll(".contact-seller").forEach(button => {
    button.addEventListener("click", () => {
      sellerOverlay.classList.add("active");
    });
  });

  // CLOSE BUTTON
  closeSeller.addEventListener("click", () => {
    sellerOverlay.classList.remove("active");
  });

  // CLICK OUTSIDE MODAL
  sellerOverlay.addEventListener("click", (e) => {
    if (e.target === sellerOverlay) {
      sellerOverlay.classList.remove("active");
    }
  });

  // ESC KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sellerOverlay.classList.remove("active");
    }
  });

});

