const emojis = ['🧋','🍵','🧃','🍷','🍹','☕️','🥃','🍸']
let emojiPool = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
let firstCard

createBoard();
console.log(emojiPool);

function addCard(emoji = '') {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.dataset.emoji = emoji
    newCard.onclick = () => openCard(newCard);
    newCard.textContent = "";
    const currentDiv = document.getElementById("div1");
    return newCard
}

function createBoard(){
    const newBord = document.createElement("div");
    newBord.className = "board";
    document.body.appendChild(newBord);
    emojiPool.forEach( emoji => {
        newBord.appendChild(addCard(emoji))
    })
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
    card1.classList.remove("open");
    card2.classList.remove("open");
}

function onSuccess(card1, card2){
    card1.classList.add("correct");
    card2.classList.add("correct");
    closeCards(card1, card2);
}

function onFail(card1, card2){
    setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        closeCards(card1, card2);
    }, 500)
    
}