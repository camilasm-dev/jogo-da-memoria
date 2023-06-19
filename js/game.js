const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//selecionando imagens com um array, lembrando que o nome no array
//tem que ser igual ao da imagem 
const characters = [
    'andy',
    'angela',
    'creed',
    'dwight',
    'jim',
    'kevin',
    'meredith',
    'michael',
    'pam',
    'stanley',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

//checando se as cartas são iguais
function checkCards() {

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target }) => {

    //condicional para virar carta que não está virada
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard ==='') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

//função que cria a carta
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    //selecionando imagens
    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    //adicionando evento para virar carta
    card.addEventListener('click', revealCard);
    //adicionando atributo nas cartas para comparar se as cartas viradas são iguais
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    // espalhou 2x um array dentro de outro para duplicar
    const duplicateCharacters = [ ...characters, ...characters ];

    //para embaralhar a carta usa o sort
    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
    suffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

}

//contador
const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

//executar quando a janela estiver carregada
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();

    loadGame();
}
