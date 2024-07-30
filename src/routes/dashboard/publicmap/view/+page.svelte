<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  interface Property {
      propertyId: string;
      location: string;
      ownerDetails: string;
      documents: string;
  }

  let propertyId: string = '';
  let property: Property | null = null;
  let message: string = '';

  // Watch for changes in the URL and fetch property details
  $: {
      if ($page.url.pathname) {
          propertyId = $page.url.pathname.split('/').pop() || '';
          fetchPropertyDetails();
      }
  }

  async function fetchPropertyDetails() {
      if (!propertyId) {
          message = 'Invalid Property ID';
          return;
      }

      try {
          const response = await fetch(`/api/properties/${propertyId}`);

          if (!response.ok) {
              throw new Error('Failed to fetch property details');
          }

          property = await response.json();
      } catch (error) {
          console.error(error);
          message = 'Failed to fetch property details.';
      }
  }

  function handleBid() {
      goto(`/bid?propertyId=${propertyId}`);
  }
</script>

<style>
header {
  background-color: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: bold;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.details {
  margin-bottom: 20px;
}

.details p {
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>

<header>
  <h1>Property Details</h1>
</header>

<div class="container">
  {#if message}
      <p class="message">{message}</p>
  {/if}

  {#if property}
      <div class="details">
          <p><strong>Property ID:</strong> {property.propertyId}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Owner:</strong> {property.ownerDetails}</p>
          <p><strong>Documents:</strong> {property.documents}</p>
      </div>
      <button on:click={handleBid}>Place a Bid</button>
  {/if}
</div>
