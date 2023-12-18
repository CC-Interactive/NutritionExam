function mealCreatorUpdateContent(element) {
	//clear element content
	element.innerHTML = '';
	let content = '' +
		'<div class="pageContent mealPage">' +
		'	<div class = "pageTitle">' +
		'		<div class="titleContent">Meal Creator</div>' +
		'		<div class="buttons">' +
		'			<div class="button" onclick="mealCreatorAddMeal(\'' + element.id + '\');">+</div>' +
		'		</div>' +
		'	</div>';

	content += '<div class="itemBlock itemTableInfo">' +
		'	<div class="itemRow itemHeaderRow">' +
		'		<div class="itemCell itemHeader">Meal Name</div>' +
		'		<div class="itemCell itemHeader">Total Kcal pr. 100g</div>' +
		'		<div class="itemCell itemHeader">Added on</div>' +
		'		<div class="itemCell itemHeader"># Ingredients</div>' +
		'		<div class="itemCell itemHeader">Times Eaten</div>' +
		'		<div class="itemCell itemHeader">Actions</div>' +
		'	</div>' +
		'';
	for (const key in appData.meal) {
		const meal = appData.meal[key];
		content += '' +
			'	<div class="itemRow itemId' + meal.id + '">' +
			'		<div class="itemCell editable">' + meal.name + '</div>' +
			'		<div class="itemCell">' + meal.energy + '</div>' +
			'		<div class="itemCell">' + meal.createDate.toLocaleDateString() + '</div>' +
			'		<div class="itemCell">' + meal.ingredients.length + '</div>' +
			'		<div class="itemCell"> Meal Tracker Integration </div>' +
			'		<div class="itemCell buttons">' +
			'			<div class="button buttonEdit" >edit</div>' +
			'		</div>' +
			'	</div>' +
			'';
	}
	content += '</div>';

	content += '</div>';
	element.innerHTML += content;
}
function mealCreatorAddMeal(containerId) {
	let id = modelGenerateId();
	appData.meal[id] = {
		id: id,
		name: 'Meal Name',
		energy: 0,
		createDate: new Date(),
		ingredients: []
	}
	mealCreatorUpdateContent(document.getElementById(containerId));
}
