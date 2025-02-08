<?php
// confirm_email.php

header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$token = $_GET['token'];

$stmt = $conn->prepare("SELECT id FROM users WHERE confirmation_token = ? AND is_confirmed = FALSE");
$stmt->bind_param("s", $token);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt = $conn->prepare("UPDATE users SET is_confirmed = TRUE WHERE confirmation_token = ?");
    $stmt->bind_param("s", $token);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Email confirmed successfully. You can now log in."]);
    } else {
        echo json_encode(["error" => "Failed to confirm email."]);
    }
} else {
    echo json_encode(["error" => "Invalid or expired token."]);
}

$stmt->close();
$conn->close();
?>