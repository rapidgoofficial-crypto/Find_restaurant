// Global State
let isLoggedIn = false;
let currentUser = {
    username: '',
    email: '',
    mobile: '',
    profilePic: 'https://ui-avatars.com/api/?name=User&background=FF5722&color=fff'
};
let currentRestaurantId = null;

// Restaurant Data with expanded fields
let restaurants = [
    {
        id: 1,
        name: 'Ministry of Crab',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500',
        location: 'Colombo',
        mapsLink: 'https://maps.google.com/?q=Ministry+of+Crab+Colombo',
        description: 'World-renowned seafood restaurant specializing in Sri Lankan lagoon crabs. A must-visit culinary destination.',
        openTime: '12:00',
        closeTime: '23:00',
        bestFor: 'Dinner',
        ratings: [5, 5, 4, 5, 4, 5, 5],
        chats: [],
        reviews: []
    },
    {
        id: 2,
        name: 'Palmyrah Restaurant',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        location: 'Jaffna',
        mapsLink: 'https://maps.google.com/?q=Palmyrah+Restaurant+Jaffna',
        description: 'Authentic Jaffna cuisine with traditional recipes passed down through generations.',
        openTime: '11:00',
        closeTime: '22:00',
        bestFor: 'Lunch',
        ratings: [5, 4, 5, 5, 4],
        chats: [],
        reviews: []
    },
    {
        id: 3,
        name: 'The Gallery Café',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500',
        location: 'Colombo',
        mapsLink: 'https://maps.google.com/?q=Gallery+Cafe+Colombo',
        description: 'Chic café set in a former Geoffrey Bawa studio. Contemporary fusion cuisine.',
        openTime: '10:00',
        closeTime: '23:00',
        bestFor: 'Lunch',
        ratings: [4, 5, 4, 4, 5, 4],
        chats: [],
        reviews: []
    },
    {
        id: 4,
        name: 'Curry Leaf',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500',
        location: 'Colombo',
        mapsLink: 'https://maps.google.com/?q=Curry+Leaf+Colombo',
        description: 'Premium Sri Lankan dining experience with traditional flavors and modern presentation.',
        openTime: '12:00',
        closeTime: '23:30',
        bestFor: 'Dinner',
        ratings: [5, 5, 4, 5, 5],
        chats: [],
        reviews: []
    },
    {
        id: 5,
        name: 'Semondu Restaurant',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
        location: 'Kandy',
        mapsLink: 'https://maps.google.com/?q=Semondu+Restaurant+Kandy',
        description: 'Traditional Kandyan cuisine with spectacular city views.',
        openTime: '11:30',
        closeTime: '22:00',
        bestFor: 'Dinner',
        ratings: [4, 4, 5, 4, 4],
        chats: [],
        reviews: []
    },
    {
        id: 6,
        name: 'Refresh by Aqualunga',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
        location: 'Galle',
        mapsLink: 'https://maps.google.com/?q=Refresh+by+Aqualunga+Galle',
        description: 'Modern cafe with healthy options. Beachside dining at its finest.',
        openTime: '08:00',
        closeTime: '20:00',
        bestFor: 'Breakfast',
        ratings: [4, 5, 5, 4, 4, 5],
        chats: [],
        reviews: []
    },
    {
        id: 7,
        name: 'Nihonbashi',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
        location: 'Colombo',
        mapsLink: 'https://maps.google.com/?q=Nihonbashi+Colombo',
        description: 'Authentic Japanese cuisine with fresh sushi. A Tokyo experience in Colombo.',
        openTime: '12:00',
        closeTime: '23:00',
        bestFor: 'Dinner',
        ratings: [5, 5, 5, 4, 5, 5],
        chats: [],
        reviews: []
    },
    {
        id: 8,
        name: 'Upali\'s by Nawaloka',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
        location: 'Colombo',
        mapsLink: 'https://maps.google.com/?q=Upalis+Nawaloka+Colombo',
        description: 'Legendary Sri Lankan rice and curry restaurant. Authentic homestyle cooking.',
        openTime: '11:00',
        closeTime: '21:00',
        bestFor: 'Lunch',
        ratings: [4, 5, 4, 5, 5, 4],
        chats: [],
        reviews: []
    },
    {
        id: 9,
        name: 'Cafe Français',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500',
        location: 'Negombo',
        mapsLink: 'https://maps.google.com/?q=Cafe+Francais+Negombo',
        description: 'French-inspired bistro with fresh pastries. Perfect breakfast spot.',
        openTime: '07:00',
        closeTime: '18:00',
        bestFor: 'Breakfast',
        ratings: [4, 4, 5, 4, 5],
        chats: [],
        reviews: []
    },
    {
        id: 10,
        name: 'Matara Beach Restaurant',
        image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500',
        location: 'Matara',
        mapsLink: 'https://maps.google.com/?q=Beach+Restaurant+Matara',
        description: 'Fresh seafood caught daily. Sunset dining with ocean views.',
        openTime: '11:00',
        closeTime: '22:00',
        bestFor: 'Dinner',
        ratings: [5, 4, 4, 5, 4],
        chats: [],
        reviews: []
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants();
    renderBestForSections();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const townFilter = document.getElementById('townFilter');
    const submitForm = document.getElementById('submitForm');
    const authForm = document.getElementById('authForm');
    
    searchInput.addEventListener('input', filterRestaurants);
    townFilter.addEventListener('change', filterRestaurants);
    submitForm.addEventListener('submit', handleSubmitRestaurant);
    
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Privacy: Mask mobile number
function maskMobileNumber(mobile) {
    if (!mobile || mobile.length < 4) return mobile;
    const first3 = mobile.substring(0, 3);
    const last3 = mobile.substring(mobile.length - 3);
    return `${first3}***${last3}`;
}

// Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => section.classList.add('hidden'));
    
    document.getElementById(sectionId).classList.remove('hidden');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    if (sectionId === 'top10') {
        renderTop10();
    } else if (sectionId === 'profile') {
        renderProfile();
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Auth System
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

function handleAuth(e) {
    e.preventDefault();
    
    const username = document.getElementById('authUsername').value;
    const email = document.getElementById('authEmail').value;
    const mobile = document.getElementById('authMobile').value;
    const profilePic = document.getElementById('authProfilePic').value || 
                       `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FF5722&color=fff`;
    
    currentUser = { username, email, mobile, profilePic };
    isLoggedIn = true;
    
    document.getElementById('loginText').textContent = username;
    document.getElementById('loginBtn').style.background = '#4CAF50';
    
    toggleAuthModal();
    showNotification(`Welcome, ${username}!`);
}

function googleSignIn() {
    const randomUsers = ['Saman Silva', 'Kasun Perera', 'Nimal Fernando', 'Priya Rajapaksa'];
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    
    currentUser = {
        username: randomUser,
        email: `${randomUser.toLowerCase().replace(' ', '.')}@gmail.com`,
        mobile: '0712345678',
        profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(randomUser)}&background=FF5722&color=fff`
    };
    isLoggedIn = true;
    
    document.getElementById('loginText').textContent = randomUser;
    document.getElementById('loginBtn').style.background = '#4CAF50';
    
    toggleAuthModal();
    showNotification(`Signed in with Google as ${randomUser}!`);
}

// Profile Rendering
function renderProfile() {
    const profileContent = document.getElementById('profileContent');
    
    if (!isLoggedIn) {
        profileContent.innerHTML = `
            <i class="fas fa-user-circle text-6xl text-orange-500 mb-4"></i>
            <h2 class="text-2xl font-bold mb-4">Please Login</h2>
            <p class="text-gray-300 mb-6">Login to view your profile and activity</p>
            <button onclick="toggleAuthModal()" class="login-action-btn">
                <i class="fas fa-sign-in-alt mr-2"></i>Login Now
            </button>
        `;
        return;
    }
    
    const userReviews = restaurants.reduce((sum, r) => sum + r.reviews.filter(rev => rev.username === currentUser.username).length, 0);
    const userRatings = restaurants.reduce((sum, r) => sum + r.ratings.length, 0);
    
    profileContent.innerHTML = `
        <img src="${currentUser.profilePic}" alt="${currentUser.username}" class="profile-avatar">
        <h2 class="profile-username">${currentUser.username}</h2>
        <div class="profile-info">
            <p><i class="fas fa-envelope mr-2"></i>${currentUser.email}</p>
            <p><i class="fas fa-mobile-alt mr-2"></i><span class="masked-number">${maskMobileNumber(currentUser.mobile)}</span></p>
        </div>
        
        <div class="profile-stats">
            <div class="stat-box">
                <div class="stat-number">${userReviews}</div>
                <div class="stat-label">Reviews</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">${userRatings}</div>
                <div class="stat-label">Total Ratings</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">0</div>
                <div class="stat-label">Points</div>
            </div>
        </div>
        
        <button onclick="logout()" class="submit-btn mt-6">
            <i class="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
    `;
}

function logout() {
    isLoggedIn = false;
    currentUser = {
        username: '',
        email: '',
        mobile: '',
        profilePic: 'https://ui-avatars.com/api/?name=User&background=FF5722&color=fff'
    };
    document.getElementById('loginText').textContent = 'Login';
    document.getElementById('loginBtn').style.background = '#FF5722';
    showNotification('Logged out successfully');
    renderProfile();
}

// Restaurant Suggestions
function checkRestaurantSuggestions(value) {
    const suggestionsList = document.getElementById('suggestionsList');
    
    if (value.length < 2) {
        suggestionsList.classList.add('hidden');
        return;
    }
    
    const matches = restaurants.filter(r => 
        r.name.toLowerCase().includes(value.toLowerCase())
    );
    
    if (matches.length === 0) {
        suggestionsList.innerHTML = `
            <div class="suggestion-item">
                <i class="fas fa-plus-circle mr-2"></i>Add "${value}" as new restaurant
            </div>
        `;
        suggestionsList.classList.remove('hidden');
    } else {
        suggestionsList.innerHTML = matches.map(r => `
            <div class="suggestion-item" onclick="selectSuggestion('${r.name}')">
                <i class="fas fa-utensils mr-2"></i>${r.name} (${r.location})
            </div>
        `).join('');
        suggestionsList.innerHTML += `
            <div class="suggestion-item" onclick="clearSuggestion()">
                <i class="fas fa-plus-circle mr-2"></i>Add as new restaurant
            </div>
        `;
        suggestionsList.classList.remove('hidden');
    }
}

function selectSuggestion(name) {
    document.getElementById('submitName').value = name;
    document.getElementById('suggestionsList').classList.add('hidden');
}

function clearSuggestion() {
    document.getElementById('suggestionsList').classList.add('hidden');
}

// Restaurant Rendering
function renderRestaurants(filteredRestaurants = restaurants) {
    const grid = document.getElementById('restaurantGrid');
    grid.innerHTML = '';
    
    filteredRestaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        grid.appendChild(card);
    });
}

function renderBestForSections() {
    const lunchRestaurants = restaurants.filter(r => r.bestFor === 'Lunch');
    const dinnerRestaurants = restaurants.filter(r => r.bestFor === 'Dinner');
    
    const lunchGrid = document.getElementById('lunchGrid');
    const dinnerGrid = document.getElementById('dinnerGrid');
    
    lunchGrid.innerHTML = '';
    dinnerGrid.innerHTML = '';
    
    lunchRestaurants.forEach(r => lunchGrid.appendChild(createRestaurantCard(r)));
    dinnerRestaurants.forEach(r => dinnerGrid.appendChild(createRestaurantCard(r)));
}

function createRestaurantCard(restaurant, showRank = false, rank = null) {
    const avgRating = calculateAverageRating(restaurant.ratings);
    
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.onclick = () => openRestaurantDetail(restaurant.id);
    
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${restaurant.image}" alt="${restaurant.name}" class="card-image">
            ${showRank ? `<div class="card-rank">#${rank}</div>` : ''}
            <div class="card-best-tag">${restaurant.bestFor}</div>
        </div>
        <div class="card-content">
            <h3 class="card-name">${restaurant.name}</h3>
            <div class="card-rating">
                <div class="stars" id="stars-${restaurant.id}">
                    ${createStars(restaurant.id, avgRating)}
                </div>
                <span class="rating-text">${avgRating.toFixed(1)} (${restaurant.ratings.length})</span>
            </div>
            <p class="card-location">
                <i class="fas fa-map-marker-alt"></i>
                ${restaurant.location}
            </p>
            <p class="card-hours">
                <i class="fas fa-clock"></i>
                ${restaurant.openTime} - ${restaurant.closeTime}
            </p>
        </div>
    `;
    
    return card;
}

function createStars(restaurantId, currentRating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= Math.round(currentRating) ? 'filled' : '';
        starsHtml += `<i class="fas fa-star star ${filled}" onclick="rateRestaurant(event, ${restaurantId}, ${i})"></i>`;
    }
    return starsHtml;
}

function rateRestaurant(event, restaurantId, rating) {
    event.stopPropagation();
    
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        restaurant.ratings.push(rating);
        renderRestaurants(getFilteredRestaurants());
        renderBestForSections();
        
        showNotification(`Rated ${restaurant.name} ${rating} stars!`);
    }
}

function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

function calculateScore(restaurant) {
    const avgRating = calculateAverageRating(restaurant.ratings);
    const reviewCount = restaurant.reviews.length;
    return (avgRating * 0.7) + (Math.min(reviewCount, 20) * 0.3);
}

// 1. Real-time Smart Search with Suggestions
function handleSearchInput() {
    const text = document.getElementById('foodSearch').value.toLowerCase().trim();
    const mealType = document.getElementById('mealTypeFilter').value;
    const city = document.getElementById('locationFilter').value;
    const suggestionBox = document.getElementById('search-suggestions');

    // If all fields are empty, hide suggestions
    if (text.length === 0 && mealType === "All" && city === "All") {
        suggestionBox.classList.add('hidden');
        renderAllRestaurants();
        return;
    }

    // Filter logic combining all three parameters
    const filteredRestaurants = restaurants.filter(restaurant => {
        // Check text search in name or description
        const textMatch = text === '' || 
                         restaurant.name.toLowerCase().includes(text) || 
                         restaurant.description.toLowerCase().includes(text);
        
        // Check meal type
        const mealTypeMatch = mealType === "All" || restaurant.bestFor === mealType;
        
        // Check city/location
        const cityMatch = city === "All" || restaurant.location === city;
        
        return textMatch && mealTypeMatch && cityMatch;
    });

    // Show suggestions if there are matches
    if (filteredRestaurants.length > 0) {
        suggestionBox.classList.remove('hidden');
        renderSmartSuggestions(filteredRestaurants);
        renderFilteredRestaurants(filteredRestaurants);
    } else {
        // Show no results message
        suggestionBox.classList.remove('hidden');
        suggestionBox.innerHTML = `
            <div class="suggestion-item" style="justify-content: center; text-align: center; padding: 30px 20px;">
                <div style="width: 100%;">
                    <i class="fas fa-search" style="font-size: 2rem; color: rgba(255, 87, 34, 0.5); margin-bottom: 10px; display: block;"></i>
                    <strong>No restaurants found</strong>
                    <small style="margin-top: 8px; display: block;">Try adjusting your filters or search terms</small>
                </div>
            </div>
        `;
        renderFilteredRestaurants([]);
    }
}

// Render smart suggestions with enhanced UI
function renderSmartSuggestions(filteredRestaurants) {
    const suggestionBox = document.getElementById('search-suggestions');
    suggestionBox.innerHTML = '';
    
    // Show up to 8 suggestions
    const topSuggestions = filteredRestaurants.slice(0, 8);
    
    topSuggestions.forEach(restaurant => {
        const avgRating = calculateAverageRating(restaurant.ratings);
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion-item';
        suggestion.onclick = () => {
            document.getElementById('foodSearch').value = restaurant.name;
            suggestionBox.classList.add('hidden');
            openRestaurantDetail(restaurant.id);
        };
        
        suggestion.innerHTML = `
            <i class="fas fa-star"></i>
            <div>
                <strong>${restaurant.name}</strong>
                <small>⭐ ${avgRating.toFixed(1)} • ${restaurant.location} • ${restaurant.bestFor}</small>
            </div>
        `;
        
        suggestionBox.appendChild(suggestion);
    });
    
    // Add "View all results" if more than 8
    if (filteredRestaurants.length > 8) {
        const viewAll = document.createElement('div');
        viewAll.className = 'suggestion-item';
        viewAll.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        viewAll.style.justifyContent = 'center';
        viewAll.style.fontWeight = '600';
        viewAll.style.color = '#FF5722';
        viewAll.innerHTML = `<i class="fas fa-arrow-right"></i>View all ${filteredRestaurants.length} results`;
        suggestionBox.appendChild(viewAll);
    }
}

// Render filtered restaurants in main grid
function renderFilteredRestaurants(filteredRestaurants) {
    const restaurantGrid = document.getElementById('restaurantGrid');
    restaurantGrid.innerHTML = '';
    
    if (filteredRestaurants.length === 0) {
        restaurantGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 4rem; color: rgba(255, 255, 255, 0.2); margin-bottom: 20px; display: block;"></i>
                <h3 style="font-size: 1.5rem; color: rgba(255, 255, 255, 0.6); margin-bottom: 10px;">No restaurants match your criteria</h3>
                <p style="color: rgba(255, 255, 255, 0.4);">Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }
    
    filteredRestaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        restaurantGrid.appendChild(card);
    });
}

// Render all restaurants (used when filters are cleared)
function renderAllRestaurants() {
    renderRestaurants(restaurants);
}

// 2. Nearby Me - Geolocation Logic with City Detection
function getNearbyLocation() {
    if (navigator.geolocation) {
        showNotification("📍 Detecting your location...");
        
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            
            // For now, simulate city detection based on coordinates
            // In production, you'd use reverse geocoding API
            const detectedCity = simulateCityDetection(latitude, longitude);
            
            document.getElementById('locationFilter').value = detectedCity;
            handleSearchInput();
            showNotification(`✓ Showing restaurants near you in ${detectedCity}!`);
        }, 
        (error) => {
            showNotification("❌ Location access denied. Using default location (Colombo).");
            document.getElementById('locationFilter').value = "Colombo";
            handleSearchInput();
        });
    } else {
        showNotification("⚠️ Geolocation is not supported by your browser.");
        document.getElementById('locationFilter').value = "Colombo";
        handleSearchInput();
    }
}

// Simulate city detection based on coordinates (demo purposes)
function simulateCityDetection(latitude, longitude) {
    // Sri Lanka approximate city coordinates
    const cities = {
        'Colombo': { lat: 6.9271, lng: 80.7789, range: 0.5 },
        'Kandy': { lat: 7.2906, lng: 80.6337, range: 0.5 },
        'Galle': { lat: 6.0535, lng: 80.2210, range: 0.5 },
        'Jaffna': { lat: 9.6615, lng: 80.7855, range: 0.5 },
        'Negombo': { lat: 7.2092, lng: 79.8360, range: 0.5 },
        'Matara': { lat: 5.7497, lng: 80.5350, range: 0.5 },
        'Kaduwela': { lat: 6.8500, lng: 80.6500, range: 0.5 },
        'Nugegoda': { lat: 6.8733, lng: 80.7869, range: 0.5 }
    };
    
    let nearestCity = 'Colombo'; // Default to Colombo
    let minDistance = Infinity;
    
    // Simple distance calculation
    for (let city in cities) {
        const cityData = cities[city];
        const distance = Math.sqrt(
            Math.pow(latitude - cityData.lat, 2) + 
            Math.pow(longitude - cityData.lng, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
        }
    }
    
    return nearestCity;
}

// 3. Filter action (simple trigger for search)
function filterAction() {
    handleSearchInput();
}

// Smart Top 10
function renderTop10() {
    const sorted = [...restaurants].sort((a, b) => {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);
        return scoreB - scoreA;
    }).slice(0, 10);
    
    const grid = document.getElementById('top10Grid');
    grid.innerHTML = '';
    
    sorted.forEach((restaurant, index) => {
        const card = createRestaurantCard(restaurant, true, index + 1);
        grid.appendChild(card);
    });
}

// Submit Restaurant
function toggleSubmitModal() {
    if (!isLoggedIn) {
        showLoginOverlay();
        return;
    }
    
    const modal = document.getElementById('submitModal');
    modal.classList.toggle('hidden');
}

function handleSubmitRestaurant(e) {
    e.preventDefault();
    
    const newRestaurant = {
        id: restaurants.length + 1,
        name: document.getElementById('submitName').value,
        image: document.getElementById('submitImage').value,
        location: document.getElementById('submitTown').value,
        mapsLink: document.getElementById('submitMaps').value,
        openTime: document.getElementById('submitOpenTime').value,
        closeTime: document.getElementById('submitCloseTime').value,
        bestFor: document.getElementById('submitBestFor').value,
        description: document.getElementById('submitDesc').value,
        ratings: [],
        chats: [],
        reviews: []
    };
    
    restaurants.push(newRestaurant);
    renderRestaurants();
    renderBestForSections();
    
    e.target.reset();
    toggleSubmitModal();
    
    showNotification('Restaurant added successfully!');
}

// Restaurant Detail Modal
function openRestaurantDetail(restaurantId) {
    currentRestaurantId = restaurantId;
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (!restaurant) return;
    
    const avgRating = calculateAverageRating(restaurant.ratings);
    
    document.getElementById('detailName').textContent = restaurant.name;
    document.getElementById('detailImage').src = restaurant.image;
    document.getElementById('detailLocation').textContent = restaurant.location;
    document.getElementById('detailHours').textContent = `${restaurant.openTime} - ${restaurant.closeTime}`;
    document.getElementById('detailBestFor').textContent = restaurant.bestFor;
    document.getElementById('detailDesc').textContent = restaurant.description;
    document.getElementById('detailMapsLink').href = restaurant.mapsLink;
    document.getElementById('detailStars').innerHTML = createStars(restaurantId, avgRating);
    document.getElementById('detailRatingText').textContent = `${avgRating.toFixed(1)} (${restaurant.ratings.length} ratings)`;
    
    renderReviews(restaurant.reviews);
    renderChats(restaurant.chats);
    
    document.getElementById('detailModal').classList.remove('hidden');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
    currentRestaurantId = null;
}

// Tab Switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    contents.forEach(content => content.classList.add('hidden'));
    
    if (tabName === 'reviews') {
        document.getElementById('reviewsSection').classList.remove('hidden');
    } else if (tabName === 'chat') {
        document.getElementById('chatSection').classList.remove('hidden');
    }
}

// Reviews System
function renderReviews(reviews) {
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';
    
    if (reviews.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        reviewDiv.innerHTML = `
            <div class="review-header">
                <img src="${review.profilePic}" alt="${review.username}" class="review-avatar">
                <div class="review-user-info">
                    <div class="review-username">${review.username}</div>
                    <div class="review-date">${review.date}</div>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
            ${review.foodImage ? `<img src="${review.foodImage}" alt="Food" class="review-food-image">` : ''}
        `;
        container.appendChild(reviewDiv);
    });
}

function postReview() {
    if (!isLoggedIn) {
        showLoginOverlay();
        return;
    }
    
    const input = document.getElementById('reviewInput');
    const foodImageInput = document.getElementById('reviewFoodImage');
    const text = input.value.trim();
    
    if (!text) return;
    
    const restaurant = restaurants.find(r => r.id === currentRestaurantId);
    if (!restaurant) return;
    
    const review = {
        username: currentUser.username,
        profilePic: currentUser.profilePic,
        text: text,
        foodImage: foodImageInput.value || null,
        date: new Date().toLocaleDateString()
    };
    
    restaurant.reviews.push(review);
    renderReviews(restaurant.reviews);
    
    input.value = '';
    foodImageInput.value = '';
    
    showNotification('Review posted successfully!');
}

// Chat System
function renderChats(chats) {
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';
    
    if (chats.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">No messages yet. Start the conversation!</p>';
        return;
    }
    
    chats.forEach(chat => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.innerHTML = `
            <div class="chat-user">${chat.user}</div>
            <div class="chat-text">${chat.message}</div>
            <div class="chat-time">${chat.time}</div>
        `;
        container.appendChild(messageDiv);
    });
    
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    if (!isLoggedIn) {
        showLoginOverlay();
        return;
    }
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const restaurant = restaurants.find(r => r.id === currentRestaurantId);
    if (!restaurant) return;
    
    const chatMessage = {
        user: currentUser.username,
        message: message,
        time: new Date().toLocaleTimeString()
    };
    
    restaurant.chats.push(chatMessage);
    renderChats(restaurant.chats);
    
    input.value = '';
}

// Login Overlay
function showLoginOverlay() {
    document.getElementById('loginOverlay').classList.remove('hidden');
}

function hideLoginOverlay() {
    document.getElementById('loginOverlay').classList.add('hidden');
}

document.getElementById('loginOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'loginOverlay') {
        hideLoginOverlay();
    }
});

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 87, 34, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);