function searchProduct() {
	const productName = document.getElementById('searchInput').value;

	recieverSearchProductByName(productName).then(products => displayResults(products))
		.catch(error => console.error('Error:', error));

}



function displayResults(products) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<strong>${product.name} (ID: ${product.id})</strong>`;

        const specsDiv = document.createElement('div');
        productDiv.appendChild(specsDiv);

        resultDiv.appendChild(productDiv);

        // Fetch and display FoodCompSpecs for each sort key
        getFoodCompSpecs(product.id, specsDiv, [1030, 1110, 1310, 1240]);
    });
}

function getFoodCompSpecs(productId, specsDiv, sortKeys) {
	recieverGetProductDataById(productId).then(product => {
		for (key in product.characteristics) {
			specsDiv.innerHTML += '<p>' + key + ': ' + product.characteristics[key] + '</p>';
		}
	});
}

//TESTER
if (document.getElementById('createMealForm')) {
	document.getElementById('createMealForm').addEventListener('submit', function (e) {
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


	document.getElementById('createMealForm').addEventListener('submit', function (e) {
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
}

