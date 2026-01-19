/* ====================================
   RASA PAARA - Complete Script with All Fixes
   ==================================== */

// ==================== GLOBAL STATE ====================
let restaurants = [
    {
        id: 1,
        name: "Golden Fork Restaurant",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1517521271924-fc100f1618de?w=500&h=350&fit=crop",
        description: "Authentic Sri Lankan cuisine with modern twist",
        openTime: "10:00",
        closeTime: "23:00",
        bestFor: "Lunch",
        ratings: [5, 4, 5, 4, 5],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 2,
        name: "Spice Garden Bistro",
        location: "Kandy",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop",
        description: "Traditional spicy dishes and modern fusion",
        openTime: "09:00",
        closeTime: "22:00",
        bestFor: "Dinner",
        ratings: [4, 4, 5, 4],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 3,
        name: "Beachside Cafe",
        location: "Galle",
        image: "https://images.unsplash.com/photo-1495195134817-aeb325ef3c61?w=500&h=350&fit=crop",
        description: "Fresh seafood with ocean views",
        openTime: "08:00",
        closeTime: "21:00",
        bestFor: "Breakfast",
        ratings: [5, 5, 4, 5, 4],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 4,
        name: "Urban Kitchen",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=350&fit=crop",
        description: "Contemporary cuisine in trendy setting",
        openTime: "11:00",
        closeTime: "23:30",
        bestFor: "Lunch",
        ratings: [4, 4, 3, 4, 4],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 5,
        name: "Mountain View Restaurant",
        location: "Kandy",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561054?w=500&h=350&fit=crop",
        description: "Fine dining with panoramic views",
        openTime: "12:00",
        closeTime: "22:00",
        bestFor: "Dinner",
        ratings: [5, 5, 5, 4],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 6,
        name: "Quick Bites Cafe",
        location: "Negombo",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=350&fit=crop",
        description: "Fast food with quality ingredients",
        openTime: "07:00",
        closeTime: "20:00",
        bestFor: "Breakfast",
        ratings: [4, 3, 4, 3],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 7,
        name: "Royal Palace Dining",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1578050494967-246abc5789dc?w=500&h=350&fit=crop",
        description: "Luxury dining experience",
        openTime: "18:00",
        closeTime: "23:59",
        bestFor: "Dinner",
        ratings: [5, 5, 5, 5, 4],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 8,
        name: "Sunrise Breakfast Bar",
        location: "Galle",
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311c15?w=500&h=350&fit=crop",
        description: "Best breakfast spot in town",
        openTime: "06:00",
        closeTime: "12:00",
        bestFor: "Breakfast",
        ratings: [5, 4, 5],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 9,
        name: "Taste of Asia",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1505521585265-20589baad340?w=500&h=350&fit=crop",
        description: "Pan-Asian cuisine",
        openTime: "11:00",
        closeTime: "23:00",
        bestFor: "Lunch",
        ratings: [4, 4, 4, 5],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    },
    {
        id: 10,
        name: "Tropical Paradise",
        location: "Jaffna",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=350&fit=crop",
        description: "Tropical flavors and fresh ingredients",
        openTime: "10:00",
        closeTime: "22:00",
        bestFor: "Dinner",
        ratings: [5, 5, 4, 5],
        reviews: [],
        mapsLink: "https://maps.google.com",
        chats: []
    }
];

let currentUser = null;
let isLoggedIn = false;
let currentRestaurantId = null;
let selectedRating = 0;

// Available cities for location suggestions
const cities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo',
    'Kaduwela', 'Matara', 'Nugegoda'
];

// ==================== AUTHENTICATION ====================
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    const body = document.body;
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        body.style.overflow = '';
    }
}

function toggleSubmitModal() {
    if (!isLoggedIn) {
        showNotification('Please login first');
        return;
    }
    
    const modal = document.getElementById('submitModal');
    const body = document.body;
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        body.style.overflow = '';
    }
}

