// Products data
const productsData = [
  { id: 1, name: "Kuyu / Quncho Teff Seed", price: 200, category: "agriculture", image: "images/teffseed.JPG" },
  { id: 2, name: "Urea (Nitrogen)", price: 20000, category: "equipment", image: "images/machinery.jpeg" },
  { id: 3, name: "PesNPS+Zn/B (Soil-Specific Blend)", price: 250, category: "agriculture", image: "images/pesticides.jpeg" },
  { id: 4, name: "Organic Vermicompost (locally produced)", price: 180.99, category: "livestock", image: "images/cattle.jpeg" },
  { id: 5, name: "Massey Ferguson 200 Series Tractor", price: 1000000, category: "agriculture", image: "images/herbicides.jpeg" },
  { id: 6, name: "Multi-crop Thresher (used for Teff/Wheat)", price: 1000, category: "seeds", image: "images/seed.jpeg" },
  { id: 7, name: "Walk-behind Power Tiller", price: 5200, category: "safety", image: "images/fence.jpeg" },
  { id: 8, name: "Mancozeb (Fungicide)", price: 340, category: "storage", image: "images/harvest.jpeg" },
  { id: 9, name: "Malathion (Insecticide)", price: 300, category: "agriculture", image: "images/export.jpg" },
  { id: 10, name: "Bio-pesticides", price: 350, category: "seeds", image: "images/teff.jpg" },
  { id: 11, name: "Borena Bull Semen/Breed", price: 4000, category: "agriculture", image: "images/coffee2.jpg" },
  { id: 12, name: "Ethio-Chicken Layer Feed", price: 1200, category: "seeds", image: "images/sesame.jpg" },
  { id: 13, name: "Veterinary Deworming Kits", price: 2800, category: "agriculture", image: "images/fertilizer.jpeg" },
  { id: 14, name: "Heavy-Duty Rubber Farming Boots", price: 4500, category: "equipment", image: "images/boots.jpg" },
  { id: 15, name: "Canvas Spraying Suits", price: 32000, category: "agriculture", image: "images/pesticides.jpeg" },
  { id: 16, name: "UV-Protected Shading Nets", price: 2200.50, category:"livestock", image:"images/cattle.jpeg" },
  { id: 17, name: "PICS Bags (Hermetic)", price: 340000, category: "safety", image: "images/fence.jpeg" },
  { id: 18, name: "Traditional *Gotera*", price: 120000, category: "storage", image: "images/harvest.jpeg" },
  { id: 19, name: "Solar Grain Moisture Meters", price: 15, category: "seeds", image: "images/seed.jpeg" },
  { id: 20, name: "2,4-D Selective Herbicide", price: 1250, category: "seeds", image: "images/seed.jpeg" },
  { id: 21, name: "Glyphosate (for land clearing)", price: 1200, category: "equipment", image: "images/machinery.jpeg" },
  { id: 22, name: "Grass-specific herbicides", price: 1800, category: "livestock", image: "images/cattle.jpeg" },
  { id: 23, name: "Yirgacheffe Arabica Coffee Seedlings", price: 8500, category: "equipment", image: "images/fence.jpeg" },
  { id: 24, name: "Improved Red Onion Seeds", price: 890, category:"agriculture", image:"images/fertilizer.jpeg" }  
];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const visibleCount = document.getElementById('visible-count');
const totalCount = document.getElementById('total-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.cart-info');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const searchIcon = document.getElementById('search-icon');

// Header shadow on scroll
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});
// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  initCart(); // From cart.js
  loadProducts();
  setupEventListeners();
  updateCartDisplay();
});

