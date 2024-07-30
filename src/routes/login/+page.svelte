<script>
  import { goto } from "$app/navigation";
  let email = '';
  let password = '';

  async function handleLogin() {
    const form = document.querySelector('form');
    const formData = new FormData(form);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        goto('/dashboard');
      } else {
        alert(`Login failed: ${result.errors.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }
</script>

<style>
  /* Navigation Styles */
  nav {
    background-color: #f7f7f7;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    text-align: center;
  }

  nav h1 {
    margin: 0;
    font-weight: bold;
  }

  /* Login Container Styles */
  .login-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 40px;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
  }

  .login-container h1 {
    text-align: center;
    margin-bottom: 20px;
    color: black;
  }

  /* Input Styles */
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input:focus {
    border-color: #aaa;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* Button Container Styles */
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* Button Styles */
  button {
    width: 100px;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
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

  footer a {
    color: #007BFF;
    text-decoration: none;
  }

  footer a:hover {
    color: #0056b3;
  }
</style>

<nav>
  <h1>Welcome Back</h1>
</nav>

<div class="login-container">
  <h1 class="text-2xl font-bold mb-8 text-center">User Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <input type="email" name="email" placeholder="Enter your email" bind:value={email} required />
    <input type="password" name="password" placeholder="Enter your password" bind:value={password} required />
    <div class="button-container">
      <button type="submit">Login</button>
    </div>
  </form>
</div>

<footer>
  <p>
    Don't have an account? <a href="/register">Register now</a>
  </p>
</footer>
