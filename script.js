const emojis= ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥝"];
let cardsArray=[...emojis, ...emojis];
let first = null;
let second = null;
let moves =0;
let time=0;
let timerInterval=null;
let started=false;
let lock = false;

const Game=document.getElementById("Game");
const Moves=document.getElementById("Moves");
const Time=document.getElementById("Time");
const Message=document.getElementById("Message");

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);

}

function createBoard(){
    Game.innerHTML="";
    let shuffled=shuffle(cardsArray);

    shuffled.forEach(symbol =>{
        const card=document.createElement("div");
        card.classList.add("card");

        card.innerHTML=
        `<div class="inner">
            <div class="front">${symbol}</div>
            <div class="back">?</div>
    
        </div>`;

        card.dataset.symbol=symbol;
        card.addEventListener("click",()=> handleClick(card)); 
        Game.appendChild(card);
    })
}

function handleClick(card){
    if(!started || lock || card.classList.contains("flipped")|| card.classList.contains("matched")){
        return;
    }
    card.classList.add("flipped");
    if(!first){
        first=card;
    }
    else{
        second=card;
        lock=true;
        moves++;
        Moves.innerHTML=moves;

        if(first.dataset.symbol === second.dataset.symbol){
            first.classList.add("matched");
            second.classList.add("matched");
            resetTurn();
            checkWin();
        }
        else{
            setTimeout(()=>{
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                resetTurn();
            } ,800);
        }
    }



    }

function resetTurn(){
    first=null;
    second=null;
    lock=false;

}

function startGame(){
    if (started) return;
    started=true;
    Message.innerHTML="";
    timerInterval=setInterval(()=>{
        time++;
        Time.innerHTML=time;
    },1000);
}

function resetGame(){
    clearInterval(timerInterval);
    started=false;
    time=0;
    moves=0;
    Time.innerText=0;
    Moves.innerText=0;
    Message.innerText="";
    first=second=null;
    lock=false;
    createBoard();
}

function checkWin(){
    const allMatched=document.querySelectorAll(".matched").length;
    if (allMatched === cardsArray.length){
        clearInterval(timerInterval);
        Message.innerText=`Congratulations! You won in ${moves} moves and ${time} seconds.`;
    }
    

}

document.getElementById("StartBtn").onclick=startGame;
document.getElementById("ResetBtn").onclick=resetGame;
createBoard();
