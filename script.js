const words = [
    {cat: "gos", eng: "dog"},
    {cat: "gat", eng: "cat"},
    {cat: "casa", eng: "house"},
    {cat: "arbre", eng: "tree"},
    {cat: "llibre", eng: "book"},
    {cat: "taula", eng: "table"},
    {cat: "cadira", eng: "chair"},
    {cat: "finestra", eng: "window"},
    {cat: "porta", eng: "door"},
    {cat: "sol", eng: "sun"}
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    document.getElementById('score').textContent = '0';

    // Create array with both Catalan and English cards
    cards = [...words.map(word => ({word: word.cat, lang: 'cat', pair: word.eng})),
             ...words.map(word => ({word: word.eng, lang: 'eng', pair: word.cat}))];
    
    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.index = index;
        cardElement.textContent = '?';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}


function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('matched')) return;
    if (flippedCards.includes(this)) return;

    const cardIndex = this.dataset.index;
    
    // Primer amaguem la carta
    this.style.opacity = '0';
    
    // Després d'un breu moment, canviem el text i mostrem la carta
    setTimeout(() => {
        this.textContent = cards[cardIndex].word;
        this.style.opacity = '1';
        this.classList.add('flipped');
    }, 150);

    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    if ((cards[index1].word === cards[index2].pair) || 
        (cards[index2].word === cards[index1].pair)) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('score').textContent = matchedPairs;
    } else {
        // Amaguem les cartes abans de tornar-les a girar
        card1.style.opacity = '0';
        card2.style.opacity = '0';
        
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.opacity = '1';
            card2.style.opacity = '1';
        }, 150);
    }

    flippedCards = [];

    if (matchedPairs === words.length) {
        setTimeout(() => alert('Felicitats! Has guanyat!'), 500);
    }
}

document.getElementById('resetButton').addEventListener('click', createBoard);

// Initialize game
createBoard();
