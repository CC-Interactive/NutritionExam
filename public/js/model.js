const appData = {
	products: {

	},
	productCharacteristics: {
		calories: 1030,
		protein: 1110,
		fat: 1310,
		fiber: 1240
	}
}
let idGenerator = 1000;
function modelGenerateId() {
	idGenerator++;
	return idGenerator;
}