function handleAuth(event) {
    event.preventDefault();
    
    const username = document.getElementById('authUsername').value;
    const email = document.getElementById('authEmail').value;
    const mobile = document.getElementById('authMobile').value;
    
    currentUser = {
        username,
        email,
        mobile,
        profilePic: `https://ui-avatars.com/api/?name=${username}&background=FF5722&color=fff`
    };
    
    isLoggedIn = true;
    document.getElementById('authBtn').innerHTML = `<i class="fas fa-user mr-2"></i>${maskMobileNumber(mobile)}`;
    
    toggleAuthModal();
    showNotification(`Welcome, ${username}!`);
    document.getElementById('authForm').reset();
}

function maskMobileNumber(mobile) {
    if (!mobile || mobile.length < 6) return mobile;
    const firstThree = mobile.substring(0, 3);
    const lastThree = mobile.substring(mobile.length - 3);
    return `${firstThree}***${lastThree}`;
}

function googleSignIn() {
    const users = [
        { username: 'Rajith', email: 'rajith@gmail.com', mobile: '0712345678' },
        { username: 'Priya', email: 'priya@gmail.com', mobile: '0756789012' },
        { username: 'Sanjeev', email: 'sanjeev@gmail.com', mobile: '0787654321' }
    ];
    
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    currentUser = {
        username: randomUser.username,
        email: randomUser.email,
        mobile: randomUser.mobile,
        profilePic: `https://ui-avatars.com/api/?name=${randomUser.username}&background=FF5722&color=fff`
    };
    
    isLoggedIn = true;
    document.getElementById('authBtn').innerHTML = `<i class="fas fa-user mr-2"></i>${maskMobileNumber(randomUser.mobile)}`;
    
    toggleAuthModal();
    showNotification(`Welcome, ${randomUser.username}!`);
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionId) {
    document.querySelectorAll('#home, #top10, #offers').forEach(section => {
        section.classList.add('hidden');
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
    }
    
    if (sectionId === 'top10') {
        renderTop10();
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// ==================== SEARCH & FILTER WITH SUGGESTIONS ====================
function handleRestaurantSearch() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsDiv = document.getElementById('restaurantSuggestions');
    
    if (!searchText) {
        suggestionsDiv.classList.add('hidden');
        return;
    }
    
    const matches = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchText) ||
        r.description.toLowerCase().includes(searchText)
    );
    
    if (matches.length > 0) {
        let html = '';
        matches.slice(0, 5).forEach(restaurant => {
            const avgRating = calculateAverageRating(restaurant.ratings);
            html += `
                <div class="suggestion-item" onclick="selectRestaurantFromSearch(${restaurant.id})">
                    <i class="fas fa-utensils"></i>
                    <div>
                        <strong>${restaurant.name}</strong>
                        <small>${restaurant.location} • ★ ${avgRating.toFixed(1)}</small>
                    </div>
                </div>
            `;
        });
        
        suggestionsDiv.innerHTML = html;
        suggestionsDiv.classList.remove('hidden');
    } else {
        suggestionsDiv.classList.add('hidden');
    }
    
    handleSearch();
}

function selectRestaurantFromSearch(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        document.getElementById('searchInput').value = restaurant.name;
        handleSearch();
        document.getElementById('restaurantSuggestions').classList.add('hidden');
    }
}

function handleLocationInput() {
    const input = document.getElementById('locationInput').value.toLowerCase();
    const suggestionsDiv = document.getElementById('locationSuggestions');
    
    if (!input) {
        suggestionsDiv.classList.add('hidden');
        return;
    }
    
    const matches = cities.filter(city =>
        city.toLowerCase().includes(input)
    );
    
    if (matches.length > 0) {
        let html = '';
        matches.slice(0, 5).forEach(city => {
            const count = restaurants.filter(r => r.location === city).length;
            html += `
                <div class="suggestion-item" onclick="selectCity('${city}')">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>${city}</strong>
                        <small>${count} restaurants</small>
                    </div>
                </div>
            `;
        });
        
        suggestionsDiv.innerHTML = html;
        suggestionsDiv.classList.remove('hidden');
    } else {
        suggestionsDiv.classList.add('hidden');
    }
}

