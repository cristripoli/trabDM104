var ProductService = {

	list: [],
	
	add: function(product, callback) {
		$.ajax({
			type: 'post',
			contentType: 'application/json',
			url: 'api/product',
			data: JSON.stringify(product),
			success: function(addedProduct){
				console.log('Product created!');
				callback(addedProduct);
			},
			error: function(){
				console.log('Error to add product ' + product.name);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/product/' + id,
			success: function(response) {
				console.log('Product deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete product with id ' + id);
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/products',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	},
	
	saveToLocalStorage: function () {
		var listJson = JSON.stringify(ProductService.list);
		window.localStorage.setItem('productlist', listJson);
	},
	
	retrieveFromLocalStorage: function () {
		var listJson = window.localStorage.getItem('productlist');
		if(listJson) {
			ProductService.list = JSON.parse(listJson);
		}
	}
}