// JavaScript for Sign-Up Form
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
  
    // Validate and send to backend
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Registration successful! Welcome to Game Parlour!');
          document.getElementById('signup-form').reset();
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  fetch('http://localhost:5000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Registration Successful!');
        window.location.href = 'signin.html';
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch((error) => console.error('Error:', error));
  
