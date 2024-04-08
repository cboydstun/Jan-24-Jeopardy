import { placeholderQuestions } from './placeholder-questions.js';

const guess = document.getElementById('guess');
const passButton = document.getElementById('pass');
const nextRound = document.getElementById('next-round');
const answer = document.getElementById('answer');
const userInput = document.getElementById('userInput');

// initialize the variables for the current player and their score, in other words defining the variables to start.
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };

guess.disabled = true;
passButton.disabled = true;
nextRound.disabled = true;

// Function to get unique categories
function getCategories(questions) {
  const categories = [];
  questions.forEach((question) => {
    if (!categories.includes(question.category)) {
      categories.push(question.category);
    }
  });
  return categories;
}

// Function to render categories into the table
function renderCategories() {
  const categories = getCategories(placeholderQuestions);
  const categoryElements = document.querySelectorAll('.category');

  categories.forEach((category, index) => {
    if (categoryElements[index]) {
      // Check if the element exists
      categoryElements[index].textContent = category;
    }
  });
}

// function getQuestion(answer) {
//   const questionAnswer = [];
//   questions.forEach((answer) => {
//     if (!categories.includes(question.answer)) {
//       answer.push(question.answer);
//     }
//   });
//   return categories;
// }

function setupQuestionClickListeners() {
  document.querySelectorAll('.question').forEach((square) => {
    square.addEventListener('click', handleQuestionClick);
  });
}

function handleQuestionClick(event) {
  const category = event.target.dataset.category;
  const value = parseInt(event.target.dataset.value, 10); // Value is now based on order

  const userInput = category.answer;

  const questionsInCategory = placeholderQuestions.filter(
    (question) => question.category === category,
  );
  // Assuming $200 increment per question, calculate index
  const questionIndex = value / 200 - 1;
  const question = questionsInCategory[questionIndex];

  if (question) {
    // replace dollar amount with question
    event.target.textContent = question.question;
  }
  // userInput.addEventListener('key press', checkAnswer);

  guess.addEventListener('click', () => checkAnswer(answer));
  guess.disabled = false;
  passButton.disabled = false;
  nextRound.disabled = false;
}

// guess.addEventListener('click', checkAnswer);

// this will alert when the page loads to tell player 1 to start the game
document.addEventListener('DOMContentLoaded', function () {
  alert("Player 1, it's your turn to start the game!");
});

function checkAnswer(userInput, correctAnswer) {
  // Convert both answers to lowercase for case-insensitive comparison
  const answer = userInput.toLowerCase().trim();
  correctAnswer = correctAnswer.toLowerCase().trim();

  userInput.addEventListener('keyPress', answer());
  if (userAnswer === correctAnswer) {
    console.log('Correct!');
    // Increase the player's score
    scores['player' + currentPlayer] += 200; // Assuming each question is worth $200
  } else {
    console.log('Incorrect!');
    // Decrease the player's score (if you want to penalize incorrect answers)
    scores['player' + currentPlayer] -= 200; // Penalize by $200
  }
}
renderCategories();
setupQuestionClickListeners();

