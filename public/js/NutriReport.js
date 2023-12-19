function aggregateNutritionData() {
    const aggregatedData = {};
  
    Object.values(appData.mealTrecker).forEach(meal => {
      const date = meal.addedOn;
      if (!aggregatedData[date]) {
        aggregatedData[date] = { meals: 0, water: 0, kcal: 0, protein: 0, fat: 0, fiber: 0 };
      }
      aggregatedData[date].meals += 1;
      aggregatedData[date].water += parseFloat(meal.water) || 0;
      aggregatedData[date].kcal += parseFloat(meal.energy) || 0;
      aggregatedData[date].protein += parseFloat(meal.protein) || 0;
      aggregatedData[date].fat += parseFloat(meal.fat) || 0;
      aggregatedData[date].fiber += parseFloat(meal.fiber) || 0;
    });
  
    return aggregatedData;
  }
  
  function createNutritionCard(date, data) {
    const card = document.createElement("div");
    card.classList.add("meal");
  
    card.innerHTML = `
      <div style="width: 20%">${date}</div>
      <div style="width: 12%">${data.meals}</div>
      <div style="width: 12%">${data.water.toFixed(2)}</div>
      <div style="width: 12%">${data.kcal.toFixed(2)}</div>
      <div style="width: 12%">${data.protein.toFixed(2)}</div>
      <div style="width: 12%">${data.fat.toFixed(2)}</div>
      <div style="width: 12%; text-align: end;">${data.fiber.toFixed(2)}</div>
    `;
  
    return card;
  }
  
  
  function displayNutritionReport() {
    const aggregatedData = aggregateNutritionData();
    const nutritionCardsContainer = document.getElementById("nutrition-card");
  
    // Clear existing content
    nutritionCardsContainer.innerHTML = '';
  
    Object.entries(aggregatedData).forEach(([date, data]) => {
      const nutritionCard = createNutritionCard(date, data);
      nutritionCardsContainer.appendChild(nutritionCard);
    });
  }
  
  // Call this function to update the report

  