<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();
$app->config('debug', true);

$app->get('/', function() {
	echo "Welcome to Virtual Store API";	
});

$app->get('/products', function() use ($app) {

	$db = getDB();
	$products = array();
	foreach($db->products() as $product) {
		$products[] = array(
			'id' => $product['id'],
			'name' => $product['name'],
			'description' => $product['description'],
            'price' => $product['price']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($products);
	
});

$app->post('/product', function() use ($app) {
	$db = getDB();
	$productToAdd = json_decode($app->request->getBody(), true);
	$product = $db->products->insert($productToAdd);
	
	$app->response->header('Content-Type', 'application/json');
	echo json_encode($product);
});

$app->delete('/product/:id', function($id) use ( $app ) { 
	$db = getDB();
	$response = "";
	
	$product = $db->products()->where('id', $id);
	
	if($product->fetch()){
		$result = $product->delete();
		$response = array(
			'status' => 'true',
			'message' => 'product deleted!'
		);
	}
	else{
		$response = array(
			'status' => 'false',
			'message' => 'product with $id does not exists.'
		);
		$app->response->setStatus(404);
	}
	$app ->response()->header('Content-Type', 'application/json');
	echo json_encode($response);
});

$app->run();
?>