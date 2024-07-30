<script>
  import { goto } from "$app/navigation";
</script>

<style>
  /* Header Styles */
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

  header h1 {
    margin: 0;
    font-size: 24px;
  }

  /* Main Layout Styles */
  .layout {
    display: flex;
    min-height: 100vh;
    margin-top: 60px; /* Header height */
  }

  /* Sidebar Styles */
  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    border-right: 1px solid #ddd;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: width 0.3s ease;
  }

  .sidebar:hover {
    width: 300px; 
  }

  .sidebar a {
    display: block;
    padding: 15px;
    color: #333;
    text-decoration: none;
    margin-bottom: 10px;
    border-radius: 4px;
    position: relative;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .sidebar a:hover {
    background-color: #007bff;
    color: white;
  }

  .extra-options,
  .map {
    display: none;
    margin-top: 10px;
    padding-left: 20px;
    transition: opacity 0.3s ease;
  }

  .sidebar a:hover .extra-options,
  .sidebar a:hover .map {
    display: block;
  }

  .extra-options a,
  .map a {
    padding: 10px;
    color: #555;
    text-decoration: none;
    display: block;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .extra-options a:hover,
  .map a:hover {
    background-color: #eee;
    color: #333;
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    padding: 20px;
    color: #ccc;
  }

  /* Footer Styles */
  footer {
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
    padding: 20px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  footer p {
    margin: 0;
  }
</style>

<header>
  <h1>Dashboard</h1>
</header>

<div class="layout">
  <aside class="sidebar">
    <a href="/#">
      <b>Property Issuance</b>
      <div class="extra-options">
        <a href="/dashboard/propertyIssuance/issue">Issue New Property</a>
        <a href="/dashboard/propertyIssuance/update">Update Existing Property</a>
      </div>
    </a>
    <a href="/dashboard/publicmap">
      Public Map
      <div class="map">
        <a href="/dashboard/publicmap/explore">Explore Properties</a>
        <a href="/dashboard/publicmap/view">View Property Details</a>
        <a href="/dashboard/publicmap/bid">Bid for Property</a>
      </div>
    </a>
  </aside>

  <main class="main-content">
    <!-- Main content goes here -->
    <h2>Welcome to the Dashboard</h2>
    <p>Your main content area where you can display various widgets, charts, or information.</p>
  </main>
</div>

<footer>
  <p>&copy; 2024 Timechain Properties. All rights reserved.</p>
</footer>
