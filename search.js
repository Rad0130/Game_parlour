document.getElementById('search-button').addEventListener('click', () => {
    const genre = document.getElementById('search-input').value.trim();
    
    if (!genre) {
      alert('Please enter a genre!');
      return;
    }
  
    // Fetch search results
    fetch(`/api/search?genre=${encodeURIComponent(genre)}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = ''; // Clear previous results
  
        if (data.length === 0) {
          resultsDiv.innerHTML = '<p>No games found for this genre.</p>';
        } else {
          data.forEach(game => {
            const gameElement = document.createElement('p');
            gameElement.textContent = `${game.name} (${game.genre})`;
            resultsDiv.appendChild(gameElement);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching games:', error);
        alert('An error occurred while searching. Please try again.');
      });
  });
  