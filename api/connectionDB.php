<?php
require 'vendor/autoload.php';

function getConnection() {
	$dbhost = getenv('localhost');
	$dbuser = getenv('root');
	$dbpass = 'root';
	$dbname = 'trabalhodm104';
	$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	return $pdo;
}

function getDB() {
	$pdo = getConnection();
	$db = new NotORM($pdo);
	return $db;
}

?>