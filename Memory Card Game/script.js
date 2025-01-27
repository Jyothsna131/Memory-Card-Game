const images = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...images, ...images]; // Two of each card

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards); // Shuffle cards

const gameBoard = document.getElementById('gameBoard');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const congratulations = document.getElementById('congratulations');
let moves = 0;
let matchedPairs = 0;
let firstCard = null;
let secondCard = null;
let timer;
let secondsElapsed = 0;

function createBoard() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    moves = 0;
    secondsElapsed = 0;
    movesElement.textContent = moves;
    timerElement.textContent = '0:00';
    congratulations.style.display = 'none';

    shuffle(cards); // Shuffle cards before creating the board

    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;
        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}
function flipCard() {
    if (this.classList.contains('flipped') || secondCard) return;

    this.textContent = this.dataset.image;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesElement.textContent = moves;

        if (firstCard.dataset.image === secondCard.dataset.image) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard = null;
            secondCard = null;
            matchedPairs++;

           if (matchedPairs === images.length) {
    clearInterval(timer);
    const overlay = document.getElementById('congratulations');
    overlay.style.display = 'flex'; // Show the overlay
}


        } else {
            setTimeout(() => {
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
}

function updateTimer() {
    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', createBoard);

const playAgainButton = document.getElementById('playAgain');
playAgainButton.addEventListener('click', () => {
    const overlay = document.getElementById('congratulations');
    overlay.style.display = 'none'; // Hide the overlay
    createBoard(); // Start a new game
});


// Start the game initially
createBoard();


