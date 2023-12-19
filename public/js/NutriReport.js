function aggregateNutritionData() {
    const aggregatedData = {};
  
    Object.values(appData.mealTrecker).forEach(mealTreckerItem => {
      const date = mealTreckerItem.addedOn;
      const mealDetails = appData.meal[mealTreckerItem.mealId];
      if (mealDetails) {
        const weightMultiplier = parseFloat(mealTreckerItem.weight) / 100;
  
        if (!aggregatedData[date]) {
          aggregatedData[date] = { meals: 0, water: 0, kcal: 0, protein: 0, fat: 0, fiber: 0 };
        }
  
        aggregatedData[date].meals += 1;
        aggregatedData[date].water += (parseFloat(mealDetails.water) || 0) * weightMultiplier;
        aggregatedData[date].kcal += parseFloat(mealTreckerItem.energy) || 0; // Assuming energy is already in kcal and does not need weight multiplier
        aggregatedData[date].protein += (parseFloat(mealDetails.protein) || 0) * weightMultiplier;
        aggregatedData[date].fat += (parseFloat(mealDetails.fat) || 0) * weightMultiplier;
        aggregatedData[date].fiber += (parseFloat(mealDetails.fiber) || 0) * weightMultiplier;
      }
    });
  
    return aggregatedData;
  }
  
  
  function createNutritionCard(date, data) {
    const card = document.createElement("div");
    card.classList.add("meal");
  
    card.innerHTML = `
      <div style="width: 20%">${date}</div>
      <div style="width: 12%">${data.meals} Meals</div>
      <div style="width: 12%">${data.water.toFixed(2)}g</div>
      <div style="width: 12%">${data.kcal.toFixed(2)} kcal</div>
      <div style="width: 12%">${data.protein.toFixed(2)}g</div>
      <div style="width: 12%">${data.fat.toFixed(2)}g</div>
      <div style="width: 12%; text-align: end;">${data.fiber.toFixed(2)}g</div>
    `;
  
    return card;
  }
  
  
  function displayNutritionReport() {
    const aggregatedData = aggregateNutritionData();
    const nutritionCardsContainer = document.getElementById("nutrition-card");
  
    nutritionCardsContainer.innerHTML = '';
  
    Object.entries(aggregatedData).forEach(([date, data]) => {
      const nutritionCard = createNutritionCard(date, data);
      nutritionCardsContainer.appendChild(nutritionCard);
    });
  }
  
  