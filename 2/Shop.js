
// Helper function to simulate a delay
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
  
  // Store the loaded data to avoid multiple loads
  let loadedData = {};
  
  // Function to load and display data for a specific category
  async function loadData(category) {
    // Check if data is already loaded
    // if (loadedData[category]) {category
    //   console.log(`Data for "${category}" already loaded`);
    //   return loadedData[category];
    // }
  
    try {
      // Simulate the fetch using sleep
      await sleep(0);
  
      // Load the data from JSON file
      const response = await fetch(`./${category}.json`);
      const jsonData = await response.json();
      loadedData[category] = jsonData;
  
      // Display the data in the appropriate div
      const categoryDiv = document.getElementById('category');
      categoryDiv.innerHTML = `<h3>${category}</h3><ul>${jsonData.map(item => `<li>${item.name}</li>`).join('')}</ul>`;
  
      return jsonData;
    } catch (error) {
      console.error(`Error loading data for "${category}":`, error);
      throw error;
    }
  }
  
  // Click event handler for the buttons
  document.getElementById('food').addEventListener('click', async () => {
    await loadData('food');
  });
  
  document.getElementById('clothes').addEventListener('click', async () => {
    await loadData('clothes');
  });
  
  document.getElementById('accessorize').addEventListener('click', async () => {
    await loadData('accessorize');
  });
  
  // Promise.all to wait for all promises to resolve
  Promise.all([
    loadData('food'),
    loadData('clothes'),
    loadData('accessorize')
  ])
    .then(() => sleep(10)) // Wait for 10 seconds
    .then(() => {
      console.log('The process..................')
    })
