function loadMealRecords() {
    const mealList = document.getElementById("mealList");
  
    Object.values(appData.mealTrecker).forEach(mealData => {
      const mealRow = createMealRow(mealData);
      mealList.appendChild(mealRow);
    });
  }  

function addMeal() {
    const mealList = document.getElementById("mealList");

    const mealRow = document.createElement("div");
    mealRow.classList.add("meal");
    mealRow.setAttribute("contenteditable", "false");

    const mealSourceSelect = document.createElement("select");
    Object.keys(appData.meal).forEach((id) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = appData.meal[id].name;
      mealSourceSelect.appendChild(option);
    });

    const mealTypeSelect = document.createElement("select");
    ["Breakfast", "Lunch", "Dinner"].forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      mealTypeSelect.appendChild(option);
    });

    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.value = "100";
    weightInput.addEventListener("input", function () {
      const selectedMealId = mealSourceSelect.value; 
      const selectedMeal = appData.meal[selectedMealId];
      if (selectedMeal) {
        const weight = parseFloat(this.value);
        const energyPer100g = selectedMeal.energy;
        const calculatedEnergy = (weight / 100) * energyPer100g;
        energyInput.value = calculatedEnergy.toFixed(2); 
      }
    });

    const energyInput = document.createElement("input");
    energyInput.type = "text";
    energyInput.setAttribute("readonly", "true");

    const datePicker = document.createElement("input");
    datePicker.type = "date";

    const percentInput = document.createElement("input");
    percentInput.type = "text";
    percentInput.value = "0%";

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.onclick = function () {
      const editable =
        mealRow.getAttribute("contenteditable") === "true";
      mealRow.setAttribute("contenteditable", !editable);
    };

    const newMealId = modelGenerateId();
    const newMealData = {
      id: newMealId,
      name: "New Meal",
      type: "Dinner",
      weight: 100,
      energy: 0,
      addedOn: new Date().toISOString().split("T")[0],
      percent: 0,
      percentCons: "0%",
    };

    const newMealRow = createMealRow(newMealData);
    mealList.appendChild(newMealRow);
  }

  function createMealRow(mealData) {
    const mealRow = document.createElement("div");
    mealRow.classList.add("meal");
    mealRow.dataset.mealId = mealData.id;

    const mealNameDiv = document.createElement("div");
    mealNameDiv.classList.add("meal-name");
    mealNameDiv.style.width = "20%";
    mealNameDiv.textContent = mealData.name;
    mealRow.appendChild(mealNameDiv);

    const mealTypeDiv = document.createElement("div");
    mealTypeDiv.classList.add("meal-type");
    mealTypeDiv.style.width = "12%";
    mealTypeDiv.textContent = mealData.type;
    mealRow.appendChild(mealTypeDiv);

    const weightEnergyDiv = document.createElement("div");
    weightEnergyDiv.classList.add("weight-energy");
    weightEnergyDiv.style.width = "12%";
    weightEnergyDiv.innerHTML = `${mealData.weight}g <div class="source">${mealData.energy} Kcal</div>`;
    mealRow.appendChild(weightEnergyDiv);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.style.width = "12%";
    dateDiv.textContent = mealData.addedOn;
    mealRow.appendChild(dateDiv);

    const percentDiv = document.createElement("div");
    percentDiv.classList.add("percent");
    percentDiv.style.width = "12%";
    percentDiv.textContent = `${mealData.percent}g ${mealData.percentCons}`;
    mealRow.appendChild(percentDiv);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");
    actionsDiv.style.width = "12%";
    actionsDiv.style.justifyContent = "end";

    const editButton = document.createElement("div");
    editButton.classList.add("icon");
    editButton.textContent = "✏️";
    editButton.onclick = function () {
      if (editButton.textContent === "✏️") {
        makeEditable(mealRow, true);
        editButton.textContent = "💾";
      } else {
        saveMeal(mealRow, mealData);
        makeEditable(mealRow, false);
        editButton.textContent = "✏️";
      }
    };
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("icon");
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function() {
      deleteMeal(mealRow, mealData.id);
    };
    actionsDiv.appendChild(deleteButton);

    mealRow.appendChild(actionsDiv);

    return mealRow;
  }

  function makeEditable(mealRow, editable) {
    [...mealRow.children].forEach((div) => {
      if (div.classList.contains("meal-name") || div.classList.contains("meal-type")) {
        if (editable) {
          div.classList.add("editing");
          if (div.classList.contains("meal-name") && !div.querySelector("select")) {
            div.innerHTML = "";
            div.appendChild(createMealDropdown(appData.meal, mealRow.dataset.mealId));
          } else if (div.classList.contains("meal-type") && !div.querySelector("select")) {
            div.innerHTML = "";
            div.appendChild(createMealTypeDropdown(div.textContent.trim()));
          }
        } else {
          div.classList.remove("editing");
          const dropdown = div.querySelector("select");
          if (dropdown) {
            div.textContent = dropdown.options[dropdown.selectedIndex].text || dropdown.value;
          }
        }
      } else if (!div.classList.contains("actions")) {
        div.setAttribute("contenteditable", editable);
        if (editable) {
          div.classList.add("editing");
        } else {
          div.classList.remove("editing");
        }
      }
    });
  }
  

  function createMealDropdown(meals, selectedMealId) {
    const dropdown = document.createElement("select");
    dropdown.style.width = '100%'
    Object.entries(meals).forEach(([id, meal]) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = meal.name;
      if (id === selectedMealId) {
        option.selected = true;
      }
      dropdown.appendChild(option);
    });
    return dropdown;
  }

  function createMealTypeDropdown(selectedMealType) {
    const mealTypes = ["Breakfast", "Lunch", "Dinner"];
    const dropdown = document.createElement("select");
    dropdown.style.width = '100%'
    mealTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      if (type === selectedMealType) {
        option.selected = true;
      }
      dropdown.appendChild(option);
    });
    return dropdown;
  }

  function saveMeal(mealRow, mealData) {
    if (typeof mealData === "object" && mealData.hasOwnProperty("id")) {
      const mealId = mealData.id;

      if (!appData.mealTrecker[mealId]) {
        appData.mealTrecker[mealId] = {
          id: mealId,
          name: "",
          type: "",
          mealId: "",
          weight: 0,
          energy: 0,
          addedOn: "",
          percent: 0,
          percentCons: "0%",
        };
      }

      const mealDropdown = mealRow.querySelector(".meal-name select");
      const mealType = mealRow.querySelector(".meal-type select");
      if (mealDropdown) {
        const selectedMeal = appData.meal[mealDropdown.value];
        appData.mealTrecker[mealData.id].name = selectedMeal.name;
        appData.mealTrecker[mealData.id].mealId = selectedMeal.id;
      }

      if (mealType) {
        const selectedType = mealType.value;
        appData.mealTrecker[mealData.id].type = selectedType;
      }

      const weightDiv = mealRow.querySelector(".weight-energy");
      const energyDiv = mealRow.querySelector(".weight-energy .source");
      if (weightDiv) {
        const weight = parseFloat(
          weightDiv.textContent.replace("g", "").trim()
        );
        const selectedMealId = appData.mealTrecker[mealData.id].mealId; // Assuming mealId is stored in mealData
        const selectedMeal = appData.meal[selectedMealId];
        const energyPer100g = selectedMeal.energy;
        const calculatedEnergy = (weight / 100) * energyPer100g;
        appData.mealTrecker[mealData.id].weight = weight;
        appData.mealTrecker[mealData.id].energy =
          calculatedEnergy.toFixed(2);
        energyDiv.textContent = `${appData.mealTrecker[mealData.id].energy} Kcal`;
      }

      const dateDiv = mealRow.querySelector(".date");
      const percentDiv = mealRow.querySelector(".percent");

      appData.mealTrecker[mealId].addedOn = dateDiv.textContent;
      appData.mealTrecker[mealId].percent =
        percentDiv.textContent.split(" ")[0];
      appData.mealTrecker[mealId].percentCons =
        percentDiv.textContent.split(" ")[1];

      dateDiv.innerHTML = appData.mealTrecker[mealId].addedOn;
      percentDiv.innerHTML = `${appData.mealTrecker[mealId].percent} ${appData.mealTrecker[mealId].percentCons}`;
    } else {
      console.error("Invalid meal data provided to saveMeal function");
    }
  }

  function deleteMeal(mealRow, mealId) {
    mealRow.remove();
  
    if (appData.mealTrecker && appData.mealTrecker[mealId]) {
      delete appData.mealTrecker[mealId];
    }
  }