function selectCity(city) {
    document.getElementById('locationInput').value = city;
    document.getElementById('locationSuggestions').classList.add('hidden');
    handleSearch();
}

function handleSearch() {
    const searchText = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const locationInput = document.getElementById('locationInput')?.value || '';
    const mealType = document.getElementById('mealTypeFilter')?.value || '';
    
    let filtered = restaurants;
    
    if (searchText) {
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(searchText) ||
            r.description.toLowerCase().includes(searchText)
        );
    }
    
    if (locationInput) {
        filtered = filtered.filter(r =>
            r.location.toLowerCase().includes(locationInput.toLowerCase())
        );
    }
    
    if (mealType) {
        filtered = filtered.filter(r => r.bestFor === mealType);
    }
    
    renderRestaurants(filtered);
}

function filterByMealType(mealType) {
    let filtered = restaurants;
    
    if (mealType !== 'All') {
        filtered = filtered.filter(r => r.bestFor === mealType);
    }
    
    renderRestaurants(filtered);
}

function getNearbyRestaurants() {
    if (!navigator.geolocation) {
        showNotification('Geolocation not supported on your browser');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const nearestCity = findNearestCity(latitude, longitude);
            
            document.getElementById('locationInput').value = nearestCity;
            handleSearch();
            showNotification(`Found restaurants near ${nearestCity}!`);
        },
        error => {
            // Fallback to Colombo
            document.getElementById('locationInput').value = 'Colombo';
            handleSearch();
            showNotification('Using Colombo as default location');
        }
    );
}

function findNearestCity(lat, lng) {
    const cityCoords = [
        { name: 'Colombo', lat: 6.9271, lng: 80.7789 },
        { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
        { name: 'Galle', lat: 6.0535, lng: 80.2158 },
        { name: 'Jaffna', lat: 9.6615, lng: 80.7854 },
        { name: 'Negombo', lat: 7.2064, lng: 79.8381 }
    ];
    
    let nearest = cityCoords[0];
    let minDistance = Infinity;
    
    cityCoords.forEach(city => {
        const distance = Math.sqrt(
            Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            nearest = city;
        }
    });
    
    return nearest.name;
}

// ==================== RESTAURANT DISPLAY ====================
function renderRestaurants(restaurantList = restaurants) {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (restaurantList.length === 0) {
        grid.innerHTML = '<p class="text-gray-300 col-span-full text-center py-8">No restaurants found</p>';
        return;
    }
    
    restaurantList.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        grid.appendChild(card);
    });
}

function createRestaurantCard(restaurant) {
    const avgRating = calculateAverageRating(restaurant.ratings);
    const reviewCount = restaurant.reviews.length;
    
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${restaurant.image}" alt="${restaurant.name}" class="card-image">
        </div>
        <div class="card-content">
            <h3 class="card-name">${restaurant.name}</h3>
            
            <div class="card-rating">
                <span class="stars">${renderStars(avgRating)}</span>
                <span class="rating-count">${avgRating.toFixed(1)} (${reviewCount})</span>
            </div>
            
            <div class="card-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${restaurant.location}</span>
            </div>
            
            <div class="card-hours">
                <i class="fas fa-clock"></i>
                <span>${restaurant.openTime} - ${restaurant.closeTime}</span>
            </div>
            
            <p class="card-description">${restaurant.description}</p>
            
            <button class="card-action" onclick="openRestaurantDetail(${restaurant.id})">
                <i class="fas fa-info-circle mr-2"></i>View Details
            </button>
        </div>
    `;
    
    return card;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

// ==================== TOP 10 LOGIC ====================
function calculateTop10() {
    const scored = restaurants.map(restaurant => {
        const avgRating = calculateAverageRating(restaurant.ratings);
        const reviewCount = restaurant.reviews.length;
        const score = (avgRating * 0.7) + (reviewCount * 0.3);
        
        return { ...restaurant, score };
    });
    
    return scored.sort((a, b) => b.score - a.score).slice(0, 10);
}

function renderTop10() {
    const top10 = calculateTop10();
    const grid = document.getElementById('top10Grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    top10.forEach((restaurant, index) => {
        const card = createRestaurantCard(restaurant);
        const rankBadge = document.createElement('div');
        rankBadge.className = 'card-rank';
        rankBadge.textContent = `#${index + 1}`;
        
        const imageContainer = card.querySelector('.card-image-container');
        if (imageContainer) {
            imageContainer.appendChild(rankBadge);
        }
        
        grid.appendChild(card);
    });
}

