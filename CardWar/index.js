let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-card")
const header = document.getElementById("header")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")
let remainingCards = document.getElementById("remaining")
let computerScore = 0
let myScore = 0

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(data);
            remainingCards.textContent= `Remaining Cards : ${data.remaining}`
        })
}

newDeckBtn.addEventListener("click",handleClick)

drawCardBtn.addEventListener("click",() => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card"/>
            `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card"/>
            `
            determineCardWinner(data.cards[0],data.cards[1])
            computerScoreEl.textContent = `Computer Score : ${computerScore}`
            myScoreEl.textContent = `My Score : ${myScore}`
            remainingCards.textContent= `Remaining Cards : ${data.remaining}`

            if(data.remaining === 0){
                drawCardBtn.disabled = true
                if(computerScore > myScore){
                    header.textContent = `Computer Wins`
                }else if(myScore > computerScore){
                    header.textContent = `I win`
                }else {
                    header.textContent = `It's a tie`
                }
            }
        })
})

function determineCardWinner(card1,card2) {
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if(card1ValueIndex > card2ValueIndex){
        return computerScore++
    }else if (card2ValueIndex > card1ValueIndex){
        return myScore++
    }else
        return "War!"
}