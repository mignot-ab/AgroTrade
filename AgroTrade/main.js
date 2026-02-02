
let search = document.querySelector('.search-box')
document.querySelector('#search-icon').onclick = () => {
  search.classList.toggle('active')
  navbar.classList.remove('active')
}

let navbar = document.querySelector('.navbar')
document.querySelector('#menu-icon').onclick = () => {
  navbar.classList.toggle('active')
  search.classList.remove('active')
}

window.onscroll = () => {
  navbar.classList.remove('active')
  search.classList.remove('active')
}

let header = document.querySelector('header')
window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0)
})

// Seller Data Configuration
const sellerData = {
  'fertilizer': {
    name: 'John AgriTech',
    company: 'AgroSupplies Inc.',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 911 223 344',
    email: 'fertilizer@agrosupplies.com',
    products: 'Fertilizers, Soil Amendments',
    certs: 'ISO 9001, Organic Certified',
    description: 'Leading supplier of agricultural fertilizers and soil enhancement products with 10+ years of experience.',
    rating: 4.7
  },
  'machinery': {
    name: 'Michael FarmTech',
    company: 'FarmTech Co.',
    location: 'Nairobi, Kenya',
    phone: '+251 922 334 455',
    email: 'machinery@farmtech.com',
    products: 'Tractors, Harvesters, Irrigation Systems',
    certs: 'CE Certified, Quality Approved',
    description: 'Supplier of modern agricultural machinery and equipment for large-scale farming operations.',
    rating: 4.9
  },
  'pesticides': {
    name: 'Sarah CropCare',
    company: 'CropGuard Ltd.',
    location: 'Kampala, Uganda',
    phone: '+251 933 445 566',
    email: 'pesticides@cropguard.com',
    products: 'Pesticides, Herbicides, Fungicides',
    certs: 'EPA Approved, Eco-Friendly',
    description: 'Specialist in crop protection products with focus on environmentally friendly solutions.',
    rating: 4.5
  },
  'livestock': {
    name: 'David Livestock',
    company: 'Livestock Hub',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 944 556 677',
    email: 'livestock@agrotrade.com',
    products: 'Cattle, Poultry, Animal Feed',
    certs: 'Veterinary Approved, Quality Certified',
    description: 'Premium livestock supplier with focus on animal health and quality breeding.',
    rating: 4.8
  },
  'farm-protection': {
    name: 'Robert Secure',
    company: 'SecureFarm Inc.',
    location: 'Dar es Salaam, Tanzania',
    phone: '+251 955 667 788',
    email: 'security@securefarm.com',
    products: 'Fencing, Security Systems, Storage',
    certs: 'Safety Certified, Durable Materials',
    description: 'Provider of farm security solutions and protective equipment for agricultural operations.',
    rating: 4.6
  },
  'post-harvest': {
    name: 'Lisa Harvest',
    company: 'Harvest Solutions',
    location: 'Kigali, Rwanda',
    phone: '+251 966 778 899',
    email: 'harvest@solutions.com',
    products: 'Storage Systems, Processing Equipment',
    certs: 'Food Grade, Quality Assured',
    description: 'Expert in post-harvest technology and storage solutions to reduce crop losses.',
    rating: 4.7
  },
  'herbicides': {
    name: 'Thomas WeedFree',
    company: 'WeedFree Agro',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 977 889 900',
    email: 'herbicides@weedfree.com',
    products: 'Selective Herbicides, Weed Control',
    certs: 'Selective Action, Safe for Crops',
    description: 'Specialist in weed management with selective herbicides that protect your crops.',
    rating: 4.4
  },
  'seed-seedlings': {
    name: 'Maria SeedMaster',
    company: 'SeedMaster Co.',
    location: 'Nairobi, Kenya',
    phone: '+251 988 990 011',
    email: 'seeds@seedmaster.com',
    products: 'Hybrid Seeds, Seedlings, Planting Materials',
    certs: 'Certified Seeds, High Germination Rate',
    description: 'Provider of high-quality certified seeds and seedlings for various crops.',
    rating: 4.9
  },
  'export-local': {
    name: 'James GlobalTrade',
    company: 'Global Export Co.',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 911 111 222',
    email: 'export@globaltrade.com',
    products: 'Teff, Coffee, Sesame, Spices',
    certs: 'Export Certified, Quality Graded',
    description: 'International exporter of premium Ethiopian agricultural products to global markets.',
    rating: 4.8
  },
  'iron-certified': {
    name: 'Anna Premium',
    company: 'Premium Farms Ltd.',
    location: 'Hawassa, Ethiopia',
    phone: '+251 922 222 333',
    email: 'certified@premiumfarms.com',
    products: 'Organic Produce, Certified Crops',
    certs: 'Iron Certified, Organic, Fair Trade',
    description: 'Certified organic farm specializing in premium quality agricultural products.',
    rating: 4.9
  },
  'coffee-beans': {
    name: 'Carlos Coffee',
    company: 'Coffee Masters Inc.',
    location: 'Jimma, Ethiopia',
    phone: '+251 933 333 444',
    email: 'coffee@masters.com',
    products: 'Arabica Coffee, Specialty Beans',
    certs: 'Specialty Grade, Direct Trade',
    description: 'Specialist in premium Ethiopian coffee beans with direct trade relationships.',
    rating: 5.0
  },
  'sesame-seeds': {
    name: 'Fatima Sesame',
    company: 'Sesame Exporters',
    location: 'Gondar, Ethiopia',
    phone: '+251 944 444 555',
    email: 'sesame@exporters.com',
    products: 'White Sesame, Hulled Sesame',
    certs: 'Export Quality, High Oil Content',
    description: 'Leading exporter of premium sesame seeds with high oil content for international markets.',
    rating: 4.7
  },
  'seller-registration': {
    name: 'AgroTrade Team',
    company: 'AgroTrade Sales',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 955 555 666',
    email: 'sales@agrotrade.com',
    products: 'Marketplace Services',
    certs: 'Platform Verified, Secure',
    description: 'Official AgroTrade team helping farmers and suppliers register and sell on our platform.',
    rating: 4.8
  },
  'buyer-support': {
    name: 'Support Team',
    company: 'AgroTrade Support',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 966 666 777',
    email: 'support@agrotrade.com',
    products: 'Buyer Assistance Services',
    certs: '24/7 Support, Verified',
    description: 'Dedicated support team to assist buyers with product selection and transactions.',
    rating: 4.9
  },
  'global-logistics': {
    name: 'Logistics Team',
    company: 'AgroTrade Logistics',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 977 777 888',
    email: 'logistics@agrotrade.com',
    products: 'Shipping & Logistics',
    certs: 'Certified Logistics, Global Network',
    description: 'Professional logistics team handling international shipping and customs clearance.',
    rating: 4.7
  }
}

