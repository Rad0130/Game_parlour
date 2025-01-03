<?php
session_start();
include("connect.php");

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <link rel="stylesheet" href="game.css">
    <link rel="stylesheet" href="profile.html">
    

</head>
<body>
    <div>
      <header>
      <p  style="font-size:20px; font-weight:bold; color:Black;">
       Hello  <?php 
       if(isset($_SESSION['email'])){
        $email=$_SESSION['email'];
        $query=mysqli_query($conn, "SELECT users.* FROM `users` WHERE users.email='$email'");
        while($row=mysqli_fetch_array($query)){
            echo $row['firstName'].' '.$row['lastName'];
        }
       }
       ?>
       :)
      </p>
            <h1>Game Parlour Management System</h1>
            <p>Experience the best gaming environment and services</p>
            <div class="auth-buttons">
                <button onclick="window.location.href='index.html'">Logout</button>
                <button onclick="window.location.href='profile.html'">UpdateProfile</button>
            </div>
        </header>
          
        <nav>
            <a href="#about">About</a>
            <a href="library.html">Game Library</a>
            <a href="#slots">Slot Booking</a>
            <a href="tournament.html">Tournaments</a>
            <a href="#staff">Our Staff</a>
            <a href="#contact">Contact</a>
        </nav>
    
    
        <div class="container">
            <!-- About Section -->

            <section id="game-gallery">
                <h2>Our Featured Games</h2>
                <div class="game-grid">
                    <div class="game-card">
                        <img src="GTA5.jpeg" alt="GTA 5">
                        <h3>GTA 5</h3>
                    </div>
                    <div class="game-card">
                        <img src="FIFA.jpeg" alt="FIFA">
                        <h3>FIFA</h3>
                    </div>
                    <div class="game-card">
                        <img src="COD.jpg" alt="Call of Duty">
                        <h3>Call of Duty</h3>
                    </div>
                    <div class="game-card">
                        <img src="ASSA.jpeg" alt="Assassin's Creed">
                        <h3>Assassin's Creed</h3>
                    </div>
                </div>
            </section>

            <section id="about">
                <h2>About Us</h2>
                <p>Welcome to the Game Parlour Management System. We offer a dynamic platform for gamers to play top-tier games, participate in esports tournaments, and borrow games from our library. Our parlour is equipped with state-of-the-art facilities and managed by experienced staff to ensure the best gaming experience.</p>
            </section>

            <section id="slots">
                <h2>Slot Booking</h2>
                <p>Book your preferred time slot to play games. Slots are available on a first-come, first-serve basis. Each slot is reserved for 1-hour gameplay with options for multiplayer sessions.</p>
                <button onclick="window.location.href='slot.html'">BookSlot</button>
            </section>
    
            <!-- Staff Section -->
            <section id="staff">
                <h2>Meet Our Staff</h2>
                <p>Our dedicated team ensures smooth operations:</p>
                <ul>
                    <li>Managers: Oversee parlour activities</li>
                    <li>Cleaners: Maintain a clean and hygienic environment</li>
                    <li>Receptionists: Assist gamers with bookings and inquiries</li>
                </ul>
            </section>
    
            <!-- Contact Section -->
            <section id="contact">
                <h2>Contact Us</h2>
                <p>Email: shafiurrahmanrad@gmail.com</p>
                <p>Phone: +88 01309634127</p>
                <p>Location: West Merul Badda M-24</p>
            </section>
        </div>

        <script src="search.js" defer></script>
        <script src="index.js" defer></script>
    
        <footer>
            <p>&copy; 2024 Game Parlour Management System. All Rights Reserved.</p>
        </footer>
    </div>
</body>
</html>
