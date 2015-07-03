var ProductController = {
	
	init: function () {
		ProductController.setForm();
		ProductController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			ProductController.addProduct(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		ProductController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		ProductController.setFocus();
	},
	
	addProduct: function(form) {
		var product = {
			name: form.name.value,
			email: form.email.value
		};
		ProductService.add(product, function(addedProduct){
			ProductController.addToHTML(addedProduct);	
			ProductController.clearForm();
		});
	},
	
	deleteProduct: function(imgDelete) {
		var 
			productName = imgDelete.dataset.productname,
			productId = imgDelete.dataset.productid;
		
		if(confirm('Are you sure to delete ' + productName + '?')) {
			ProductService.remove(productId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		var list = ProductService.getList(function(list) {
			list.forEach(function(product) {
				ProductController.addToHTML(product);
			});
		});
	},
	
	addToHTML: function (product) {
		var
			productList = document.getElementById('productList'),
			dl = document.createElement('dl'),
			dt = ProductController.createDT(product),
			ddName = ProductController.createDD(product.name, 'name'),
			imgDelete = ProductController.createDelete(product),
			ddEmail = ProductController.createDD(product.email, 'email');
		
		ddName.appendChild(imgDelete);
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddEmail);
		
		productList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(product) {
		var 
			dt = document.createElement('dt'),
			img = ProductController.createImage('http://www.gravatar.com/avatar/hash-md5');
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createDelete: function(product) {
		var imgDelete = ProductController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-productid', product.id);
		imgDelete.setAttribute('data-productname', product.name);
		
		imgDelete.addEventListener('click', function() {
			ProductController.deleteProduct(this);
		});
		
		return imgDelete;
	}

};

//initialization
ProductController.init();
