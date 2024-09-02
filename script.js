const cardImages = [
    '8_page-0001.jpg', '8_page-0001.jpg', '8_page-0002.jpg', '8_page-0002.jpg', '8_page-0003.jpg', '8_page-0003.jpg',
    '8_page-0004.jpg', '8_page-0004.jpg', '8_page-0005.jpg', '8_page-0005.jpg', '8_page-0006.jpg', '8_page-0006.jpg',
    '8_page-0007.jpg', '8_page-0007.jpg', '8_page-0008.jpg', '8_page-0008.jpg', '8_page-0009.jpg', '8_page-0009.jpg',
    '8_page-0010.jpg', '8_page-0010.jpg', '8_page-0011.jpg', '8_page-0011.jpg', '8_page-0012.jpg', '8_page-0012.jpg',
    '8_page-0013.jpg', '8_page-0013.jpg', '8_page-0014.jpg', '8_page-0014.jpg', '8_page-0015.jpg', '8_page-0015.jpg'
];

let flippedCards = [];
let matchedCards = 0;
let numPlayers = 1;
let gameTime = 5; // Tempo fixo de 5 segundos por jogador
let timer;
let playerTimes = [];
let currentPlayer = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(image) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'hidden');
    cardElement.dataset.value = image;
    cardElement.style.backgroundImage = `url('images/card-back.jpg')`; // Imagem de fundo padrão
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    this.classList.add('flipped');
    this.style.backgroundImage = `url('images/${this.dataset.value}')`; // Revela a imagem
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardImages.length) {
            clearInterval(timer);
            playerTimes[currentPlayer] = parseInt(document.getElementById('time').textContent);
            currentPlayer++;
            if (currentPlayer < numPlayers) {
                setTimeout(startNewRound, 1000);
            } else {
                displayRanking();
            }
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        setTimeout(() => {
            firstCard.style.backgroundImage = `url('images/card-back.jpg')`; // Reverte para a imagem de fundo padrão
            secondCard.style.backgroundImage = `url('images/card-back.jpg')`;
        }, 1000);
    }

    flippedCards = [];
}

function startNewRound() {
    matchedCards = 0; // Reinicia o contador de cartas combinadas
    document.getElementById('game-board').innerHTML = '';
    cardImages.forEach(image => {
        const cardElement = createCard(image);
        document.getElementById('game-board').appendChild(cardElement);
    });
    shuffle(cardImages);
    startTimer();
}

function startTimer() {
    let timeRemaining = gameTime;
    document.getElementById('time').textContent = timeRemaining;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('time').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
            currentPlayer++;
            if (currentPlayer < numPlayers) {
                setTimeout(startNewRound, 1000);
            } else {
                displayRanking();
            }
        }
    }, 1000);
}

function displayRanking() {
    const rankingElement = document.getElementById('ranking');
    rankingElement.innerHTML = '<h2>Ranking dos Jogadores</h2>';
    playerTimes.forEach((time, index) => {
        const p = document.createElement('p');
        p.textContent = `Jogador ${index + 1}: ${time} segundos`;
        rankingElement.appendChild(p);
    });
}

document.getElementById('start-game').addEventListener('click', () => {
    numPlayers = parseInt(document.getElementById('num-players').value);
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('status').classList.remove('hidden');
    startNewRound();
});
