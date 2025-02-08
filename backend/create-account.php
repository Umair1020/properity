<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // React local port
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/PHPMailer/Autoload.php';

$headers = "From: umairmustafa659@gmail"

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);  // Encrypt the password
    $phone = $_POST['phone'];
    
    // Generate a random confirmation token
    $token = bin2hex(random_bytes(50));  // 50-byte token
    $token_expiration = date('Y-m-d H:i:s', strtotime('+1 hour'));  // Token expires in 1 hour

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone, token, token_expiration) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $password, $phone, $token, $token_expiration);
    $stmt->execute();

    // Prepare email confirmation link
    $confirmationLink = "http://spotcommglobal.com/confirm_email.php?token=$token";

    // Send the confirmation email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.yourmailserver.com';  // Replace with your email SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'career@spotcommglobal.com';  // Your email address
        $mail->Password = 'Career123456789.';  // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('your_email@example.com', 'Mailer');
        $mail->addAddress($email);  // Add the user's email

        $mail->isHTML(true);
        $mail->Subject = 'Confirm Your Email';
        $mail->Body    = "Click the following link to confirm your email: <a href='$confirmationLink'>Confirm Email</a>";

        $mail->send();
        echo 'Confirmation email has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>

<!-- HTML Form to Register -->
<form method="POST" action="create-account.php">
    <input type="text" name="name" placeholder="Full Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="tel" name="phone" placeholder="Phone Number" required>
    <button type="submit">Create Account</button>
</form>
