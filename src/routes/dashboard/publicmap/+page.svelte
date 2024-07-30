<script lang="ts">
    import { onMount } from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';

    let map: L.Map;
    let properties: Property[] = [];
    let selectedProperty: Property | null = null;

    interface Property {
        latitude: number;
        longitude: number;
        name: string;
        address: string;
    }

    onMount(async () => {
        // Initialize the map
        map = L.map('map').setView([51.505, -0.09], 13);

        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fetch property data (adjust the URL as needed)
        const response = await fetch('/api/properties');
        properties = await response.json();

        // Add markers for each property
        properties.forEach((property: Property) => {
            L.marker([property.latitude, property.longitude])
                .addTo(map)
                .bindPopup(`<b>${property.name}</b><br>${property.address}`)
                .on('click', () => {
                    selectedProperty = property;
                });
        });
    });
</script>

<header>
    <h1>Public Map</h1>
</header>

<div class="container">
    <div id="map" class="map"></div>
    {#if selectedProperty}
        <div class="details">
            <h2>Property Details</h2>
            <p><strong>Name:</strong> {selectedProperty.name}</p>
            <p><strong>Address:</strong> {selectedProperty.address}</p>
            <p><strong>Latitude:</strong> {selectedProperty.latitude}</p>
            <p><strong>Longitude:</strong> {selectedProperty.longitude}</p>
        </div>
    {/if}
</div>

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

    .container {
        max-width: 1000px;
        margin: 100px auto;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: left;
        color: black;
    }

    .map {
        height: 500px;
        width: 100%;
        border: 1px solid #ddd;
        margin-bottom: 20px;
    }

    .details {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .details h2 {
        margin-top: 0;
    }
</style>
