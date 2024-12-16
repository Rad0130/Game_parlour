const slots = [];

function bookSlot() {
    const playerName = prompt("Enter your name:");
    const game = prompt("Which game would you like to play? (e.g., GTA 5, FIFA, COD)");
    const timeSlot = prompt("Enter your preferred time slot (e.g., 2 PM - 3 PM):");

    if (playerName && game && timeSlot) {
        slots.push({ playerName, game, timeSlot });
        alert(`Slot booked successfully!\nName: ${playerName}\nGame: ${game}\nTime: ${timeSlot}`);
        updateSlotList();
    } else {
        alert("Please provide valid information to book a slot.");
    }
}

function updateSlotList() {
    const slotList = document.getElementById("slot-list");
    slotList.innerHTML = ""; // Clear previous entries
    slots.forEach((slot, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${slot.playerName} - ${slot.game} (${slot.timeSlot})`;
        slotList.appendChild(listItem);
    });
}

// Borrowing Games
const borrowedGames = [];

function borrowGame() {
    const gameName = prompt("Enter the game you want to borrow:");
    const returnDate = prompt("Enter the return deadline (e.g., YYYY-MM-DD):");

    if (gameName && returnDate) {
        borrowedGames.push({ gameName, returnDate });
        alert(`Game borrowed successfully!\nGame: ${gameName}\nReturn By: ${returnDate}`);
        updateBorrowedGamesList();
    } else {
        alert("Please provide valid information to borrow a game.");
    }
}

function updateBorrowedGamesList() {
    const borrowList = document.getElementById("borrowed-games-list");
    borrowList.innerHTML = ""; // Clear previous entries
    borrowedGames.forEach((game, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${game.gameName} - Return By: ${game.returnDate}`;
        borrowList.appendChild(listItem);
    });
}

// Tournament Registration
const tournamentPlayers = [];

function registerForTournament() {
    const playerName = prompt("Enter your name:");
    const game = prompt("Which game will you compete in?");

    if (playerName && game) {
        tournamentPlayers.push({ playerName, game });
        alert(`Registered successfully for the tournament!\nName: ${playerName}\nGame: ${game}`);
        updateTournamentList();
    } else {
        alert("Please provide valid information to register for the tournament.");
    }
}

function updateTournamentList() {
    const tournamentList = document.getElementById("tournament-list");
    tournamentList.innerHTML = ""; // Clear previous entries
    tournamentPlayers.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.playerName} - Competing in: ${player.game}`;
        tournamentList.appendChild(listItem);
    });
}

// Interactive Animations
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".game-card");
    galleryItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.transform = "scale(1.1)";
        });
        item.addEventListener("mouseout", () => {
            item.style.transform = "scale(1)";
        });
    });
});