// ==================== MODAL FUNCTIONS ====================
function openRestaurantDetail(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    currentRestaurantId = restaurantId;
    selectedRating = 0;
    
    const avgRating = calculateAverageRating(restaurant.ratings);
    const detailContent = document.getElementById('detailContent');
    
    let reviewsHTML = '';
    restaurant.reviews.forEach(review => {
        reviewsHTML += `
            <div class="review-item">
                <div class="review-header">
                    <img src="${review.profilePic}" alt="${review.username}" class="review-avatar">
                    <div class="review-user-info">
                        <div class="review-username">${review.username}</div>
                        <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                    </div>
                    <div class="stars">${renderStars(review.rating)}</div>
                </div>
                <p class="review-text">${review.text}</p>
                ${review.foodPhotoURL ? `<img src="${review.foodPhotoURL}" alt="Food" class="review-food-image">` : ''}
            </div>
        `;
    });
    
    detailContent.innerHTML = `
        <div style="padding: 0 1.5rem 0 1.5rem; padding-top: 1.5rem;">
            <h2 style="margin-bottom: 1.5rem; padding-right: 2.5rem;">${restaurant.name}</h2>
            <img src="${restaurant.image}" alt="${restaurant.name}" style="width: 100%; border-radius: 1rem; margin-bottom: 1.5rem; max-height: 300px; object-fit: cover;">
            
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                    <div style="font-size: 1.5rem;">${renderStars(avgRating)}</div>
                    <span style="color: rgba(255,255,255,0.8);">${avgRating.toFixed(1)} (${restaurant.reviews.length} reviews)</span>
                </div>
                
                <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.location}
                </p>
                <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-clock"></i> ${restaurant.openTime} - ${restaurant.closeTime}
                </p>
                <p style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-utensils"></i> Best for: ${restaurant.bestFor}
                </p>
            </div>
            
            <p style="color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 1rem;">${restaurant.description}</p>
            
            <a href="${restaurant.mapsLink}" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background: #FF5722; color: white; text-decoration: none; border-radius: 0.5rem; font-weight: 600; transition: all 0.3s ease; margin-bottom: 1.5rem;">
                <i class="fas fa-directions mr-2"></i> Get Directions
            </a>
            
            <div style="margin: 1.5rem 0; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 1rem; border: 1px solid rgba(255, 87, 34, 0.2);">
                <h3 style="margin-bottom: 1rem; color: white;">Rate this Restaurant</h3>
                <div class="stars" style="font-size: 2.5rem; cursor: pointer;" id="ratingStars">
                    ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}" onclick="rateRestaurant(${i})" style="margin: 0 0.75rem; cursor: pointer; transition: all 0.3s ease; color: rgba(255,255,255,0.25); display: inline-block; text-shadow: 0 2px 5px rgba(255, 87, 34, 0.2);" onmouseover="highlightStars(${i})" onmouseout="resetStarHighlight()">★</span>`).join('')}
                </div>
                <p style="margin-top: 1rem; color: rgba(255,255,255,0.6); font-size: 0.9rem;">Click a star to rate</p>
            </div>
        </div>
        
        <!-- Tab Navigation -->
        <div style="display: flex; gap: 0.75rem; padding: 0 1.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap;">
            <button class="tab-btn-detail active" onclick="switchDetailTab('reviews')" style="padding: 0.75rem 1.5rem; background: transparent; border: none; color: white; font-weight: 600; cursor: pointer; border-bottom: 3px solid #FF5722;">
                <i class="fas fa-star mr-2"></i>Reviews
            </button>
            <button class="tab-btn-detail" onclick="switchDetailTab('chat')" style="padding: 0.75rem 1.5rem; background: transparent; border: none; color: rgba(255,255,255,0.7); font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent;">
                <i class="fas fa-comments mr-2"></i>Chat
            </button>
        </div>
        
        <!-- Reviews Section -->
        <div id="reviewsSection" style="padding: 0 1.5rem 1.5rem;">
            <div style="max-height: 400px; overflow-y: auto; margin-bottom: 1rem;">
                ${reviewsHTML || '<p style="color: rgba(255,255,255,0.6);">No reviews yet. Be the first!</p>'}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <textarea id="reviewInput" placeholder="Write your review..." style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; color: white; outline: none; resize: vertical; min-height: 80px;"></textarea>
                <input type="url" id="reviewFoodImage" placeholder="Food Photo URL (Optional)" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; color: white; outline: none;">
                <button onclick="postReview(${restaurantId})" style="align-self: flex-end; padding: 0.75rem 1.5rem; background: #FF5722; border: none; color: white; font-weight: 600; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-star mr-2"></i>Post Review
                </button>
            </div>
        </div>
        
        <!-- Chat Section -->
        <div id="chatSection" style="padding: 0 1.5rem 1.5rem; display: none;">
            <div id="chatMessages" style="height: 300px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;"></div>
            <div style="display: flex; gap: 0.75rem;">
                <input type="text" id="chatInput" placeholder="Ask a question..." style="flex: 1; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5rem; color: white; outline: none;">
                <button onclick="sendMessage(${restaurantId})" style="padding: 0.75rem 1rem; background: #FF5722; border: none; color: white; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
    document.body.style.overflow = '';
    currentRestaurantId = null;
}

