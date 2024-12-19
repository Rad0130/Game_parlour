document.getElementById('signin-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Welcome back!');
          window.location.href = 'homepage.html';
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
  
