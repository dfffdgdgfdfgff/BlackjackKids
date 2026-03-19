import { createDeck } from "./deck.js";

const deck = createDeck();

const playerHand = [];
const dealerHand = [];

function drawCard(amount, hand) {
    for (let i = 0; i < amount; i++) {
        if (deck.length == 0) return;

        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck.splice(randomIndex, 1)[0];
        hand.push(card);
    }
}

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

    while (dealerHand.length < 2) {
        drawCard(1, dealerHand);
    }

    displayHand(dealerHand, "dealerHand");
}

function playerHandValue() {
    let totalValue = 0;
    let aceCount = 0;

    playerHand.forEach(card => {
        if (card.name.includes("Ace")) {
            totalValue += 11;
            aceCount++;
        } else {
            totalValue += card.value;
        }
    });

    // Convert Aces from 11 → 1 if needed
    while (totalValue > 21 && aceCount > 0) {
        totalValue -= 10;
        aceCount--;
    }

    return totalValue;
}

function playerBustCheck() {
    return playerHandValue() > 21;
}

function playerWinCheck() {
    return playerHandValue() == 21;
}

function startGame(){
    drawCard(2, playerHand);
    drawCard(2, dealerHand);

    displayHand(playerHand, "playerHand");
    displayHand(dealerHand, "dealerHand");
    if (playerWinCheck()){
        console.log("Blackjack!");
        playerWin();
    }
}

function playerLoss(){
    console.log("Bust");
}

function playerWin(){
    console.log("Win");
}

document.getElementById("hitBtn").addEventListener("click", hit);
document.getElementById("standBtn").addEventListener("click", stand);
document.getElementById("playBtn").addEventListener("click", startGame);


console.log(playerHand);