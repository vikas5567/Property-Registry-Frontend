<script>
  import { goto } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  let email = '';
  let password = '';
  let confirmPassword = '';

  async function handleRegister() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const form = document.querySelector('form');

    const formData = new FormData(form);

    try {
      const response = await fetch('/register', {
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
        alert(`Registration failed: ${result.errors.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }
</script>

<style>
  /* Global Styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

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

  /* Register Container Styles */
  .register-container {
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

  .register-container h1 {
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
  <h1>Create Your Account</h1>
</nav>

<div class="register-container">
  <h1 class="text-2xl font-bold mb-8 text-center">Registration</h1>
  <form on:submit|preventDefault={handleRegister}>
    <input type="email" name="email" placeholder="Enter your email" bind:value={email} />
    <input type="password" name="password" placeholder="Create a password" bind:value={password} />
    <input type="password" name="confirmPassword" placeholder="Confirm your password" bind:value={confirmPassword} />
    <div class="button-container">
      <button type="submit">Register</button>
    </div>
  </form>
</div>

<footer>
  <p>
    Already have an account? <a href="/login">Login here</a>
  </p>
</footer>
