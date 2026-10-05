const emojis = ['🧋','🍵','🧃','🍷','🍹','☕️','🥃','🍸']
let emojiPool = [];
//let emojiPool = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
let turnCount = 0;
let progressCount = 0;
const maxProgress = emojis.length
let firstCard;

let screenLock = false;

let turnDisplay;
let progressDisplay;

createGameInfo();
createBoard();
console.log(emojiPool);

function createDiv(className = "", idName = ""){
    const newDiv = document.createElement("div");
    newDiv.classList.add(className);
    newDiv.id = idName;
    return newDiv;
}

function createGameInfo(){
    const newGameInfo = document.createElement("header");
    newGameInfo.classList.add("gameInfo");
    document.body.appendChild(newGameInfo);
    setupTurnDisplay();
    setupProgressDisplay();
    
    const newResartButton = addRestartButton();
    newResartButton.classList.add("headerButton");
    newGameInfo.appendChild(newResartButton);

    newGameInfo.appendChild(turnDisplay);
    newGameInfo.appendChild(progressDisplay);
}

function setupTurnDisplay(){
    turnDisplay = createDiv("textBox", "turnDisplay");
    updateTurnDisplay();
}

function updateTurnDisplay(){
    turnDisplay.textContent = `Turn Count: ${turnCount}`;
}

function setupProgressDisplay(){
    progressDisplay = createDiv("textBox", "progressDisplay");
    updateProgressDisplay();
}

function updateProgressDisplay(){
    progressDisplay.textContent = `Pairs: ${progressCount}/${maxProgress}`;
}

function createBoard(){
    emojiPool = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
    const newBord = createDiv("board", "board");
    newBord.classList.add("prettyBox")
    document.body.appendChild(newBord);
    emojiPool.forEach( emoji => {
        newBord.appendChild(addCard(emoji))
    })
}

function addCard(emoji = '') {
    const newCard = createDiv("card");
    newCard.classList.add("prettyBox")
    newCard.dataset.emoji = emoji;
    newCard.onclick = () => openCard(newCard);
    //newCard.textContent = emoji;
    return newCard;
}

function openCard(card){
    if (card.classList.contains("correct")) return;
    if (card.classList.contains("open")) return;
    if (screenLock) return;

    card.classList.add("open");
    card.textContent = card.dataset.emoji;
    if(!firstCard){
        firstCard = card;
    }
    else{
        if(card.dataset.emoji == firstCard.dataset.emoji){
            onSuccess(card,firstCard)
        }else{
            onFail(card,firstCard)
        }
        firstCard = null;
    }
}

function createWinPopup() {
    const newWinPopup = createDiv("winBox", "winPopup");
    newWinPopup.classList.add("prettyBox")
    newWinPopup.textContent = `You win`;
    document.body.appendChild(newWinPopup);

    const newP = document.createElement("p");
    newP.textContent = `Score: ${turnCount}`;
    newWinPopup.appendChild(newP);

    newWinPopup.appendChild(addRestartButton());
}

function addRestartButton(){
    const newButton = document.createElement("button");
    newButton.textContent = `Restart`;
    newButton.onclick = () => restartGame();
    return newButton;
}

function createGrayBox(){
    const newGray = createDiv("grayBox", "grayBox");
    document.body.appendChild(newGray);
}

function closeCards(card1, card2){
    card1.classList.remove("open");
    card2.classList.remove("open");
    screenLock = false;
}

function onSuccess(card1, card2){
    turnCount++;
    updateTurnDisplay();
    progressCount++;
    updateProgressDisplay();
    card1.classList.add("correct");
    card2.classList.add("correct");
    closeCards(card1, card2);
    if (progressCount >= maxProgress) onWin();
}

function onFail(card1, card2){
    turnCount++;
    updateTurnDisplay();
    screenLock = true;
    setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        closeCards(card1, card2);
    }, 1000)
}

function onWin(){
    screenLock = true;
    createGrayBox();
    createWinPopup();
}

function restartGame(){
    screenLock = false;
    firstCard = null;
    const grayBox = document.getElementById("grayBox");
    if (grayBox) grayBox.remove();
    const winPopup = document.getElementById("winPopup");
    if (winPopup) winPopup.remove();
    const board = document.getElementById("board");
    board.remove();
    turnCount = 0;
    progressCount = 0;
    updateProgressDisplay();
    updateTurnDisplay();
    createBoard();
}