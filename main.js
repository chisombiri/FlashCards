const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const clearBtn = document.querySelector('#clear');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const addContainer = document.querySelector('#add-container');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');

//Keep track of current card
let currActiveCard = 0;

//Store cards from DOM
const cardsEl = [];

//Store q and a data from card
const cardsData = getCardsData();


//Loop through data and create cards
function createCards(){
    cardsData.forEach((data, index) => createCard(data, index));
}

//Create one single card
function createCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0){
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div> 
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-ans'));

    //new card to cards in DOM
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrText();
}

//Function to update and show current card number
function updateCurrText(){
    currentEl.innerText = `${currActiveCard + 1}/${cardsEl.length}`;
}

//Function to get cards from local storage
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//Function to add cards to local storage
function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards));

    window.location.reload();
}

createCards();

//Event listeners for previous and next

nextBtn.addEventListener('click', () => {
    cardsEl[currActiveCard].className = 'card left';

    currActiveCard = currActiveCard + 1;

    if(currActiveCard > cardsEl.length - 1){
        currActiveCard = cardsEl.length - 1;
    }

    cardsEl[currActiveCard].className = 'card active';

    updateCurrText();
});

//previous button
prevBtn.addEventListener('click', () => {
    cardsEl[currActiveCard].className = 'card';

    currActiveCard = currActiveCard - 1;

    if(currActiveCard < 0){
        currActiveCard = 0;
    }

    cardsEl[currActiveCard].className = 'card active';

    updateCurrText();
});

//event listener to show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//event listener to hide add cintainer
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//add new card event
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()){
        const newCard = { question, answer };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);

        setCardsData(cardsData);
    }
})

//Clear all cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})