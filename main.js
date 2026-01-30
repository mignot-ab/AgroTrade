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
  cartItemsContainer.innerHTML = '';
  cartTotal = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    cartTotalPrice.textContent = '$0.00';
    cartCount.textContent = '0';
    return;
  }
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;
    
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60'">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItemElement);
  });
  
  // Update cart total and count
  cartTotalPrice.textContent = `$${cartTotal.toFixed(2)}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Add event listeners to quantity buttons
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });
  
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', handleQuantityInput);
  });
  
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', handleRemoveItem);
  });
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