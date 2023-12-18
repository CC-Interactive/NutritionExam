function productDetailUpdateContent(element, productId) {
	//clear element content
	element.innerHTML = '';
	recieverGetProductDataById(productId).then(product =>{
		let content = '<div id="productDetailContent' + productId + '" class="pageContent productDetailsPage">';
		content += '<div class = "pageTitle"></div>' +
			'<div class="itemBlock itemBaseInfo">' +
			'	<div class="itemRow">' +
			'		<div class = "itemCell itemFieldName">Product Name</div>' +
			'		<div class = "itemCell itemFieldValue">' + product.name + '</div>' +
			'	</div>' +
			'	<div class="itemRow">' +
			'		<div class = "itemCell itemFieldName">Product Id</div>' +
			'		<div class = "itemCell itemFieldValue">' + productId + '</div>' +
			'	</div>' +
			'</div>';

		//product characteristics block
		content += '<div class="itemBlock itemDetailedInfo">' +
			'<div class="itemBlockTitle">Nutrition</div>';
		for (key in product.characteristics) {
			content += '' +
				'<div class="itemRow">' +
				'	<div class = "itemCell itemFieldName">' + appData.productCharacteristics[key].data.parameterName + '</div>' +
				'	<div class = "itemCell itemFieldValue">' + product.characteristics[key] + '</div>' +
				'</div>';
		}
		content += '</div>';

		content += '</div>';
		element.innerHTML += content;
	});
}