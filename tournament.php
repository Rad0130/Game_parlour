<?php
// Include database connection
include 'connect.php';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data and sanitize inputs
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $segment = $conn->real_escape_string($_POST['segment']);

    // Insert data into the database
    $sql = "INSERT INTO tournament_registrations (name, email, segment) VALUES ('$name', '$email', '$segment')";

    if ($conn->query($sql) === TRUE) {
        // Registration successful
        echo "<script>
                alert('Registration successful!');
                window.location.href='tournament.html'; // Redirect to the main page
              </script>";
    } else {
        // Error handling
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
