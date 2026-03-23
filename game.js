import { createDeck } from "./deck.js";

const deck = createDeck();

const playerHand = [];
const dealerHand = [];

// Drawing & returning cards
function drawCard(amount, hand) {
    for (let i = 0; i < amount; i++) {
        if (deck.length == 0) return;

        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck.splice(randomIndex, 1)[0];
        hand.push(card);
    }
}

// Showcards
function displayHand(hand, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    hand.forEach(card => {
        const img = document.createElement("img");
        img.src = card.image;
        img.style.width = "100px";
        img.style.margin = "5px";

        container.appendChild(img);
    });
}

// Hit & Stand functions
function hit(){
    console.log("Player hits");

    drawCard(1, playerHand);
    displayHand(playerHand, "playerHand");
    if (playerBustCheck()){
        playerLoss();
    }
    if (playerWinCheck()){
        playerWin();
    }
}

function stand() {
    console.log("Player stands");
    document.getElementById("hitBtn").classList.add("hidden");

    drawCard(1, dealerHand);

    displayHand(dealerHand, "dealerHand");

    switch (dealerWinCheck()){
        case "win":
            playerWin();
            return;
        case "loss":
            playerLoss();
            return;
        case "continue":
            return;
    }
}

// Get hand values
function HandValue(hand) {
    let totalValue = 0;
    let aceCount = 0;

    hand.forEach(card => {
        if (card.name.includes("Ace")) {
            totalValue += 11;
            aceCount++;
        } else {
            totalValue += card.value;
        }
    });

    // Convert Aces from 11 to 1 if needed
    while (totalValue > 21 && aceCount > 0) {
        totalValue -= 10;
        aceCount--;
    }

    return totalValue;
}

// Value checks
function playerBustCheck() {
    return HandValue(playerHand) > 21;
}

function playerWinCheck() {
    return HandValue(playerHand) == 21;
}

function dealerWinCheck() {
    if (HandValue(dealerHand) > HandValue(playerHand) && HandValue(dealerHand) < 22){
        return("loss");
    }
    if (HandValue(dealerHand) > 21) {
        return("win");
    }
    return("continue");
}

// Start
function startGame(){
    drawCard(2, playerHand);
    drawCard(2, dealerHand);

    document.getElementById("playerHandAnnounce").classList.remove("hidden");
    document.getElementById("dealerHandAnnounce").classList.remove("hidden");

    displayHand(playerHand, "playerHand");
    displayHand(dealerHand, "dealerHand");
    showPlayBtns();

    if (playerWinCheck()){ // Checks if the player has blackjack
        console.log("Blackjack!");
        playerWin();
        return;
    }
}

// Win & loss cases
function playerLoss(){
    document.getElementById("lossMsg").classList.remove("hidden");
    document.getElementById("lossReturnBtn").classList.remove("hidden");
    document.getElementById("hitBtn").classList.add("hidden");
    document.getElementById("standBtn").classList.add("hidden");
    
    console.log("Bust");
}

function playerWin(){
    document.getElementById("winMsg").classList.remove("hidden");
    document.getElementById("winReturnBtn").classList.remove("hidden");
    document.getElementById("hitBtn").classList.add("hidden");
    document.getElementById("standBtn").classList.add("hidden");

    console.log("Win");
}

function returnToMenu(){
    window.location.reload()
}

function showPlayBtns(){
    // Buttons
    document.getElementById("hitBtn").classList.remove("hidden");
    document.getElementById("standBtn").classList.remove("hidden");
    document.getElementById("playBtn").classList.add("hidden");

    // Document elements
    document.body.classList.remove("menu");
    document.body.classList.add("game");
}

// event listeners
document.getElementById("hitBtn").addEventListener("click", hit);
document.getElementById("standBtn").addEventListener("click", stand);
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("lossReturnBtn").addEventListener("click", returnToMenu);
document.getElementById("winReturnBtn").addEventListener("click", returnToMenu);


console.log(playerHand);