// Load products from data
function loadProducts() {
  productsGrid.innerHTML = '';
  
  productsData.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'box2 product-item';
    productElement.dataset.id = product.id;
    productElement.dataset.name = product.name;
    productElement.dataset.price = product.price;
    productElement.dataset.category = product.category;
    
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
      <h3>${product.name}</h3>
      <div class="content2">
        <span>Birr ${product.price.toLocaleString()}</span>
        <a href="#" class="btn add-to-cart">Add to Cart</a>
      </div>
    `;
    
    productsGrid.appendChild(productElement);
  });
  
  updateProductCounts(productsData.length);
}

// Search functionality
function setupEventListeners() {
  // Search icon toggle
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      const searchBox = document.querySelector('.search-box');
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) {
        searchInput.focus();
      }
    });
  }
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (searchResults && searchInput && 
          !searchResults.contains(e.target) && 
          !searchInput.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }
  
  // Category filter
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndSortProducts);
  }
  
  // Sort by
  if (sortBy) {
    sortBy.addEventListener('change', filterAndSortProducts);
  }
  
  // Cart functionality
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      cartSidebar.classList.add('active');
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('active');
    });
  }
  
  // Close cart when clicking outside
  document.addEventListener('click', (e) => {
    if (cartSidebar && cartIcon && 
        !cartSidebar.contains(e.target) && 
        !cartIcon.contains(e.target)) {
      cartSidebar.classList.remove('active');
    }
  });
  
  // Add to cart buttons (using event delegation for dynamically loaded content)
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('add-to-cart')) {
      e.preventDefault();
      const productElement = e.target.closest('.product-item');
      const productId = productElement.dataset.id;
      const productName = productElement.querySelector('h3').textContent;
      const priceText = productElement.querySelector('.content2 span').textContent;
      const productPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
      const productImage = productElement.querySelector('img')?.src || '';
      
      // Use shared cart function
      addToCart(productId, productName, productPrice, productImage);
      
      // Show success message
      showToast(`${productName} added to cart!`);
      
      // Show cart sidebar
      if (cartSidebar) {
        cartSidebar.classList.add('active');
        updateCartDisplay();
      }
    }
  });
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm.length === 0) {
    searchResults.innerHTML = '';
    searchResults.classList.remove('active');
    filterAndSortProducts();
    return;
  }
  
  // Filter products for search results dropdown
  const filteredResults = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  
  // Show search results dropdown
  updateSearchResults(filteredResults, searchTerm);
  
  // Filter main products grid
  filterAndSortProducts();
}

// Update search results dropdown
function updateSearchResults(results, searchTerm) {
  if (!searchResults) return;
  
  if (results.length > 0) {
    searchResults.innerHTML = results.map(product => `
      <div class="search-result-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/40?text=Prod'">
        <div>
          <h4>${highlightMatch(product.name, searchTerm)}</h4>
          <p>$${product.price} • ${product.category}</p>
        </div>
      </div>
    `).join('');
    
    searchResults.classList.add('active');
    
    // Add click event to search results
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const productId = item.dataset.id;
        searchInput.value = productsData.find(p => p.id == productId)?.name || '';
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        filterAndSortProducts();
      });
    });
  } else {
    searchResults.innerHTML = '<div class="no-results">No products found</div>';
    searchResults.classList.add('active');
  }
}

// Highlight matching text in search results
function highlightMatch(text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Filter and sort products
function filterAndSortProducts() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const category = categoryFilter ? categoryFilter.value : 'all';
  const sortValue = sortBy ? sortBy.value : 'default';
  
  let filteredProducts = [...productsData];
  
  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply category filter
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  // Apply sorting
  if (sortValue !== 'default') {
    switch (sortValue) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }
  
  // Render filtered products
  renderFilteredProducts(filteredProducts);
}

// Render filtered products
function renderFilteredProducts(products) {
  productsGrid.innerHTML = '';
  
  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products-found" style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    updateProductCounts(0);
    return;
  }
  
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'box2 product-item';
    productElement.dataset.id = product.id;
    productElement.dataset.name = product.name;
    productElement.dataset.price = product.price;
    productElement.dataset.category = product.category;
    
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
      <h3>${product.name}</h3>
      <div class="content2">
        <span>$${product.price.toLocaleString()}</span>
        <a href="#" class="btn add-to-cart">Add to Cart</a>
      </div>
    `;
    
    productsGrid.appendChild(productElement);
  });
  
  updateProductCounts(products.length);
}

// Update product counts
function updateProductCounts(visibleCountNum = productsData.length) {
  if (visibleCount) {
    visibleCount.textContent = visibleCountNum;
  }
  if (totalCount) {
    totalCount.textContent = productsData.length;
  }
}

// Update cart display
function updateCartDisplay() {
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  const currentCart = getCartItems();
  
  if (currentCart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    if (cartTotalPrice) cartTotalPrice.textContent = '$0.00';
    return;
  }
  
  currentCart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60?text=Product'">
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
  
  if (cartTotalPrice) {
    cartTotalPrice.textContent = `$${getCartTotal().toFixed(2)}`;
  }
  
  // Add event listeners to dynamic cart items
  setTimeout(() => {
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', handleQuantityChange);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', handleQuantityInput);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', handleRemoveItem);
    });
  }, 100);
}

function handleQuantityChange(e) {
  const id = e.target.dataset.id;
  const item = getCartItems().find(item => item.id === id);
  
  if (!item) return;
  
  if (e.target.classList.contains('plus')) {
    updateCartItemQuantity(id, item.quantity + 1);
  } else if (e.target.classList.contains('minus') && item.quantity > 1) {
    updateCartItemQuantity(id, item.quantity - 1);
  }
  
  updateCartDisplay();
}

function handleQuantityInput(e) {
  const id = e.target.dataset.id;
  const newQuantity = parseInt(e.target.value);
  
  if (newQuantity > 0) {
    updateCartItemQuantity(id, newQuantity);
    updateCartDisplay();
  }
}

function handleRemoveItem(e) {
  const id = e.target.dataset.id;
  removeFromCart(id);
  updateCartDisplay();
}

function handleCheckout() {
  const currentCart = getCartItems();
  if (currentCart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert(`Checkout completed! Total: $${getCartTotal().toFixed(2)}`);
  clearCart();
  updateCartDisplay();
  if (cartSidebar) {
    cartSidebar.classList.remove('active');
  }
}

// Show toast notification
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Add CSS for highlight
const highlightStyles = document.createElement('style');
highlightStyles.textContent = `
  .highlight {
    background-color: #ffeb3b;
    font-weight: bold;
    padding: 1px 3px;
    border-radius: 2px;
  }
  
  .empty-cart {
    text-align: center;
    padding: 30px;
    color: #666;
    font-style: italic;
  }
  
  .no-products-found {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  .no-products-found h3 {
    color: #666;
    margin-bottom: 10px;
  }
  
  .no-products-found p {
    color: #999;
  }
`;
document.head.appendChild(highlightStyles);