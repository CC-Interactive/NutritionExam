function mealIngeidientUpdateContent(element, mealId) {
	//clear element content
	element.innerHTML = '';
	let content = '' +
		'<div style="display: flex; gap: 20px;" class="pageContent mealIngredientPage mealId' + mealId + ' meal-tracker-card-container">' +
		'	<div class = "first-container">' +
		'	<div class = "title-container">' +
		'		<div class="title">Ingredients of ' + appData.meal[mealId].name + '</div>' +
		'			<button class="addMealButton" onclick="mealIngeidientBackToMealCreator();">Back to Meal</button>' +
		'	</div>';

	content += '<div class="itemBlock mealIngredientBlock itemBlockVertical itemBlockVertical70">';
	content += '</div></div>';
	
	content += '<div class="itemBlock itemBlockVertical itemBlockVertical30">' +
		'<div class="itemBlockTitle">Search for a Product</div>' +
		'<div class="itemRow">' +
		'	<input type="text" class="searchProductInput" placeholder="Enter product name...">' +
		'	<button class="addMealButton" onclick="mealIngredientSearchProduct()">Search</button>' +
		'</div>' +
		'<div class="itemBlock productSearchResults" style="padding: 0">' +
		'</div>';
	content += '</div>';


	content += '</div>';
	element.innerHTML += content;
	mealIngredientUpdateIngredientBlock();
	mealIngeidientFindPageContent().getElementsByClassName('searchProductInput')[0].addEventListener("keyup", (event) => {
		if (event.which === 13) {
			mealIngredientSearchProduct();
		} else if (event.which === 27) {
			mealIngredientClearSearchProduct();
		}
	});
}

function mealIngredientUpdateIngredientBlock() {
	let pageContent = mealIngeidientFindPageContent(),
		mealId = mealIngredientGetMealId(),
		ingredientBlock = pageContent.getElementsByClassName('itemBlock mealIngredientBlock')[0],
		content = '';
	content +=
		'	<div class="itemRow itemHeaderRow meal-ingredient-header">' +
		'		<div class="itemCell itemHeader source" style="width: 20%">Ingredient Name</div>' +
		'		<div class="itemCell itemHeader source" style="width: 15%">% in Meal</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%">Added on</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%; justify-content: end;">Actions</div>' +
		'	</div>' +
		'';

	for (const key in appData.meal[mealId].ingredients) {
		const item = appData.meal[mealId].ingredients[key];
		content += '' +
			'	<div class="itemRow meal mealIngredient itemId' + item.id + '">' +
			'		<div class="itemCell" style="width: 20%">' + item.name + '</div>' +
			'		<div class="itemCell editable editableFieldWeight" style="width: 15%">' + item.weight + '</div>' +
			'		<div class="itemCell" style="width: 12%">' + item.createDate.toLocaleDateString() + '</div>' +
			'		<div class="itemCell buttons" style="width: 12%; justify-content: end;">' +
			'			<div class="button buttonIngr" onclick="mealIngeidientOpenProductDetails(' + item.productId + ');">📖</div>' +
			'			<div class="button buttonEditStart" onclick="mealIngeidientEditStart(' + item.id + ');">✏️</div>' +
			'			<div class="button buttonEditFinish disabled" onclick="mealIngeidientEditFinish(' + item.id + ');">💾</div>' +
			'			<div class="button buttonEditFinish" onclick="mealIngeidientDelete(' + item.id + ');">🗑️</div>' +
			'		</div>' +
			'	</div>' +
			'';
	}
	ingredientBlock.innerHTML = content;
}
function mealIngredientGetMealId() {
	let content = mealIngeidientFindPageContent(),
		mealId = null;
	content.classList.forEach((className) => {
		if (className.startsWith('mealId')) {
			mealId = className.substring(6);
			return;
		}
	});
	return Number(mealId);
}
function mealIngeidientFindPageContent() {
	return document.getElementsByClassName("pageContent mealIngredientPage")[0];
}

function mealIngeidientFindContainer() {
	return mealIngeidientFindPageContent().parentNode
}

function mealIngredientSearchProduct() {
	let pageContent = mealIngeidientFindPageContent(),
		productName = pageContent.getElementsByClassName('searchProductInput')[0].value,
		searchResultBlock = pageContent.getElementsByClassName('itemBlock productSearchResults')[0];
	searchResultBlock.innerHTML = '';
	recieverSearchProductByName(productName).then(products => {
		products.forEach(product => {
			searchResultBlock.innerHTML+='' +
				'<div class="itemRow productSearchResult meal">' +
				'	<div class="itemCell" style="width: 70%">' + product.name + '</div>' +
				'	<div class="itemCell buttons" style="width: 12%; justify-content: end;">' +
				'		<div class="button buttonIngr" onclick="mealIngeidientOpenProductDetails(' + product.id + ');">📖</div>' +
				'		<div class="button buttonEditStart" onclick="mealIngeidientAddIngredient(' + product.id + ');">➕</div>' +
				'	</div>' +
				'</div>';
		});
	}).catch(error => console.error('Error:', error));
}
function mealIngredientClearSearchProduct() {
	let pageContent = mealIngeidientFindPageContent(),
		searchInput = pageContent.getElementsByClassName('searchProductInput')[0],
		searchResultBlock = pageContent.getElementsByClassName('itemBlock productSearchResults')[0];
	searchResultBlock.innerHTML = '';
	searchInput.value = '';
}
function mealIngeidientOpenProductDetails(productId) {
	productDetailUpdateContent(document.getElementById("ProductDescription"), productId);
	activePage('ProductDescription');
}
function mealIngeidientAddIngredient(productId) {
	let id = modelGenerateId(),
		mealId = mealIngredientGetMealId();
	recieverGetProductDataById(productId).then(product => {
		appData.meal[mealId].ingredients[id] = {
			id: id,
			name: product.name,
			weight: 0,
			energy: product.characteristics.energy,
			water: product.characteristics.water,
			protein: product.characteristics.protein,
			fat: product.characteristics.fat,
			fiber: product.characteristics.fiber,
			createDate: new Date(),
			mealId: mealIngredientGetMealId(),
			productId: product.id
		};
		mealIngredientUpdateIngredientBlock();
	});
}
function mealIngeidientEditStart(itemId) {
	let row = mealIngeidientFindPageContent().getElementsByClassName('itemRow itemId' + itemId)[0],
		editStart = row.getElementsByClassName('button buttonEditStart')[0],
		editFinish = row.getElementsByClassName('button buttonEditFinish')[0];
	row.querySelectorAll('.itemCell.editable').forEach((item) => {
		item.setAttribute('contenteditable', true);
		item.classList.add('editing');
	});
	editStart.classList.add('disabled');
	editFinish.classList.remove('disabled');
}
function mealIngeidientEditFinish(itemId) {
	let mealId = mealIngredientGetMealId(),
		row = mealIngeidientFindPageContent().getElementsByClassName('itemRow itemId' + itemId)[0],
		weightCell = row.getElementsByClassName('itemCell editable editableFieldWeight')[0];
	appData.meal[mealId].ingredients[itemId].weight = Number(weightCell.textContent);
	mealIngredientUpdateIngredientBlock();
}
function mealIngeidientDelete(itemId) {
	let mealId = mealIngredientGetMealId();
	delete appData.meal[mealId].ingredients[itemId]

	mealIngredientUpdateIngredientBlock();
}
function mealIngeidientBackToMealCreator() {
	let mealId = mealIngredientGetMealId();
	mealCreatorUpdateContent(mealCreatorFindContainer());
	activePage('MealCreator');
}
