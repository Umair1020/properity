<?php
// Hostinger ke database credentials
$servername = "localhost"; // Usually "localhost" on Hostinger
$username = "user_prop_sear"; // Database username
$password = "Prop12345678_"; // Database password
$dbname = "prop_search_db"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
