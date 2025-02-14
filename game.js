const emojis = ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉', '🐶', '🐱', '🐼', '🐰', '🐶', '🐱', '🐼', '🐰'];
let shuffledEmojis, gameBoard, firstCard, secondCard, lockBoard;
let matches = 0;
let wrongAttempts = 0;

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("retryGame").addEventListener("click", startGame);

function startGame() {
    document.getElementById("gameBoard").style.display = "grid";
    document.getElementById("gameFinished").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("startGame").style.display = "none";
    document.getElementById("chancesLeft").textContent = "Chances Left: 3";
    
    gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
    firstCard = secondCard = null;
    lockBoard = false;
    matches = 0;
    wrongAttempts = 0;
    createBoard();
}

function createBoard() {
    shuffledEmojis.forEach(emoji => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.textContent = this.dataset.emoji;
    this.classList.add("flipped");
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matches++;
        resetBoard();
        checkGameFinished();
    } else {
        wrongAttempts++;
        document.getElementById("chancesLeft").textContent = `Chances Left: ${3 - wrongAttempts}`;
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
            checkGameOver();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkGameFinished() {
    if (matches === emojis.length / 2) {
        document.getElementById("gameFinished").style.display = "block";
        document.getElementById("startGame").style.display = "block";
        document.getElementById("startGame").textContent = "Restart Game";
    }
}

function checkGameOver() {
    if (wrongAttempts >= 3) {
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("gameBoard").style.display = "none";
        document.getElementById("startGame").style.display = "block";
        document.getElementById("startGame").textContent = "Retry";
    }
}

