<?php
include 'connect.php';
session_start();

// Handle JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['date']) || !isset($data['slot_time'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    exit();
}

$date = $data['date'];
$slot_time = $data['slot_time'];

// Check if the user is logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

// Get the logged-in user's ID
$email = $_SESSION['email'];
$userQuery = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($userQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$userResult = $stmt->get_result();

if ($userResult->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit();
}

$user = $userResult->fetch_assoc();
$user_id = $user['id'];

// First, check if a slot record exists for this date and time
$checkSlotQuery = "SELECT * FROM slot WHERE date = ? AND slot_time = ?";
$stmt = $conn->prepare($checkSlotQuery);
$stmt->bind_param("ss", $date, $slot_time);
$stmt->execute();
$slotResult = $stmt->get_result();

if ($slotResult->num_rows === 0) {
    // If the slot doesn't exist, create it as booked
    $createSlotQuery = "INSERT INTO slot (date, slot_time, user_id, status) VALUES (?, ?, ?, 'booked')";
    $stmt = $conn->prepare($createSlotQuery);
    $stmt->bind_param("ssi", $date, $slot_time, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Slot booked successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error creating slot: ' . $conn->error]);
    }
} else {
    // If the slot exists, check if it's available
    $slot = $slotResult->fetch_assoc();
    if ($slot['status'] === 'booked') {
        echo json_encode(['status' => 'error', 'message' => 'Slot already booked']);
    } else {
        // Update the existing slot to booked
        $bookSlotQuery = "UPDATE slot SET status = 'booked', user_id = ? WHERE date = ? AND slot_time = ?";
        $stmt = $conn->prepare($bookSlotQuery);
        $stmt->bind_param("iss", $user_id, $date, $slot_time);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Slot booked successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error booking slot: ' . $conn->error]);
        }
    }
}

$stmt->close();
$conn->close();
?>