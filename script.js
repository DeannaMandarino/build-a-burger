// DOM Elements
const addItems = document.querySelector('.burger-builder__ingredient-form');
const itemsList = document.querySelector('.burger-builder__ingredients-list');

// Retrieve items from localStorage or initialize as an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

// Adds a new ingredient to the list and updates localStorage
function addItem(event) {
  event.preventDefault(); // Prevents form submission from reloading the page

  // Get the input value for the ingredient
  const ingredient = (document.querySelector('.burger-builder__ingredient-input')).value;

  // Don't add empty values
  if (ingredient === '') return;

  const item = {
    text: ingredient,
    done: false
  };

  // Add the new item to the array
  items.push(item);

  // Update the list in the UI and localStorage
  updateUI();

  // Clear the input field after adding the item
  this.reset();
}

// Populates the ingredient list in the UI
function populateList(ingredients = [], ingredientsList) {
  ingredientsList.innerHTML = ingredients.map((ingredient, i) => {
    return `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${ingredient.done ? 'checked' : ''}>
      <label for="item${i}">${ingredient.text}</label>
    </li>`;
  }).join('');
}

// Toggles the "done" state of an ingredient when clicked
function toggleDone(event) {
  if (!event.target.matches('input')) return; //skip this unless it's an input

  const index = event.target.dataset.index;
  items[index].done = !items[index].done;

  // Update UI and localStorage after toggling the state
  updateUI();
}

// Updates the displayed ingredient list and localStorage.
function updateUI() {
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}

// Event listeners
addItems.addEventListener('submit', addItem); // Handle form submission
itemsList.addEventListener('click', toggleDone); // Handle checkbox clicks

// Initial population of the list
updateUI();