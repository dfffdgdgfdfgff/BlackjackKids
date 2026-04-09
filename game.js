// Create card deck
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

function displayDealer(instance) {
    const container = document.getElementById("dealerHand");
    container.innerHTML = "";

    switch(instance) {
        case "all":
            dealerHand.forEach(card => {
                const img = document.createElement("img");
                img.src = card.image;
                img.style.width = "100px";
                img.style.margin = "5px";

                container.appendChild(img);
            });
            return;
        case "one":
            const firstCard = dealerHand[0];

            const img1 = document.createElement("img");
            img1.src = firstCard.image;

            const img2 = document.createElement("img");
            img2.src = "cards/back.png";

            [img1, img2].forEach(img => {
                img.style.width = "100px";
                img.style.margin = "5px";
                container.appendChild(img);
            });
            return;
    }
}

// Hit & Stand functions
function hit(){
    console.log("Player hits");

    drawCard(1, playerHand);
    displayHand(playerHand, "playerHand");
    if (playerBustCheck()) {
        playerLoss();
    }
    if (playerWinCheck()) {
        playerWin();
    }
}

function stand() {
    console.log("Player stands");

    document.getElementById("hitBtn").classList.add("hidden");
    document.getElementById("standBtn").classList.add("hidden");

    // Reveal dealer's cards
    displayDealer("all");

    switch (dealerWinCheck()) {
        case "win":
            playerWin();
            return;
        case "loss":
            playerLoss();
            return;
        case "continue":
            dealerHit();
            return;
    }
}

function dealerHit() {
    setTimeout(function(){

        drawCard(1, dealerHand);

        displayDealer("all");

        switch (dealerWinCheck()) {
            case "win":
                playerWin();
                return;
            case "loss":
                playerLoss();
                return;
            case "continue":
                dealerHit();
                return;
        }
    }, 2000);
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
function startGame() {
    drawCard(2, playerHand);
    drawCard(2, dealerHand);

    displayHand(playerHand, "playerHand");
    displayDealer("one");
    showPlayBtns();

    if (playerWinCheck() && HandValue(dealerHand) == 21) {
        console.log("Pushed")
        playerWin();
        return;
    }
    if (playerWinCheck()) { // Checks if the player has blackjack
        console.log("Blackjack");
        playerWin();
        return;
    }
    if (HandValue(dealerHand) == 21) {
        console.log("Dealer has blackjack");
        playerLoss();
        return;
    }

    document.getElementById("playerHandAnnounce").classList.remove("hidden");
    document.getElementById("dealerHandAnnounce").classList.remove("hidden");
}

// Win & loss cases
function playerLoss(){
    document.getElementById("lossMsg")
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

// Buttons & elements
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

// Event listeners
document.getElementById("hitBtn").addEventListener("click", hit);
document.getElementById("standBtn").addEventListener("click", stand);
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("lossReturnBtn").addEventListener("click", returnToMenu);
document.getElementById("winReturnBtn").addEventListener("click", returnToMenu);

// Logs
console.log(playerHand);