export const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

export const values = [
        { name: "Ace", value: 11 },
        { name: "Two", value: 2 },
        { name: "Three", value: 3 },
        { name: "Four", value: 4 },
        { name: "Five", value: 5 },
        { name: "Six", value: 6 },
        { name: "Seven", value: 7 },
        { name: "Eight", value: 8 },
        { name: "Nine", value: 9 },
        { name: "Ten", value: 10 },
        { name: "Jack", value: 10 },
        { name: "Queen", value: 10 },
        { name: "King", value: 10 }
];

export function createDeck() {
    const deck = [];

    for (let suit of suits) {
        for (let val of values) {
            const fileName = `${val.name.toLowerCase()}-${suit[0]}.png`;

            deck.push({
                name: `${val.name} of ${suit}`,
                value: val.value,
                image: `cards/${fileName}`
            });
        }
    }

    return deck;
}