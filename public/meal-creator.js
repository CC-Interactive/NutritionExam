document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addIngredientBtn').addEventListener('click', addIngredient);
    document.getElementById('createMealForm').addEventListener('submit', createMeal);
});

let mealIngredients = [];
let meals = [];
let editingMealIndex = null;

function addIngredient() {
    const ingredientName = prompt("Enter the name of the ingredient:");
    if (ingredientName) {
        fetch(`/search?productName=${encodeURIComponent(ingredientName)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const ingredientData = data[0];
                    ingredientData.kcal = 0; // Initialisér kcal værdien til 0
                    updateIngredientList(ingredientData);
                    getFoodCompSpecs(ingredientData.foodID);
                } else {
                    alert("Ingredient not found.");
                }
            })
            .catch(error => {
                console.error('Error fetching ingredient:', error);
                alert("There was an error while fetching the ingredient information.");
            });
    }
}

function updateIngredientList(ingredientData) {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const ingredientDiv = document.createElement('div');
    ingredientDiv.textContent = `${ingredientData.foodName}`;
    ingredientsContainer.appendChild(ingredientDiv);
    mealIngredients.push(ingredientData);
}

function getFoodCompSpecs(itemID) {
    const kcalSortKey = 1030;
    fetch(`/foodCompSpecs?itemID=${encodeURIComponent(itemID)}&sortKey=${encodeURIComponent(kcalSortKey)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const kcalValue = parseFloat(data[0].resVal);
                const lastIngredientIndex = mealIngredients.length - 1;
                if (lastIngredientIndex >= 0) {
                    mealIngredients[lastIngredientIndex].kcal = kcalValue;
                    updateIngredientListWithCalories(lastIngredientIndex, kcalValue);
                }
            } else {
                console.log(`No kcal data available for itemID ${itemID}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateIngredientListWithCalories(index, kcalValue) {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const ingredientDivs = ingredientsContainer.getElementsByTagName('div');
    if (ingredientDivs[index]) {
        ingredientDivs[index].textContent += `: ${kcalValue} kcal`;
    }
}

function createMeal(e) {
    e.preventDefault();
  
    const mealName = document.getElementById('mealName').value;
    const mealDate = document.getElementById('mealDate').value;
    const totalKcal = mealIngredients.reduce((sum, ingredient) => sum + (ingredient.kcal || 0), 0);

    const mealData = {
        name: mealName,
        date: mealDate,
        ingredients: mealIngredients.map(ingredient => ({...ingredient})),
        totalKcal: totalKcal
    };

    if (editingMealIndex !== null) {
        meals[editingMealIndex] = mealData;
        editingMealIndex = null;
    } else {
        meals.push(mealData);
    }

    updateMealDisplay();
    mealIngredients = [];
    document.getElementById('createMealForm').reset();
}

function displayCreatedMeal(mealData, index) {
    const createdMealsList = document.getElementById('createdMealsList');
    const mealDiv = document.createElement('div');
    mealDiv.innerHTML = `
        Meal Name: ${mealData.name}, Total Kcal: ${mealData.totalKcal.toFixed(2)}, Date: ${mealData.date}
        <button onclick="editMeal(${index})">✎</button>
        <button onclick="deleteMeal(${index})">🗑</button>
        <button onclick="showIngredients(${index})">📖</button>
    `;
    createdMealsList.appendChild(mealDiv);
}

function editMeal(index) {
    editingMealIndex = index;
    const mealToEdit = meals[index];
    
    document.getElementById('mealName').value = mealToEdit.name;
    document.getElementById('mealDate').value = mealToEdit.date;
    
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    ingredientsContainer.innerHTML = '';
    mealToEdit.ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.textContent = `${ingredient.foodName}: ${ingredient.kcal} kcal`;
        ingredientsContainer.appendChild(ingredientDiv);
    });
    
    mealIngredients = [...mealToEdit.ingredients];
}

function deleteMeal(index) {
    meals.splice(index, 1);
    updateMealDisplay();
}

function showIngredients(index) {
    const meal = meals[index];
    alert(`Ingredients for ${meal.name}: \n` + 
          meal.ingredients.map(ing => `${ing.foodName}: ${ing.kcal} kcal`).join('\n'));
}

function updateMealDisplay() {
    const createdMealsList = document.getElementById('createdMealsList');
    createdMealsList.innerHTML = '';
    meals.forEach((meal, index) => displayCreatedMeal(meal, index));
}
