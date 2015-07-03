<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();
$conectionDB = new connectionDB
$app->get('/', function() {
	echo "Welcome to Client API";	
});

$app->get('/clients', function() use ($app) {

	$db = getDB();
	$clients = array();
	foreach($db->clients() as $client) {
		$clients[] = array(
			'id' => $client['id'],
			'name' => $client['name'],
			'email' => $client['email']
            'phone' => $client['phone'],
			'address' => $client['address'],
			'city' => $client['city'],
            'zipcode' => $client['zipcode'],
			'username' => $client['username'],
			'password' => $client['password']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($clients);
	
});

$app->post('/client', function() use ($app) {
	$db = getDB();
	$clientToAdd = json_decode($app->request->getBody(), true);
	$client = $db->clients->insert($clientToAdd);
	
	$app->response->header('Content-Type', 'application/json');
	echo json_encode($client);
});

$app->delete('/client/:id', function($id) use ( $app ) { 
	$db = getDB();
	$response = "";
	
	$client = $db->clients()->where('id', $id);
	
	if($client->fetch()){
		$result = $client->delete();
		$response = array(
			'status' => 'true',
			'message' => 'client deleted!'
		);
	}
	else{
		$response = array(
			'status' => 'false',
			'message' => 'client with $id does not exists.'
		);
		$app->response->setStatus(404);
	}
	$app ->response()->header('Content-Type', 'application/json');
	echo json_encode($response);
});

$app->run();
?>