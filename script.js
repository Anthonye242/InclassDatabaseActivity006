// Fetch all paintings and display them
async function loadPaintings() {
    try {
      const response = await fetch('/paintings');
      const paintings = await response.json();
      const paintingList = document.getElementById('painting-list');
  
      paintings.forEach(painting => {
        const button = document.createElement('button');
        button.textContent = painting.title;
        button.onclick = () => loadPaintingForm(painting);
        paintingList.appendChild(button);
      });
    } catch (error) {
      console.error('Error fetching paintings:', error);
    }
  }
  
  // Populate the form with selected painting data
  function loadPaintingForm(painting) {
    document.getElementById('painting-id').value = painting._id;
    document.getElementById('title').value = painting.title;
    document.getElementById('artist').value = painting.artist;
    document.getElementById('year').value = painting.year;
    document.getElementById('medium').value = painting.medium;
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', loadPaintings);
  