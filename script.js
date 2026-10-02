const emojis = ['🧋','🍵','🧃','🍷','🍹','☕️','🥃','🍸']
let emojiPool = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
let turnCount = 0;
let progressCount = 0;
let firstCard;

let turnDisplay;
let progressDisplay;

createGameInfo();
createBoard();
console.log(emojiPool);

function createDiv(className = "", idName = ""){
    const newDiv = document.createElement("div");
    newDiv.classList.add(className);
    newDiv.id = idName;
    return newDiv
}

function createGameInfo(){
    const newGameInfo = createDiv("gameInfo");
    document.body.appendChild(newGameInfo);
    setupTurnDisplay();
    setupProgressDisplay();
    newGameInfo.appendChild(turnDisplay);
    newGameInfo.appendChild(progressDisplay);
}

function setupTurnDisplay(){
    turnDisplay = createDiv("textBox", "turnDisplay")
    updateTurnDisplay()
}

function updateTurnDisplay(){
    turnDisplay.textContent = `Turn Count: ${turnCount}`;
}

function setupProgressDisplay(){
    progressDisplay = createDiv("textBox", "progressDisplay")
    updateProgressDisplay();
}

function updateProgressDisplay(){
    progressDisplay.textContent = `Pairs: ${progressCount}/8`;
}

function createBoard(){
    const newBord = createDiv("board");
    document.body.appendChild(newBord);
    emojiPool.forEach( emoji => {
        newBord.appendChild(addCard(emoji))
    })
}

function addCard(emoji = '') {
    const newCard = createDiv("card")
    newCard.dataset.emoji = emoji
    newCard.onclick = () => openCard(newCard);
    newCard.textContent = "";
    const currentDiv = document.getElementById("div1");
    return newCard
}

function openCard(card){
    if (card.classList.contains("correct")) return;
    if (card.classList.contains("open")) return;

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

function closeCards(card1, card2){
    turnCount++;
    updateTurnDisplay();
    card1.classList.remove("open");
    card2.classList.remove("open");
}

function onSuccess(card1, card2){
    progressCount++;
    updateProgressDisplay();
    card1.classList.add("correct");
    card2.classList.add("correct");
    closeCards(card1, card2);
}

function onFail(card1, card2){
    setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        closeCards(card1, card2);
    }, 1000)
}