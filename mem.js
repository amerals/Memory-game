const cards = [
  "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
  "  https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/?blur",
  "https://picsum.photos/id/870/200/300?grayscale&blur=2",
  "https://picsum.photos/200/300.jpg",
  "https://picsum.photos/200/300.webp",
];
const gameBoard = document.getElementById("game-board");
let selectedCards = [];
function createCard(cardUrl) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = cardUrl;
  const cardContent = document.createElement("img");
  cardContent.classList.add("card-content");
  cardContent.src = cardUrl;
  card.appendChild(cardContent);
  card.addEventListener("click", onCardClick);
  return card;
}
function duplicateArray(arraySimple) {
  let arrayDouble = [];
  arrayDouble.push(...arraySimple);
  arrayDouble.push(...arraySimple);
  return arrayDouble;
}
function shuffleArray(arrayToshuffle) {
  const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
  return arrayShuffled;
}
function onCardClick(e) {
  const card = e.target.parentElement;
  card.classList.add("flip");

  selectedCards.push(card);
  if (selectedCards.length == 2) {
    setTimeout(() => {
      if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
        //on a trouvé une paire
        selectedCards[0].classList.add("matched");
        selectedCards[1].classList.add("matched");
        selectedCards[0].removeEventListener("click", onCardClick);
        selectedCards[1].removeEventListener("click", onCardClick);
        const allCardsNotMatched = document.querySelectorAll(
          ".card:not(.matched)"
        );
        console.log(allCardsNotMatched.length);
        if (allCardsNotMatched.length == 0) {
          //Le joueur a gagné
          alert("Bravo, vous avez gagné");
        }
      } else {
        //on s'est trompé
        selectedCards[0].classList.remove("flip");
        selectedCards[1].classList.remove("flip");
      }
      selectedCards = [];
    }, 1000);
  }
}
let allCards = duplicateArray(cards);
//Mélanger le tableau
allCards = shuffleArray(allCards);
allCards.forEach((card) => {
  const cardHtml = createCard(card);
  gameBoard.appendChild(cardHtml);
});
