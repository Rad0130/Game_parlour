<?php
include 'connect.php';

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['userId'];
$gameId = $data['gameId'];
$gameName = $data['gameName'];
$borrowDate = date('Y-m-d');
$returnDate = date('Y-m-d', strtotime('+1 month'));

// Insert the borrowed game into the database
$sql = "INSERT INTO borrowed_games (user_id, game_id, game_name, borrow_date, return_date) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisss", $userId, $gameId, $gameName, $borrowDate, $returnDate);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);
?>

