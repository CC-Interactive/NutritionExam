const integrationApiBaseURL = 'https://nutrimonapi.azurewebsites.net/api';

async function integrationGetApiData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "GET",
		cache: "force-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			'Accept': 'application/json',
			'X-API-Key': '169546'
		},
	});
	return response.json();
}

async function integrationFoodItemById(productId) {
	return integrationGetApiData(integrationApiBaseURL + '/FoodItems/' + productId);
}

async function integrationFoodItemsSearch(productName) {
	return integrationGetApiData(integrationApiBaseURL + '/FoodItems/BySearch/' + encodeURIComponent(productName));
}

async function integrationFoodCompSpec(productId, sortKey) {
	return integrationGetApiData(integrationApiBaseURL + '/FoodCompSpecs/ByItem/' + encodeURIComponent(productId) + '/BySortKey/' + encodeURIComponent(sortKey));
}
