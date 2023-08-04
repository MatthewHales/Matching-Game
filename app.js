// Game configuration
const symbols = ['😀', '😂', '😍', '🤔', '😎', '😴', '🤢', '🤯'];
const numPairs = 4;

// Game state
let cards = [];
let selectedCards = [];
let matches = [];

// Game board
const gameBoard = document.querySelector('#game-board');

// Restart button
const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', startGame);

// Start the game
startGame();

function startGame() {
    // Reset game state
    cards = [];
    selectedCards = [];
    matches = [];

    // Generate cards
    for (let i = 0; i < numPairs; i++) {
        const symbol = symbols[i];
        const card1 = createCard(symbol);
        const card2 = createCard(symbol);
        cards.push(card1, card2);
    }
    shuffleCards(cards);

    // Render cards
    gameBoard.innerHTML = '';
    cards.forEach(card => gameBoard.appendChild(card));

    // Add click event listener to cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Don't do anything if card is already matched or selected
            if (card.classList.contains('matched') || selectedCards.includes(card)) {
                return;
            }

            // Flip card over
            card.classList.add('selected');
            selectedCards.push(card);

            // Check for match
            if (selectedCards.length === 2) {
                const [card1, card2] = selectedCards;
                if (card1.textContent === card2.textContent) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matches.push(card1, card2);
                    selectedCards = [];

                    // Check if game is over
                    if (matches.length === cards.length) {
                        alert('You won!');
                    }
                } else {
                    // Flip cards back over
                    setTimeout(() => {
                        card1.classList.remove('selected');
                        card2.classList.remove('selected');
                        selectedCards = [];
                    }, 1000);
                }
            }
        });
    });
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    return card;
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}