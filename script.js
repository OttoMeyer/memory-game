const emojis = ['🧋','🍵','🧃','🍷','🍹','☕️','🥃','🍸']
let emojiPool = [...emojis, ...emojis].sort(() => 0.5 - Math.random());


createBoard();
console.log(emojis2);

function addCards(emoji = '') {
    const newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.dataset.emoji = emoji
    newDiv.onclick = () => alert(newDiv.dataset.emoji);
    newDiv.textContent = newDiv.dataset.emoji;
    const currentDiv = document.getElementById("div1");
    return newDiv
}

function createBoard(){
    const newBord = document.createElement("div");
    newBord.className = "board";
    document.body.appendChild(newBord);
    emojiPool.forEach( emoji => {
        newBord.appendChild(addCards(emoji))
    })
    
    //for(let i = 0; i < 16; i++){
    //    newBord.appendChild(addCards());
    //}
    
}