const appData = {
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