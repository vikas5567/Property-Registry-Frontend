<script>
  import { onMount } from 'svelte';
  let map;
  
  onMount(() => {
    initializeMap();
  });

  function initializeMap() {
    // Initialize the map using a library like Leaflet or Google Maps
    const L = window.L; // For Leaflet
    map = L.map('map').setView([51.505, -0.09], 13); // Default center and zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example marker data
    const markers = [
      { lat: 51.505, lng: -0.09, title: 'Property 1' },
      { lat: 51.515, lng: -0.1, title: 'Property 2' },
      { lat: 51.525, lng: -0.08, title: 'Property 3' }
    ];

    markers.forEach(marker => {
      L.marker([marker.lat, marker.lng]).addTo(map)
        .bindPopup(marker.title)
        .openPopup();
    });
  }
</script>

<style>
  header {
    background-color: white;
    color: black;
    padding: 15px;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    font-weight: bold;
  }

  #map {
    height: 80vh; /* Adjust as needed */
    width: 100%;
  }
</style>

<header>
  <h1>Explore Properties on the Map</h1>
</header>

<div id="map"></div>
