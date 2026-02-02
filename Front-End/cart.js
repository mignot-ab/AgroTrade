// cart.js - Shared cart functionality across all pages

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

// Initialize cart from localStorage
function initCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartTotal();
  }
  updateCartCount();
}

// Update cart total
function updateCartTotal() {
  cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart count in header
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

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
  
  updateCartTotal();
  saveCartToStorage();
  updateCartCount();
  
  return cart;
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartTotal();
  saveCartToStorage();
  updateCartCount();
  return cart;
}

// Update item quantity
function updateCartItemQuantity(id, quantity) {
  const item = cart.find(item => item.id === id);
  if (item && quantity > 0) {
    item.quantity = quantity;
    updateCartTotal();
    saveCartToStorage();
    updateCartCount();
  }
  return cart;
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartCount', cart.reduce((sum, item) => sum + item.quantity, 0));
}

// Clear cart
function clearCart() {
  cart = [];
  updateCartTotal();
  saveCartToStorage();
  updateCartCount();
  return cart;
}

// Get cart items
function getCartItems() {
  return cart;
}

// Get cart total
function getCartTotal() {
  return cartTotal;
}