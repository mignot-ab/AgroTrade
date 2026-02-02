// Header and Search functionality
let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-icon').onclick = () => {
  search.classList.toggle('active');
  navbar.classList.remove('active');
};

document.querySelector('#menu-icon').onclick = () => {
  navbar.classList.toggle('active');
  search.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  search.classList.remove('active');
};

function goToLogin() {
    window.location.href = "login.html";
  }
// Header shadow on scroll
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

// Seller data
const sellers = {
  1: {
    name: "Green Farms Ltd.",
    company: "Green Farms Export",
    location: "Addis Ababa, Ethiopia",
    phone: "+251 911 234 567",
    email: "contact@greenfarms.com",
    products: "Teff, Coffee, Sesame",
    certifications: "Organic, ISO 9001, Fair Trade",
    description: "Family-owned farm with over 20 years of experience in organic agriculture. We specialize in high-quality export products with full traceability from farm to market.",
    rating: 4.5,
    reviews: 120
  },
  2: {
    name: "Iron Farm Collective",
    company: "Iron Certified Farms Co.",
    location: "Oromia Region, Ethiopia",
    phone: "+251 922 345 678",
    email: "info@ironfarms.com",
    products: "Teff, Wheat, Barley",
    certifications: "Iron Certified, Organic, GMP",
    description: "A collective of 50+ smallholder farmers producing premium grains with iron certification for maximum nutritional value. Sustainable farming practices.",
    rating: 4.2,
    reviews: 89
  },
  3: {
    name: "Coffee Masters Ethiopia",
    company: "Ethiopian Coffee Exporters",
    location: "Sidama Zone, Ethiopia",
    phone: "+251 933 456 789",
    email: "export@coffeemasters.et",
    products: "Arabica Coffee Beans",
    certifications: "Specialty Grade, Rainforest Alliance",
    description: "Specialty coffee exporters with direct relationships with coffee growers. We focus on single-origin, traceable coffee beans with unique flavor profiles.",
    rating: 4.8,
    reviews: 156
  },
  4: {
    name: "Seed Excellence Group",
    company: "Premium Seed Producers",
    location: "Amhara Region, Ethiopia",
    phone: "+251 944 567 890",
    email: "seeds@excellencegroup.com",
    products: "Sesame, Niger Seed, Sunflower",
    certifications: "ISO 22000, Non-GMO Verified",
    description: "Leading producer of oil seeds for international markets. Our seeds have high oil content and are processed in modern facilities with quality control.",
    rating: 4.6,
    reviews: 103
  }
};

// DOM Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.querySelector('.cart-info');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Seller overlay elements
const sellerOverlay = document.getElementById('seller-overlay');
const closeSeller = document.getElementById('close-seller');
const sellerName = document.getElementById('seller-name');
const sellerCompany = document.getElementById('seller-company');
const sellerLocation = document.getElementById('seller-location');
const sellerPhone = document.getElementById('seller-phone');
const sellerEmail = document.getElementById('seller-email');
const sellerProducts = document.getElementById('seller-products');
const sellerCerts = document.getElementById('seller-certs');
const sellerDescription = document.getElementById('seller-description-text');
const sendMessageBtn = document.getElementById('send-message');
const messageToSeller = document.getElementById('message-to-seller');

// Initialize cart from shared cart.js
function initPage() {
  initCart(); // From cart.js
  updateCartDisplay();
}

// Toggle cart sidebar
if (cartToggle) {
  cartToggle.addEventListener('click', (e) => {
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
  if (cartSidebar && cartToggle && 
      !cartSidebar.contains(e.target) && 
      !cartToggle.contains(e.target)) {
    cartSidebar.classList.remove('active');
  }
});

// Seller overlay functionality
document.querySelectorAll('.contact-seller').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const sellerId = button.dataset.seller;
    showSellerOverlay(sellerId);
  });
});

function showSellerOverlay(sellerId) {
  const seller = sellers[sellerId];
  
  if (seller) {
    sellerName.textContent = seller.name;
    sellerCompany.textContent = seller.company;
    sellerLocation.textContent = seller.location;
    sellerPhone.textContent = seller.phone;
    sellerEmail.textContent = seller.email;
    sellerProducts.textContent = seller.products;
    sellerCerts.textContent = seller.certifications;
    sellerDescription.textContent = seller.description;
    
    // Update rating stars
    const ratingContainer = document.querySelector('.seller-rating');
    ratingContainer.innerHTML = '';
    
    const fullStars = Math.floor(seller.rating);
    const hasHalfStar = seller.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      if (i < fullStars) {
        star.className = 'bx bxs-star';
      } else if (i === fullStars && hasHalfStar) {
        star.className = 'bx bxs-star-half';
      } else {
        star.className = 'bx bx-star';
      }
      ratingContainer.appendChild(star);
    }
    
    const ratingText = document.createElement('span');
    ratingText.className = 'rating-text';
    ratingText.textContent = `${seller.rating} (${seller.reviews} reviews)`;
    ratingContainer.appendChild(ratingText);
    
    sellerOverlay.classList.add('active');
  }
}

// Close seller overlay
closeSeller.addEventListener('click', () => {
  sellerOverlay.classList.remove('active');
});

