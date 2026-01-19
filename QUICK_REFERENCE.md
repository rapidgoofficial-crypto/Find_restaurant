# Quick Reference - Search System Functions

## Core Functions Overview

### 1. handleSearchInput()
**Purpose:** Main search handler triggered on user input  
**Called by:** oninput event on search box, onchange on dropdowns  
**Returns:** void (updates UI directly)

**Parameters:** None (reads from DOM elements)
- `#foodSearch` - text input value
- `#mealTypeFilter` - selected meal type
- `#locationFilter` - selected location

**Flow:**
```
Get input values → Filter restaurants (3 params) → Show suggestions → Update grid
```

---

### 2. renderSmartSuggestions(filteredRestaurants)
**Purpose:** Display dropdown suggestions with ratings & metadata  
**Called by:** handleSearchInput()  
**Parameters:** 
- `filteredRestaurants` (array) - filtered restaurant objects

**Output:** Populates `#search-suggestions` dropdown with:
- Restaurant icon
- Restaurant name (bold)
- Average rating ⭐
- Location & meal type
- "View all" link if >8 results

---

### 3. renderFilteredRestaurants(filteredRestaurants)
**Purpose:** Update main restaurant grid with filtered results  
**Called by:** handleSearchInput()  
**Parameters:** 
- `filteredRestaurants` (array) - filtered restaurants

**Output:** 
- Populates `#restaurantGrid` with cards
- Shows empty state if no results

---

### 4. renderAllRestaurants()
**Purpose:** Display all restaurants (reset filters)  
**Called by:** handleSearchInput() when filters empty  
**Parameters:** None

---

### 5. getNearbyLocation()
**Purpose:** Detect user location and filter by city  
**Called by:** onclick on "Near Me" button  
**Parameters:** None

**Flow:**
```
Request geolocation → Get coordinates → Detect nearest city → 
Set dropdown → Run search → Show notification
```

**Browser Permission:** Requires location access permission

---

### 6. simulateCityDetection(latitude, longitude)
**Purpose:** Find nearest Sri Lankan city to coordinates  
**Called by:** getNearbyLocation()  
**Parameters:**
- `latitude` (number) - user's latitude
- `longitude` (number) - user's longitude

**Returns:** (string) Nearest city name

**Algorithm:**
```
For each city in {Colombo, Kandy, Galle, Jaffna, Negombo, Matara, Kaduwela, Nugegoda}:
  Calculate distance = √[(lat - city.lat)² + (lng - city.lng)²]
Return city with minimum distance
```

---

### 7. filterAction()
**Purpose:** Simple filter trigger (wrapper)  
**Called by:** onClick handlers, external code  
**Returns:** void (calls handleSearchInput internally)

---

## DOM Elements Reference

| Element ID | Type | Purpose |
|------------|------|---------|
| `foodSearch` | input | Restaurant name/cuisine search |
| `mealTypeFilter` | select | Breakfast/Lunch/Dinner filter |
| `locationFilter` | select | City/location filter |
| `search-suggestions` | div | Dropdown suggestions container |
| `restaurantGrid` | div | Main restaurant grid |

---

## CSS Classes Reference

| Class | Purpose | Blur Amount |
|-------|---------|------------|
| `.search-filter-container` | Outer wrapper | - |
| `.search-controls` | Flex container for inputs | - |
| `.search-select` | Dropdown styling | blur(15px) |
| `.search-box` | Search input wrapper | - |
| `.search-input` | Text input field | blur(15px) |
| `.nearby-btn` | Location button | - |
| `.search-suggestions` | Dropdown box | blur(20px) |
| `.suggestion-item` | Individual suggestion | - |

---

## Filter Logic (Pseudocode)

```javascript
FOR EACH restaurant IN restaurants:
  IF (
    // Text search condition
    (searchText === '' 
      OR restaurant.name.includes(searchText)
      OR restaurant.description.includes(searchText)
    )
    AND
    // Meal type condition
    (mealType === 'All' OR restaurant.bestFor === mealType)
    AND
    // Location condition
    (location === 'All' OR restaurant.location === location)
  )
  THEN:
    ADD restaurant TO filtered results
END FOR

RETURN filtered results
```

