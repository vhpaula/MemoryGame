const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const countAttempts = document.querySelector(".number-attemps");
const progressBar = document.querySelector(".progress");

const characters = [
    "bulbasaur",
    "charmander",
    "cyndaquil",
    "eevee",
    "pikachu",
    "squirite",
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = "";
let secondCard = "";
let attempts = 1;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");
    const screenFinishGame = document.querySelector(".sheet-finish-game");
    const timeGame = document.querySelector(".game-time");
    const buttonPlayGame = document.querySelector(".content-statistics > button")
    const mensageFinishGame = document.querySelector(".content-statistics > h4");

    if (attempts <= 15 && disabledCards.length == 12) {
        clearInterval(this.loop);

        screenFinishGame.setAttribute("style", "display: flex;");
        timeGame.innerHTML = timer + " segundos";
        mensageFinishGame.innerHTML = "Ganhou!";

        buttonPlayGame.addEventListener("click", reLoadGame)
    } else if (attempts >= 15) {
        //grid.setAttribute("style", "pointer-events: none;");
        //alert("GAME OVER", (window.location = "../index.html"));
        
        clearInterval(this.loop);

        screenFinishGame.setAttribute("style", "display: flex;");
        timeGame.innerHTML = timer + " segundos";
        mensageFinishGame.innerHTML = "Perdeu!";

        buttonPlayGame.addEventListener("click", reLoadGame)
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            attempts = attempts + 1;

            firstCard = "";
            secondCard = "";
        }, 500);
        countAttempts.innerHTML = attempts + "/15";

        const progressBarValue = "width:" + attempts * 6.6666 + "%";
        progressBar.setAttribute("style", progressBarValue);
        checkEndGame();
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard == "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if (secondCard == "") {
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add("reveal-card");
};

const createCard = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.background = `url('../images/${character}.svg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const reLoadGame = () => {
    document.location.reload();
    /*const screenGameOver = document.querySelector(".sheet-finish-game");
    screenGameOver.setAttribute("style", "display: none;")

    timer = 0;
    attempts = 1;
    grid.parentNode.removeChild();

    startTimer();
    loadGame();*/
};

let timer = 0;
const startTimer = () => {
    this.loop = setInterval(() => {
        timer = timer + 1;
        console.log(timer);
    }, 1000);
};

window.onload = () => {
    const player = localStorage.getItem("player");

    if (player) {
        spanPlayer.innerHTML = player;
        startTimer();
        loadGame();
    } else {
        window.location.href = "../index.html";
    }
};
