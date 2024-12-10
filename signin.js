document.getElementById('signin-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
  
    
    const validEmail = 'user@example.com';
    const validPassword = 'password123';
  
    if (email === validEmail && password === validPassword) {
      alert('Sign-in successful!');
      window.location.href = 'index.html'; 
    } else {
      errorMessage.textContent = 'Invalid email or password. Please try again.';
    }
  });
  