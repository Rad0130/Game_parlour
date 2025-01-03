<?php
include 'connect.php';

// Get all booked slots
$query = "SELECT date, slot_time FROM slot WHERE status = 'booked'";
$result = $conn->query($query);

$bookedSlots = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $date = $row['date'];
        if (!isset($bookedSlots[$date])) {
            $bookedSlots[$date] = [];
        }
        $bookedSlots[$date][] = $row['slot_time'];
    }
}

header('Content-Type: application/json');
echo json_encode($bookedSlots);

$conn->close();
?>