---

## Event Handlers

| Trigger | Handler | Action |
|---------|---------|--------|
| Input in search box | oninput → handleSearchInput() | Real-time filter |
| Select meal type | onchange → handleSearchInput() | Filter & refresh |
| Select location | onchange → handleSearchInput() | Filter & refresh |
| Click "Near Me" | onclick → getNearbyLocation() | Geolocation search |
| Click suggestion | onclick → openRestaurantDetail() | View restaurant |

---

## Data Structure

### Restaurant Object
```javascript
{
  id: 1,
  name: 'Ministry of Crab',
  image: 'https://...',
  location: 'Colombo',  // Must match locationFilter options
  mapsLink: 'https://maps.google.com/...',
  description: 'World-renowned seafood restaurant...',
  openTime: '12:00',
  closeTime: '23:00',
  bestFor: 'Dinner',  // Must match mealTypeFilter options
  ratings: [5, 5, 4, 5, 4, 5],
  chats: [],
  reviews: []
}
```

### City Coordinates (for geolocation)
```javascript
{
  'Colombo': { lat: 6.9271, lng: 80.7789 },
  'Kandy': { lat: 7.2906, lng: 80.6337 },
  'Galle': { lat: 6.0535, lng: 80.2210 },
  'Jaffna': { lat: 9.6615, lng: 80.7855 },
  'Negombo': { lat: 7.2092, lng: 79.8360 },
  'Matara': { lat: 5.7497, lng: 80.5350 },
  'Kaduwela': { lat: 6.8500, lng: 80.6500 },
  'Nugegoda': { lat: 6.8733, lng: 80.7869 }
}
```

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| No restaurants match filters | Show friendly "No results" message |
| Geolocation denied | Fallback to Colombo, show notification |
| Geolocation unsupported | Show warning, enable manual selection |
| Empty search with all filters | Reset to show all restaurants |
| User selects city from dropdown | Immediately run search |

---

## Performance Notes

- ✅ Suggestions limited to 8 items
- ✅ No debouncing needed (native oninput is efficient)
- ✅ DOM updated selectively (not full page reload)
- ✅ Uses vanilla JavaScript (no jQuery dependency)
- ✅ CSS animations are GPU-accelerated (transform, opacity)

---

## Browser Compatibility

### Required APIs:
- ✅ Geolocation API (for "Near Me" feature)
- ✅ CSS backdrop-filter (with -webkit prefix)
- ✅ ES6+ JavaScript (arrow functions, const/let)

### Tested On:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Chrome/Safari

---

## Customization Guide

### Add New City:
1. Add option to `#locationFilter` select in HTML
2. Add city name to filter logic (value must match restaurant.location)
3. Add coordinates to `simulateCityDetection()` function

### Change Suggestions Limit:
```javascript
// In renderSmartSuggestions()
const topSuggestions = filteredRestaurants.slice(0, 8); // Change 8 to desired number
```

### Modify Blur Amount:
```css
/* In style.css */
.search-suggestions {
  backdrop-filter: blur(20px); /* Change 20 to desired value */
}
```

### Change Orange Color:
```css
/* In style.css or root variables */
--primary-orange: #FF5722; /* Change hex code */
```

---

## Debugging Tips

### Check console for errors:
```javascript
console.log('Filtered restaurants:', filteredRestaurants);
console.log('Search text:', document.getElementById('foodSearch').value);
console.log('Meal type:', document.getElementById('mealTypeFilter').value);
console.log('Location:', document.getElementById('locationFilter').value);
```

### Verify restaurant data:
```javascript
console.log('All restaurants:', restaurants);
restaurants.forEach(r => {
  console.log(`${r.name} - ${r.bestFor} - ${r.location}`);
});
```

### Test geolocation:
```javascript
navigator.geolocation.getCurrentPosition(
  pos => console.log('Lat:', pos.coords.latitude, 'Lng:', pos.coords.longitude),
  err => console.error('Geolocation error:', err)
);
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 19, 2026 | Multi-param search, geolocation, suggestions |
| 1.0 | Jan 1, 2026 | Initial Rasa Paara launch |

---

**For more information, see UPGRADE_SUMMARY.md**
