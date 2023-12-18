function mealCreatorUpdateContent(element) {
	//clear element content
	element.innerHTML = '';
	let content = '' +
		'<div class="pageContent mealPage meal-tracker-card-container">' +
		'	<div class = "title-container">' +
		'		<div class="title">Meal Creator</div>' +
		'			<button class="addMealButton" onclick="mealCreatorAddMeal();">Add Meal</button>' +
		'	</div>';

	content +=
		'	<div class="itemRow itemHeaderRow meal-header">' +
		'		<div class="itemCell itemHeader source" style="width: 20%">Meal Name</div>' +
		'		<div class="itemCell itemHeader source" style="width: 15%">Total Kcal pr. 100g</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%">Added on</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%"># Ingredients</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%">Times Eaten</div>' +
		'		<div class="itemCell itemHeader source" style="width: 12%; justify-content: end;">Actions</div>' +
		'';

	content += '</div>';
	for (const key in appData.meal) {
		const meal = appData.meal[key];
		content += '' +
			'	<div class="itemRow meal itemId' + meal.id + '">' +
			'		<div class="itemCell editable editableFieldName" style="width: 20%">' + meal.name + '</div>' +
			'		<div class="itemCell" style="width: 15%">' + meal.energy + '</div>' +
			'		<div class="itemCell" style="width: 12%">' + meal.createDate.toLocaleDateString() + '</div>' +
			'		<div class="itemCell" style="width: 12%">' + meal.ingredients.length + '</div>' +
			'		<div class="itemCell" style="width: 12%"> Meal Tracker Integration </div>' +
			'		<div class="itemCell buttons" style="width: 12%; justify-content: end;">' +
			'			<div class="button buttonIngr" onclick="mealCreatorIngredient(' + meal.id + ');">📖</div>' +
			'			<div class="button buttonEditStart" onclick="mealCreatorEditStart(' + meal.id + ');">✏️</div>' +
			'			<div class="button buttonEditFinish disabled" onclick="mealCreatorEditFinish(' + meal.id + ');">💾</div>' +
			'			<div class="button buttonEditFinish" onclick="mealCreatorDelete(' + meal.id + ');">🗑</div>' +
			'		</div>' +
			'	</div>' +
			'';
	}
	content += '</div>';

	content += '</div>';
	element.innerHTML += content;
}

function mealCreatorFindPageContent() {
	return document.getElementsByClassName("pageContent mealPage")[0];
}

function mealCreatorFindContainer() {
	return mealCreatorFindPageContent().parentNode
}

function mealCreatorAddMeal() {
	let id = modelGenerateId();
	appData.meal[id] = {
		id: id,
		name: 'Meal Name',
		energy: 0,
		water: 0,
		protein: 0,
		fat: 0,
		fiber: 0,
		createDate: new Date(),
		ingredients: []
	};
	mealCreatorUpdateContent(mealCreatorFindContainer());
}

function mealCreatorEditStart(mealId) {
	let row = mealCreatorFindPageContent().getElementsByClassName('itemRow itemId' + mealId)[0],
		editStart = row.getElementsByClassName('button buttonEditStart')[0],
		editFinish = row.getElementsByClassName('button buttonEditFinish')[0];
	row.querySelectorAll('.itemCell.editable').forEach((item) => {
		item.setAttribute('contenteditable', true);
		item.classList.add('editing');
	});
	editStart.classList.add('disabled');
	editFinish.classList.remove('disabled');

	// mealCreatorUpdateContent(mealCreatorFindContainer(button));
}
function mealCreatorEditFinish(mealId) {
	let row = mealCreatorFindPageContent().getElementsByClassName('itemRow itemId' + mealId)[0],
		nameCell = row.getElementsByClassName('itemCell editable editableFieldName')[0];
	appData.meal[mealId].name = nameCell.textContent;
	mealCreatorUpdateContent(mealCreatorFindContainer());
}
function mealCreatorDelete(mealId) {
	delete appData.meal[mealId]

	mealCreatorUpdateContent(mealCreatorFindContainer());
}

