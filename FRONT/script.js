const cards = [
    "images/1.jpg", "images/1.jpg",
    "images/2.jpg", "images/2.jpg",
    "images/3.png", "images/3.png",
    "images/4.png", "images/4.png",
    "images/5.jpg", "images/5.jpg",
    "images/6.jpg", "images/6.jpg",
    "images/7.jpg", "images/7.jpg",
    "images/8.jpg", "images/8.jpg",
    "images/9.jpg", "images/9.jpg",
    "images/10.jpg", "images/10.jpg",
    "images/11.jpg", "images/11.jpg",
    "images/15.jpg", "images/15.jpg",
    "images/12.jpeg", "images/12.jpeg",
    "images/13.jpeg", "images/13.jpeg",
    "images/14.jpeg", "images/14.jpeg",
];

// Embaralha as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializa o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(cards).forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card-value', card);
        cardElement.setAttribute('data-index', index);

        const imgElement = document.createElement('img');
        imgElement.src = card;

        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Variáveis do jogo
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    const card = this;

    if (card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

// Função para verificar se as cartas viradas são um par
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-card-value') === secondCard.getAttribute('data-card-value')) {
        matchedPairs++;
        flippedCards = [];
        lockBoard = false;

        // Verifica se o jogo terminou
        if (matchedPairs === cards.length / 2) {
            document.getElementById('message').textContent = 'Parabéns! Você encontrou todos os pares!';
            document.getElementById('final-image').style.display = 'block'; // Mostra a imagem final
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Inicia o jogo
createBoard();
