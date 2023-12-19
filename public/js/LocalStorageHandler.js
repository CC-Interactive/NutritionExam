function localStorageHandlerGetAppDataStorageKey() {
	return 'NutritionExamAppData';
}
function localStorageHandlerStoreAppData() {
	localStorage.setItem(localStorageHandlerGetAppDataStorageKey(), JSON.stringify(appData));
}
function localStorageHandlerRestoreAppData() {
	let appDataRestored = localStorage.getItem(localStorageHandlerGetAppDataStorageKey());
	if (!appDataRestored) return;
	appDataRestored = JSON.parse(appDataRestored);
	for (mealId in appDataRestored.meal) {
		const meal = appDataRestored.meal[mealId];
		meal.createDate = new Date(meal.createDate);
		for (ingredientId in meal.ingredients) {
			const ingredient = meal.ingredients[ingredientId];
			ingredient.createDate = new Date(ingredient.createDate);
		}
	}
	appData = appDataRestored;
}
localStorageHandlerRestoreAppData();
setInterval(() => {
	localStorageHandlerStoreAppData();
}, 1000);