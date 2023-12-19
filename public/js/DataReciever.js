async function recieverSearchProductByName(productName) {

	return new Promise((resolve, reject) => {
		integrationFoodItemsSearch(productName).then(response => {
			const promiseArr = [];
			response.forEach(intProduct => {
				if (!appData.products[intProduct.foodID]) {
					_updateProductFromApiResponse(intProduct);
				}
				promiseArr.push(recieverGetProductById(intProduct.foodID));
			});
			Promise.all(promiseArr).then((results) => {
				resolve(results);
			});
		});
	});
}

async function recieverGetProductById(productId) {
	return new Promise((resolve, reject) => {
		if (appData.products[productId]) {
			resolve(appData.products[productId]);
		} else {
			integrationFoodItemById(productId).then(response => {
				resolve(_updateProductFromApiResponse(response));
			});
		}
	});
}
function _updateProductFromApiResponse(intProduct) {
	appData.products[intProduct.foodID] = {
		id: intProduct.foodID,
		name: intProduct.foodName,
		characteristics: []
	}
	return appData.products[intProduct.foodID];
}
async function recieverGetProductDataById(productId) {
	return new Promise((resolve, reject) => {
		recieverGetProductById(productId).then(product => {
			if (product.dataLoaded) {
				resolve(product);
			} else {
				product.characteristics = [];
				const promiseArr = [];
				for (const key in appData.productCharacteristics) {
					const promise = integrationFoodCompSpec(productId, appData.productCharacteristics[key].id);
					promiseArr.push(promise);
					promise.then(response => {
						if (response[0]) {
							appData.productCharacteristics[key].data = response[0];
							product.characteristics[key] = response[0].resVal ? Number(response[0].resVal.replace(',', '.')) : response[0].resVal;
						}
					});
				}
				Promise.all(promiseArr).then((results) => {
					product.dataLoaded = true;
					resolve(product);
				});
			}
		});
	});
}
