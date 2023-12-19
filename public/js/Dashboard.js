function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    let mealsToday = 0;
    let energyToday = 0;
    let waterToday = 0;
    let proteinToday = 0;
  
    Object.values(appData.mealTrecker).forEach(mealTreckerItem => {
      if (mealTreckerItem.addedOn === today) {
        const mealDetails = appData.meal[mealTreckerItem.mealId];
        if (mealDetails) {
          const weightMultiplier = parseFloat(mealTreckerItem.weight) / 100;
          mealsToday += 1;
          energyToday += (parseFloat(mealDetails.energy) || 0) * weightMultiplier;
          waterToday += (parseFloat(mealDetails.water) || 0) * weightMultiplier;
          proteinToday += (parseFloat(mealDetails.protein) || 0) * weightMultiplier;
        }
      }
    });
  
    const recommendedKcal = 2500;
    const recommendedProtein = 450;
    const energyPercent = ((energyToday / recommendedKcal) * 100).toFixed(2);
    const proteinPercent = ((proteinToday / recommendedProtein) * 100).toFixed(2);
  
    document.querySelector('#Dashboard .card:nth-child(1) .card-content h3').textContent = mealsToday;
    document.querySelector('#Dashboard .card:nth-child(2) .card-content h3').textContent = `${energyToday.toFixed(2)} kcal`;
    document.querySelector('#Dashboard .card:nth-child(2) .card-content p').textContent = `Or ${energyPercent}% of daily recommendation`;
    document.querySelector('#Dashboard .card:nth-child(3) .card-content h3').textContent = `${waterToday.toFixed(2)}g`;
    document.querySelector('#Dashboard .card:nth-child(4) .card-content h3').textContent = `${proteinToday.toFixed(2)}g`;
    document.querySelector('#Dashboard .card:nth-child(4) .card-content p').textContent = `${proteinPercent}% of daily recommendation`;
  }
  
  updateDashboard();