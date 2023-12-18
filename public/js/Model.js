const appData = {
	/**
	 * IdBaseObject
	 * {
	 *     id: {
	 *         id: -1,
	 *         productId: -1,
	 *         weight: -1,//per 100 gram of meal. Or percent in content
	 *     }
	 * }
	 */
	mealIngredient: {

	},
	/**
	 * IdBaseObject
	 * {
	 *     id: {
	 *         id: -1,
	 *         name: null,
	 *         ingredients: null,//IdBaseObject of mealIngredient
	 *         createDate: null
	 *     }
	 * }
	 */
	meal: {

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