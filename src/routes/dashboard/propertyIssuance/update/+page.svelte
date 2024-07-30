<script lang="ts">
    let propertyId = '';
    let propertyDetails: any = {};
    let message = '';

    async function handleSearch() {
        if (!propertyId) {
            message = 'Please enter a Property ID to search.';
            return;
        }

        try {
            const response = await fetch(`/api/property/${propertyId}`);
            if (!response.ok) {
                throw new Error('Property not found');
            }
            propertyDetails = await response.json();
            message = '';
        } catch (error) {
            console.error(error);
            message = 'Failed to fetch property details.';
        }
    }

    async function handleUpdate() {
        try {
            const response = await fetch(`/api/property/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update property');
            }

            const result = await response.json();
            message = `Property updated successfully: ${result.message}`;
        } catch (error) {
            console.error(error);
            message = 'Failed to update property.';
        }
    }
</script>

<header>
    <h1>Update Existing Property</h1>
</header>

<div class="container">
    <form on:submit|preventDefault={handleSearch}>
        <div class="form-group">
            <label for="propertyId">Search Property:</label>
            <input type="text" id="propertyId" bind:value={propertyId} placeholder="Enter Property ID" />
            <div class="button-container">
                <button type="submit">Search</button>
            </div>
        </div>
    </form>

    {#if propertyDetails && Object.keys(propertyDetails).length > 0}
        <form on:submit|preventDefault={handleUpdate}>
            <div class="form-group">
                <label for="latitude">Latitude:</label>
                <input type="text" id="latitude" bind:value={propertyDetails.latitude} on:input={(e) => propertyDetails.latitude = e.target.value} />
            </div>
            <div class="form-group">
                <label for="longitude">Longitude:</label>
                <input type="text" id="longitude" bind:value={propertyDetails.longitude} on:input={(e) => propertyDetails.longitude = e.target.value} />
            </div>
            <div class="form-group">
                <label for="areaCity">Area/City:</label>
                <input type="text" id="areaCity" bind:value={propertyDetails.areaCity} on:input={(e) => propertyDetails.areaCity = e.target.value} />
            </div>
            <div class="form-group">
                <label for="state">State:</label>
                <input type="text" id="state" bind:value={propertyDetails.state} on:input={(e) => propertyDetails.state = e.target.value} />
            </div>
            <div class="form-group">
                <label for="ownerPublicAddress">Owner Public Address:</label>
                <input type="text" id="ownerPublicAddress" bind:value={propertyDetails.ownerPublicAddress} on:input={(e) => propertyDetails.ownerPublicAddress = e.target.value} />
            </div>
            <div class="form-group">
                <label for="defaultBidAmount">Default Bid Amount:</label>
                <input type="number" id="defaultBidAmount" bind:value={propertyDetails.defaultBidAmount} on:input={(e) => propertyDetails.defaultBidAmount = e.target.value} />
            </div>
            <div class="button-container">
                <button type="submit">Update Property</button>
            </div>
        </form>
    {/if}

    {#if message}
        <p class="message">{message}</p>
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
        height: 60px;
        align-items: center;
    }


    .container {
     max-width: 600px;
     margin: 40px auto;
     padding: 20px;
     background-color: #f9f9f9;
     border: 1px solid #ddd;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
     text-align: left;
     color: black;
     margin-top: 150px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 10px;
        color: black;
        text-align: center;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        color: black;
        margin-bottom: 20px;
    }

    .button-container {
        display: flex;
        justify-content: center; /* Center horizontally */
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
        margin-top: 20px;
        color: red;
        text-align: center;
    }
</style>
