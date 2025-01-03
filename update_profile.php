<?php
session_start();
include("connect.php");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the user is logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

// Get the logged-in user's current email
$currentEmail = $_SESSION['email'];

// Extract data from the POST request
$newFirstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : null;
$newLastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : null;
$newEmail = isset($_POST['email']) ? trim($_POST['email']) : null;
$newPassword = isset($_POST['password']) ? password_hash(trim($_POST['password']), PASSWORD_BCRYPT) : null;

// Validate mandatory fields
if (empty($newFirstName) || empty($newLastName) || empty($newEmail)) {
    echo json_encode(['status' => 'error', 'message' => 'First Name, Last Name, and Email are required']);
    exit();
}

// Check if the new email is already in use
$emailCheckQuery = "SELECT id FROM users WHERE email = ? AND email != ?";
$stmt = $conn->prepare($emailCheckQuery);
$stmt->bind_param("ss", $newEmail, $currentEmail);
$stmt->execute();
$emailCheckResult = $stmt->get_result();

if ($emailCheckResult->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email is already in use by another user']);
    exit();
}

// Build the SQL update query dynamically
$updateQuery = "UPDATE users SET firstName = ?, lastName = ?, email = ?";
$params = [$newFirstName, $newLastName, $newEmail];
$types = "sss";

if (!empty($newPassword)) {
    $updateQuery .= ", password = ?";
    $params[] = $newPassword;
    $types .= "s";
}

$updateQuery .= " WHERE email = ?";
$params[] = $currentEmail;
$types .= "s";

$stmt = $conn->prepare($updateQuery);
$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    $_SESSION['email'] = $newEmail;
    echo json_encode([
        'status' => 'success',
        'message' => 'Profile updated successfully. Please sign in again.',
        'redirect' => 'signup.html'
    ]);
} else {
    error_log("SQL Error: " . $stmt->error);
    echo json_encode(['status' => 'error', 'message' => 'Error updating profile.']);
}

$stmt->close();
$conn->close();
?>
