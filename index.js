// Import questions from a separate module/file
import { placeholderQuestions } from './placeholder-questions.js';

// Grabbing HTML elements to interact with them in JavaScript
const guess = document.getElementById('guess');
const passButton = document.getElementById('pass');
const nextRound = document.getElementById('next-round');
const userInput = document.getElementById('userInput');

// Initializing variables to keep track of the current player and their scores
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };
let currentAnswer = ''; // Stores the answer of the current question
let currentValue = 0; // Stores the value of the current question

// Initially disabling the guess and pass buttons because no question is selected yet
guess.disabled = true;
passButton.disabled = true;
nextRound.disabled = true;

// Function to extract unique categories from the list of questions
function getCategories(questions) {
  // Utilizes a Set to ensure uniqueness and maps over the questions to extract categories
  return [...new Set(questions.map(question => question.category))];
}

// Function to display categories on the webpage
function renderCategories() {
  const categories = getCategories(placeholderQuestions);
  document.querySelectorAll('.category').forEach((element, index) => {
    // Assigns category names to table headers if available
    if (categories[index]) {
      element.textContent = categories[index];
    }
  });
}

// Sets up click event listeners for each question
function setupQuestionClickListeners() {
  document.querySelectorAll('.question').forEach(element => {
    element.addEventListener('click', handleQuestionClick);
  });
}

// Handles clicking on a question
function handleQuestionClick(event) {
  const category = event.target.dataset.category;
  const value = parseInt(event.target.dataset.value, 10);
  const questionsInCategory = placeholderQuestions.filter(question => question.category === category);
  const questionIndex = value / 200 - 1; // Assuming $200 increments
  const question = questionsInCategory[questionIndex];

  if (question) {
    // Replaces the dollar value with the question text
    event.target.textContent = question.question;
    currentAnswer = question.answer; // Stores the correct answer for later comparison
    currentValue = value; // Stores the question's value for score calculation
  }

  // Enables the guess and pass buttons now that a question is selected
  guess.disabled = false;
  passButton.disabled = false;
}

// Alerts the first player to start the game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  alert("Player 1, it's your turn to start the game!");
  renderCategories(); // Displays the categories
  setupQuestionClickListeners(); // Prepares the questions for interaction
});

// Attaches an event listener to the guess button for checking the user's answer
guess.addEventListener('click', checkAnswer);

// Function to check if the user's answer is correct
function checkAnswer() {
  const userAnswer = userInput.value.toLowerCase().trim(); // Gets and trims the user's answer

  // Compares the user's answer to the correct answer, case-insensitively
  if (userAnswer === currentAnswer.toLowerCase().trim()) {
    alert('Correct!');
    scores['player' + currentPlayer] += currentValue; // Updates the score
  } else {
    alert('Incorrect!');
  }

  // Resets the input field for the next answer
  document.getElementById('userInput').value = '';
  guess.disabled = true; // Disables the guess button until the next question is selected
  passButton.disabled = true; // Similarly, disables the pass button

  // Update UI here to reflect changes in score or player turns if necessary
}
