const appData = {
	/**
	 * IdBaseObject
	 * {
	 *     id: {
	 *         id: -1,
	 *         mealId: -1,
	 *         productId: -1,
	 *         weight: -1,//per 100 gram of meal. Or percent in content
	 *     }
	 * }
	 */
	// mealIngredient: {
	//
	// },
	/**
	 * IdBaseObject
	 * {
	 *     id: {
	 *         id: -1,
	 *         name: null,
	 *         energy: 0,
	 *         ingredients: [],//Array of mealIngredient Id
	 *         createDate: null
	 *     }
	 * }
	 */
	mealTrecker: {
		
	},
	// 100:
	// {
	// 	"id": 100,
	// 	"name": "Meal Name",
	// 	"energy": 0,
	// 	"createDate": "2023-12-18T15:43:39.222Z",
	// 	"ingredients": {}
	// }
	meal: {
		1001: {
			id: 1001,
			name: "French frize",
			energy: 0,
			water: 0,
			protein: 0,
			fat: 0,
			fiber: 0,
			createDate: new Date("2023-12-18T20:55:43.760Z"),
			ingredients: {
				105: {
					id: 105,
					name: "French fries, deepfried, fast food",
					weight: 100,
					water: 37.085,
					protein: 3.6984375,
					fat: 14.81,
					fiber: 3.22,
					createDate: new Date("2023-12-18T23:51:50.762Z"),
					mealId: 1001,
					productId: 1209
				}
			}
		},
		1002: {
			id: 1002,
			name: "Burger",
			energy: 0,
			water: 0,
			protein: 0,
			fat: 0,
			fiber: 0,
			createDate: new Date("2023-12-18T20:56:03.824Z"),
			ingredients: {
				104: {
					id: 104,
					name: "Hamburger sandwich with salad and dressing, fast food",
					weight: 100,
					water: 55.45660377,
					protein: 9.279481132,
					fat: 11.83584906,
					fiber: 1.6,
					createDate: new Date("2023-12-18T23:50:58.087Z"),
					mealId: 1002,
					productId: 847
				}
			}
		},
		1004: {
			id: 1004,
			name: "Pizza Margarita",
			energy: 0,
			water: 0,
			protein: 0,
			fat: 0,
			fiber: 0,
			createDate: new Date("2023-12-18T20:56:35.958Z"),
			ingredients: {
				102: {
					id: 102,
					name: "Pizza with tomato and cheese, fast food",
					weight: 100,
					water: 32.675,
					protein: 13.3125,
					fat: 13.475,
					fiber: 2.4,
					createDate: new Date("2023-12-18T23:47:58.088Z"),
					mealId: 1004,
					productId: 1646
				}
			}
		}
	},
	/**
	 * IdBaseObject
	 * {
	 *     id: {
	 *         id: -1,
	 *         name: null,
	 *         characteristics: []//Array of values from  productCharacteristics.data
	 *         dataLoaded: false // data caching flag. Shows that characteristics are loaded or not
	 *     }
	 * }
	 * Data example:
	 * {
	 *  1837: {
	 *     "id": 1837,
	 *     "name": "Pearl onion. frozen",
	 *     "characteristics": [
	 *       calories: 29.14
	 *       dryMatter: 12.61
	 *       energyKj: 119.47
	 *       fat: 0
	 *       fiber: 8.05
	 *       protein: 1.21875
	 *       water: 87.39
	 *     ],
	 *     "dataLoaded": true
	 *   }
	 * }
	 */
	products: {

	},
	productCharacteristics: {
		calories: {
			id: 1030,
			data: {//FoodComposition
				compID: -1,
				foodID: -1,
				fødevareNavn: "",
				parameterName: null,
				sortKey: null,
				resVal: null,
				min: null,
				max: null,
				median: null,
				numberOfDeterminations: null,
				sources: null,
				sourceFoodID: null
			}
		},
		protein: {
			id: 1110
		},
		fat: {
			id: 1310
		},
		fiber: {
			id: 1240
		},
		dryMatter: {
			id: 1610
		},
		water: {
			id: 1620
		},
		energyKj: {
			id: 1010
		}
	}
}
let idGenerator = 10000;
function modelGenerateId() {
	idGenerator++;
	return idGenerator;
}