// DOM Elements
const sellerOverlay = document.getElementById('seller-overlay')
const closeSellerBtn = document.getElementById('close-seller')
const sendMessageBtn = document.getElementById('send-message')

// Update seller information in overlay
function updateSellerInfo(sellerKey) {
  const seller = sellerData[sellerKey]
  if (!seller) return

  // Update all seller information
  document.getElementById('seller-name').textContent = seller.name
  document.getElementById('seller-company').textContent = seller.company
  document.getElementById('seller-location').textContent = seller.location
  document.getElementById('seller-phone').textContent = seller.phone
  document.getElementById('seller-email').textContent = seller.email
  document.getElementById('seller-products').textContent = seller.products
  document.getElementById('seller-certs').textContent = seller.certs
  document.getElementById('seller-description-text').textContent = seller.description

  // Update rating stars
  const stars = document.querySelectorAll('.seller-rating i')
  const ratingText = document.querySelector('.rating-text')
  
  const fullStars = Math.floor(seller.rating)
  const hasHalfStar = seller.rating % 1 >= 0.5
  
  stars.forEach((star, index) => {
    if (index < fullStars) {
      star.className = 'bx bxs-star'
    } else if (index === fullStars && hasHalfStar) {
      star.className = 'bx bxs-star-half'
    } else {
      star.className = 'bx bx-star'
    }
  })
  
  ratingText.textContent = `${seller.rating} (${Math.floor(Math.random() * 100) + 50} reviews)`
}

// Add click event to all "Contact Seller" buttons
document.querySelectorAll('.contact-seller').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault()

    // Get product type from data-product attribute
    const productType = this.getAttribute('data-product').toLowerCase().replace(/\s+/g, '-')
    
    // Map product type to seller key
    let sellerKey = ''
    switch (productType) {
      case 'fertilizer':
        sellerKey = 'fertilizer'
        break
      case 'machinery':
        sellerKey = 'machinery'
        break
      case 'pesticides':
        sellerKey = 'pesticides'
        break
      case 'livestock-products':
        sellerKey = 'livestock'
        break
      case 'farm-protection':
        sellerKey = 'farm-protection'
        break
      case 'post-harvest-products':
        sellerKey = 'post-harvest'
        break
      case 'herbicides':
        sellerKey = 'herbicides'
        break
      case 'seed-and-seedlings':
        sellerKey = 'seed-seedlings'
        break
      case 'export-&-local-markets':
        sellerKey = 'export-local'
        break
      case 'iron-certified-farms':
        sellerKey = 'iron-certified'
        break
      case 'premium-coffee-beans':
        sellerKey = 'coffee-beans'
        break
      case 'export-quality-sesame-seeds':
        sellerKey = 'sesame-seeds'
        break
      case 'seller-registration':
        sellerKey = 'seller-registration'
        break
      case 'buyer-support':
        sellerKey = 'buyer-support'
        break
      case 'global-logistics':
        sellerKey = 'global-logistics'
        break
      default:
        sellerKey = 'fertilizer' // default
    }

    // Update seller info and show overlay
    updateSellerInfo(sellerKey)
    sellerOverlay.classList.add('active')
    document.body.style.overflow = 'hidden' // Prevent scrolling
  })
})

// Close overlay
closeSellerBtn.addEventListener('click', () => {
  sellerOverlay.classList.remove('active')
  document.body.style.overflow = 'auto'
})

// Close overlay by clicking outside
sellerOverlay.addEventListener('click', (e) => {
  if (e.target === sellerOverlay) {
    sellerOverlay.classList.remove('active')
    document.body.style.overflow = 'auto'
  }
})

// Close overlay with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sellerOverlay.classList.contains('active')) {
    sellerOverlay.classList.remove('active')
    document.body.style.overflow = 'auto'
  }
})

// Send message functionality
sendMessageBtn.addEventListener('click', () => {
  const messageInput = document.getElementById('message-to-seller')
  const message = messageInput.value.trim()
  
  if (!message) {
    alert('Please enter a message before sending.')
    return
  }
  
  const sellerEmail = document.getElementById('seller-email').textContent
  const sellerName = document.getElementById('seller-name').textContent
  
  // Simulate sending message (in real app, this would be an API call)
  alert(`Message sent to ${sellerName}!\n\nWe've forwarded your message to ${sellerEmail}. The seller will contact you shortly.`)
  
  // Clear the message field
  messageInput.value = ''
  
  // Close overlay after sending
  sellerOverlay.classList.remove('active')
  document.body.style.overflow = 'auto'
})
