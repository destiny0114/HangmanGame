const wordEl = document.getElementById('word');
const wronglettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctletters = [];
const wrongletters = [];

displayWord();

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctletters.includes(letter)) {
                correctletters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongletters.includes(letter)) {
                wrongletters.push(letter);

                updateWrongLettersEL();
            } else {
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctletters.splice(0);
    wrongletters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEL();
    popup.style.display = 'none';
});

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `<span class="letter">${correctletters.includes(letter) ? letter : ''}</span>`).join('')}`;
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEL() {
    wronglettersEl.innerHTML = `
    ${wrongletters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongletters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongletters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongletters.length === figureParts.length) {
        finalMessage.innerText = 'You lost!';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}