function switchDetailTab(tabName) {
    const reviewsSection = document.getElementById('reviewsSection');
    const chatSection = document.getElementById('chatSection');
    const buttons = document.querySelectorAll('.tab-btn-detail');
    
    if (tabName === 'reviews') {
        reviewsSection.style.display = 'block';
        chatSection.style.display = 'none';
        buttons[0].style.color = 'white';
        buttons[0].style.borderBottomColor = '#FF5722';
        buttons[1].style.color = 'rgba(255,255,255,0.7)';
        buttons[1].style.borderBottomColor = 'transparent';
    } else {
        reviewsSection.style.display = 'none';
        chatSection.style.display = 'block';
        buttons[0].style.color = 'rgba(255,255,255,0.7)';
        buttons[0].style.borderBottomColor = 'transparent';
        buttons[1].style.color = 'white';
        buttons[1].style.borderBottomColor = '#FF5722';
    }
}

// ==================== STAR RATING SYSTEM FIX ====================
function highlightStars(rating) {
    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = 'rgba(255, 215, 0, 0.7)';
            star.style.transform = 'scale(1.15)';
        } else {
            star.style.color = 'rgba(255,255,255,0.15)';
            star.style.transform = 'scale(1)';
        }
    });
}

function resetStarHighlight() {
    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.style.color = '#FFD700';
            star.style.transform = 'scale(1.1)';
        } else {
            star.style.color = 'rgba(255,255,255,0.25)';
            star.style.transform = 'scale(1)';
        }
    });
}

function rateRestaurant(rating) {
    selectedRating = rating;
    
    // Update visual display
    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#FFD700';
            star.style.transform = 'scale(1.2)';
        } else {
            star.style.color = 'rgba(255,255,255,0.25)';
            star.style.transform = 'scale(1)';
        }
    });
    
    const restaurant = restaurants.find(r => r.id === currentRestaurantId);
    if (restaurant) {
        restaurant.ratings.push(rating);
        showNotification(`⭐ Rating: ${renderStars(rating)} (${rating}/5)`);
    }
}