// Close seller overlay when clicking outside
sellerOverlay.addEventListener('click', (e) => {
  if (e.target === sellerOverlay) {
    sellerOverlay.classList.remove('active');
  }
});

// Close seller overlay with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sellerOverlay.classList.remove('active');
  }
});

// Send message functionality
sendMessageBtn.addEventListener('click', () => {
  const message = messageToSeller.value.trim();
  if (message) {
    alert(`Message sent to ${sellerName.textContent}! They will contact you soon.`);
    messageToSeller.value = '';
    sellerOverlay.classList.remove('active');
  } else {
    alert('Please enter a message before sending.');
  }
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
  initPage();
  initScrollAnimations();
  
  // Add click event to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productElement = e.target.closest('.box');
      const productId = productElement.dataset.id || Math.random().toString(36).substr(2, 9);
      const productName = productElement.querySelector('h3').textContent;
      const priceText = productElement.querySelector('.content span, .price').textContent;
      const productPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
      const productImage = productElement.querySelector('img')?.src || '';
      
      // Use shared cart function
      addToCart(productId, productName, productPrice, productImage);
      
      // Show success message
      showToast(`${productName} added to cart!`);
      
      // Show cart sidebar
      cartSidebar.classList.add('active');
      
      // Update cart display
      updateCartDisplay();
    });
  });
});

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
  
  // Add event listeners to quantity buttons
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

// Handle quantity change
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

// Handle quantity input change
function handleQuantityInput(e) {
  const id = e.target.dataset.id;
  const newQuantity = parseInt(e.target.value);
  
  if (newQuantity > 0) {
    updateCartItemQuantity(id, newQuantity);
    updateCartDisplay();
  }
}

// Handle remove item
function handleRemoveItem(e) {
  const id = e.target.dataset.id;
  removeFromCart(id);
  updateCartDisplay();
}

// Checkout button
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const currentCart = getCartItems();
    if (currentCart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`Checkout completed! Total: $${getCartTotal().toFixed(2)}`);
    clearCart();
    updateCartDisplay();
    cartSidebar.classList.remove('active');
  });
}

// Search functionality for index.html
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchInput) {
  const allProducts = [
    { name: "Fertilizer", price: 20, category: "agriculture", image: "images/fertilizer.jpeg", link: "#products" },
    { name: "Machinery", price: 20000, category: "equipment", image: "images/machinery.jpeg", link: "#products" },
    { name: "Pesticides", price: 25, category: "agriculture", image: "images/pesticides.jpeg", link: "#products" },
    { name: "Livestock Products", price: 18.99, category: "livestock", image: "images/cattle.jpeg", link: "#products" },
    { name: "Export & Local Markets", price: 300, category: "marketplace", image: "images/export.jpg", link: "#marketplace" },
    { name: "Iron Certified Farms", price: 350, category: "marketplace", image: "images/teff.jpg", link: "#marketplace" },
    { name: "Premium Coffee Beans", price: 400, category: "marketplace", image: "images/coffee2.jpg", link: "#marketplace" },
    { name: "Export-Quality Seeds", price: 1200, category: "marketplace", image: "images/sesame.jpg", link: "#marketplace" }
  ];
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
      return;
    }
    
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length > 0) {
      searchResults.innerHTML = filteredProducts.map(product => `
        <a href="${product.link}" class="search-result-item">
          <img src="${product.image}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p>$${product.price} • ${product.category}</p>
          </div>
        </a>
      `).join('');
      
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = '<div class="no-results">No products found</div>';
      searchResults.classList.add('active');
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
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
// Scroll animation for About Us section with water drop effect
function initScrollAnimations() {
  const profileElements = document.querySelectorAll('.profile');
  let animated = false;
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        // Trigger water drop effect for each profile with delay
        profileElements.forEach((profile, index) => {
          const delay = parseInt(profile.dataset.delay) || index * 300;
          
          setTimeout(() => {
            // Add the dropped class to trigger CSS transition
            profile.classList.add('dropped');
            
            // Add bounce effect after a small delay
            setTimeout(() => {
              profile.classList.add('bounce');
              
              // Create a ripple splash effect
              createRippleEffect(profile);
            }, 50);
            
          }, delay);
        });
        
        // Stop observing once triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of section is visible
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe the about section
  const aboutSection = document.querySelector('.about-us');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

// Create ripple splash effect
function createRippleEffect(element) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple-effect';
  
  // Get element position
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height;
  
  // Position the ripple
  ripple.style.cssText = `
    position: fixed;
    left: ${centerX}px;
    top: ${centerY}px;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: rippleExpand 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    pointer-events: none;
    z-index: 100;
  `;
  
  // Add to document
  document.body.appendChild(ripple);
  
  // Add ripple animation CSS if not already added
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes rippleExpand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(5);
          opacity: 0;
        }
      }
      
      .ripple-effect {
        animation: rippleExpand 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove ripple after animation completes
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 1000);
}

// 3D scroll effect
document.addEventListener('mousemove', (e) => {
  const scrollElements = document.querySelectorAll('.scroll-3d');
  
  scrollElements.forEach(element => {
    const speed = element.getAttribute('data-speed') || 1;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Add CSS for toast notifications
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .toast.show {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(toastStyles);