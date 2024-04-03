import { placeholderQuestions } from './placeholder-questions.js';

// Function to get unique categories
function getCategories(questions) {
  const categories = [];
  questions.forEach(question => {
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
    if (categoryElements[index]) { // Check if the element exists
      categoryElements[index].textContent = category;
    }
  });
}

function setupQuestionClickListeners() {
  document.querySelectorAll('.question').forEach(square => {
    square.addEventListener('click', handleQuestionClick);
  });
}

function handleQuestionClick(event) {
  const category = event.target.dataset.category;
  const value = parseInt(event.target.dataset.value, 10); // Value is now based on order

  const questionsInCategory = placeholderQuestions.filter(question => question.category === category);
  // Assuming $200 increment per question, calculate index
  const questionIndex = (value / 200) - 1;
  const question = questionsInCategory[questionIndex];

  if (question) {
    // Future: Replace alert with a modal or dedicated question display area
    prompt(question.question);
  }
}

renderCategories();
setupQuestionClickListeners();