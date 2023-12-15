

function searchProduct() {
    const productName = document.getElementById('searchInput').value;
    fetch(`/search?productName=${encodeURIComponent(productName)}`)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error:', error));
}



function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    data.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<strong>${item.foodName} (ID: ${item.foodID})</strong>`;

        const specsDiv = document.createElement('div');
        productDiv.appendChild(specsDiv);

        resultDiv.appendChild(productDiv);

        // Fetch and display FoodCompSpecs for each sort key
        getFoodCompSpecs(item.foodID, specsDiv, [1030, 1110, 1310, 1240]);
    });
}

function getFoodCompSpecs(itemID, specsDiv, sortKeys) {
    sortKeys.forEach(sortKey => {
        fetch(`/foodCompSpecs?itemID=${encodeURIComponent(itemID)}&sortKey=${encodeURIComponent(sortKey)}`)
        .then(response => response.json())
        .then(data => {
            const keyName = getSortKeyName(sortKey);
            if(data && data.length > 0 && data[0].resVal !== undefined) {
                const value = data[0].resVal; // Use 'resVal' here
                specsDiv.innerHTML += `<p>${keyName}: ${value}</p>`;
            } else {
                specsDiv.innerHTML += `<p>${keyName}: No data available</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            specsDiv.innerHTML += `<p>Failed to load data for ${keyName}</p>`;
        });
    });
}

function getSortKeyName(sortKey) {
    switch(sortKey) {
        case 1030: return 'Kcal';
        case 1110: return 'Protein';
        case 1310: return 'Fat';
        case 1240: return 'Fibers';
        default: return 'Unknown';
    }
}


//TESTER
document.getElementById('createMealForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var mealData = {
      // ... dine formdata som før ...
    };
  
    console.log("Sending data to the server:", mealData);
  
    fetch('/addMeal', {
      // ... dine fetch indstillinger som før ...
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // ... tilføj til listen som før ...
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  


document.getElementById('createMealForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Saml data fra formen
    var mealData = {
      name: document.getElementById('mealName').value,
      calories: document.getElementById('kcalPer100g').value,
      date: document.getElementById('date').value,
      timesEaten: document.getElementById('timesEaten').value
    };
  
    // Send en POST-anmodning til serveren med de indsamlede data
    fetch('/addMeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Her kan du opdatere din brugergrænseflade eller gøre andet efter succesfuld tilføjelse
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  

