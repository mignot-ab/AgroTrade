let search = document.querySelector('.search-box')
 document.querySelector('#search-icon').onclick = () =>{
  search.classList.toggle('active')
 }




 /*let header = document.querySelector('header');
 window.addEventListener('scroll',() => {
  header.classList.toggle('shadow',window.scrollY > 0);
 });  
window.addEventListener("scroll", () => {
  const images = document.querySelectorAll(".scroll-3d");

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (rect.top - windowHeight / 2) / windowHeight;

      const rotateY = progress * 20;
      const rotateX = progress * -10;

      img.style.transform = `
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
        translateZ(40px)
      `;
    }
  });
});
// ... existing code ...

// Product Details Overlay Functionality
const overlay = document.getElementById('product-overlay');
const closeOverlay = document.querySelector('.close-overlay');
const viewDetailButtons = document.querySelectorAll('.view-details');
const productBoxes = document.querySelectorAll('.box');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const quantityInput = document.getElementById('quantity');
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.getElementById('cart-icon');

// Sample product data (in real app, this would come from backend)
const products = {
  1: {
    title: "Organic Fertilizer",
    price: 450,
    description: "Premium organic fertilizer made from natural ingredients. Enhances soil fertility, promotes plant growth, and increases yield. Suitable for all types of crops including vegetables, fruits, and grains.",
    images: ["images/fertilizer.jpeg", "images/machinery.jpeg", "images/pesticides.jpeg"],
    rating: 4.5,
    reviews: 128,
    specs: {
      type: "Organic",
      npk: "5-3-2",
      size: "25kg bag",
      coverage: "500 sq.m per bag",
      suitable: "All crops",
      certified: "Yes"
    },
    stock: 150
  },
  2: {
    title: "Farm Tractor",
    price: 12000,
    description: "Modern farm tractor with 50HP engine, perfect for small to medium-sized farms. Fuel efficient and easy to maintain.",
    images: ["images/machinery.jpeg", "images/fertilizer.jpeg", "images/pesticides.jpeg"],
    rating: 4.8,
    reviews: 45,
    specs: {
      type: "Diesel",
      horsepower: "50 HP",
      transmission: "Manual",
      warranty: "2 years",
      brand: "FarmPro"
    },
    stock: 8
  }
  // Add more products as needed
};

// Open overlay when clicking on product box or view details button
productBoxes.forEach(box => {
  box.addEventListener('click', (e) => {
    // Don't open overlay if clicking the "Add to Cart" button directly
    if (!e.target.classList.contains('view-details') && !e.target.closest('.view-details')) {
      return;
    }
    
    e.preventDefault();
    const productId = box.getAttribute('data-product');
    openProductOverlay(productId);
  });
});

viewDetailButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const box = button.closest('.box');
    const productId = box.getAttribute('data-product');
    openProductOverlay(productId);
  });
});

// Open product overlay with product details
function openProductOverlay(productId) {
  const product = products[productId];
  if (!product) return;
  
  // Update overlay content with product data
  document.querySelector('.product-title').textContent = product.title;
  document.querySelector('.price').textContent = product.price;
  document.querySelector('.product-description').textContent = product.description;
  document.querySelector('.stock').textContent = `In Stock: ${product.stock} units`;
  
  // Update rating
  const ratingStars = document.querySelectorAll('.product-rating i');
  ratingStars.forEach((star, index) => {
    star.className = 'bx';
    if (index < Math.floor(product.rating)) {
      star.className = 'bx bxs-star';
    } else if (index < Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
      star.className = 'bx bxs-star-half';
    }
  });
  document.querySelector('.product-rating span').textContent = `(${product.rating}/5) ${product.reviews} reviews`;
  
  // Update specs
  const specsList = document.querySelector('.product-specs ul');
  specsList.innerHTML = '';
  for (const [key, value] of Object.entries(product.specs)) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${key}:</strong> ${value}`;
    specsList.appendChild(li);
  }
  
  // Update main image
  const mainImage = document.querySelector('.main-image');
  mainImage.src = product.images[0];
  mainImage.alt = product.title;
  
  // Update thumbnails
  const thumbnails = document.querySelector('.thumbnail-images');
  thumbnails.innerHTML = '';
  product.images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Thumbnail ${index + 1}`;
    img.addEventListener('click', () => {
      mainImage.src = imgSrc;
      document.querySelectorAll('.thumbnail-images img').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
    });
    if (index === 0) img.classList.add('active');
    thumbnails.appendChild(img);
  });
  
  // Reset quantity
  quantityInput.value = 1;
  
  // Show overlay
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close overlay
closeOverlay.addEventListener('click', closeOverlayFunc);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeOverlayFunc();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) {
    closeOverlayFunc();
  }
});

function closeOverlayFunc() {
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Quantity controls
minusBtn.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

plusBtn.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  const maxStock = parseInt(document.querySelector('.stock').textContent.match(/\d+/)[0]);
  if (currentValue < maxStock && currentValue < 100) {
    quantityInput.value = currentValue + 1;
  }
});

quantityInput.addEventListener('change', () => {
  const value = parseInt(quantityInput.value);
  const maxStock = parseInt(document.querySelector('.stock').textContent.match(/\d+/)[0]);
  
  if (value < 1) {
    quantityInput.value = 1;
  } else if (value > maxStock) {
    quantityInput.value = maxStock;
  } else if (value > 100) {
    quantityInput.value = 100;
  }
});

// Add to cart functionality
addToCartBtn.addEventListener('click', () => {
  const productTitle = document.querySelector('.product-title').textContent;
  const price = parseInt(document.querySelector('.price').textContent);
  const quantity = parseInt(quantityInput.value);
  const total = price * quantity;
  
  // Update cart count
  let currentCount = parseInt(cartCount.textContent);
  currentCount += quantity;
  cartCount.textContent = currentCount;
  
  // Show success message
  showNotification(`${quantity} × ${productTitle} added to cart!`, 'success');
  
  // Close overlay after adding to cart
  setTimeout(closeOverlayFunc, 500);
});

// Buy now button
document.querySelector('.buy-now-btn').addEventListener('click', () => {
  showNotification('Redirecting to checkout...', 'info');
  // In real app, this would redirect to checkout page
});

// Wishlist button
document.querySelector('.wishlist-btn').addEventListener('click', () => {
  const productTitle = document.querySelector('.product-title').textContent;
  showNotification(`${productTitle} added to wishlist!`, 'success');
});

// Cart icon click
cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  showNotification('Cart will be implemented in next phase!', 'info');
});

// Notification function
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles for notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    z-index: 3000;
    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ... rest of existing code ...
*/