function postReview(restaurantId) {
    if (!isLoggedIn) {
        showNotification('Please login to post a review');
        return;
    }
    
    const reviewText = document.getElementById('reviewInput')?.value;
    const foodPhotoURL = document.getElementById('reviewFoodImage')?.value;
    
    if (!reviewText || !reviewText.trim()) {
        showNotification('Please write a review');
        return;
    }
    
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    restaurant.reviews.push({
        username: currentUser.username,
        profilePic: currentUser.profilePic,
        text: reviewText,
        rating: selectedRating || 5,
        foodPhotoURL: foodPhotoURL,
        date: new Date().toISOString()
    });
    
    document.getElementById('reviewInput').value = '';
    document.getElementById('reviewFoodImage').value = '';
    selectedRating = 0;
    
    openRestaurantDetail(restaurantId);
    showNotification('Review posted successfully!');
}

function sendMessage(restaurantId) {
    const messageText = document.getElementById('chatInput')?.value;
    
    if (!messageText || !messageText.trim()) return;
    
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    restaurant.chats.push({
        username: currentUser?.username || 'Guest',
        text: messageText,
        timestamp: new Date()
    });
    
    document.getElementById('chatInput').value = '';
    renderChatMessages(restaurant.chats);
}

function renderChatMessages(chats) {
    const chatDiv = document.getElementById('chatMessages');
    if (!chatDiv) return;
    
    chatDiv.innerHTML = chats.map(chat => `
        <div style="margin-bottom: 1rem;">
            <div style="font-weight: 700; color: #FF5722;">${chat.username}</div>
            <div style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 0.5rem; color: white; display: inline-block;">${chat.text}</div>
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem;">${new Date(chat.timestamp).toLocaleTimeString()}</div>
        </div>
    `).join('');
    
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

// ==================== ADD RESTAURANT ====================
function handleSubmitRestaurant(event) {
    event.preventDefault();
    
    if (!isLoggedIn) {
        showNotification('Please login first');
        return;
    }
    
    const name = document.getElementById('submitName').value;
    const location = document.getElementById('submitLocation').value;
    const openTime = document.getElementById('submitOpenTime').value;
    const closeTime = document.getElementById('submitCloseTime').value;
    const bestFor = document.getElementById('submitBestFor').value;
    const image = document.getElementById('submitImage').value;
    const mapsLink = document.getElementById('submitMaps').value;
    const description = document.getElementById('submitDesc').value;
    
    const newRestaurant = {
        id: restaurants.length + 1,
        name,
        location,
        image,
        description,
        openTime,
        closeTime,
        bestFor,
        ratings: [5],
        reviews: [{
            username: currentUser.username,
            profilePic: currentUser.profilePic,
            text: description,
            rating: 5,
            foodPhotoURL: '',
            date: new Date().toISOString()
        }],
        mapsLink,
        chats: []
    };
    
    restaurants.push(newRestaurant);
    
    document.getElementById('submitForm').reset();
    toggleSubmitModal();
    renderRestaurants();
    
    showNotification('Restaurant added successfully!');
}

function checkRestaurantSuggestions(input) {
    const suggestionsDiv = document.getElementById('submitSuggestions');
    
    if (!input) {
        suggestionsDiv.classList.add('hidden');
        return;
    }
    
    const matches = restaurants.filter(r =>
        r.name.toLowerCase().includes(input.toLowerCase())
    );
    
    if (matches.length > 0) {
        let html = '<div style="padding: 0.75rem 1rem; color: #FFD700; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1);">⚠️ Similar restaurants found:</div>';
        matches.slice(0, 3).forEach(r => {
            html += `<div class="suggestion-item" style="cursor: default; border-left: none; padding-left: 1rem;"><i class="fas fa-info-circle"></i> ${r.name} - ${r.location}</div>`;
        });
        suggestionsDiv.innerHTML = html;
        suggestionsDiv.classList.remove('hidden');
    } else {
        suggestionsDiv.classList.add('hidden');
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #FF5722, #FF6D42);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 8px 24px rgba(255, 87, 34, 0.3);
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants();
    showNotification('Welcome to Rasa Paara! 🍽️');
    
    // Close modals when clicking outside
    document.getElementById('authModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'authModal') toggleAuthModal();
    });
    
    document.getElementById('submitModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'submitModal') toggleSubmitModal();
    });
    
    document.getElementById('detailModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') closeDetailModal();
    });
});
