// Waffle facts for the random fact generator
const facts = [
  "Waffles originated in Belgium during the Middle Ages.",
  "The word 'waffle' comes from the Dutch word 'wafel'.",
  "The first electric waffle iron was patented in 1869.",
  "Belgian waffles were introduced to America during the 1964 World's Fair.",
  "The world's largest waffle weighed over 110 pounds!",
  "Liège waffles contain pearl sugar that caramelizes when cooked.",
  "National Waffle Day is celebrated on August 24th.",
  "Waffles can be sweet or savory depending on the toppings.",
  "The pattern on waffles helps hold more syrup and toppings.",
  "The Brussels waffle is lighter and crispier than other varieties."
];

/**
 * Displays a random waffle fact in the fact element
 */
function showRandomFact() {
  const factElement = document.getElementById('fact');
  if (factElement) {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
    factElement.style.opacity = 0;
    setTimeout(() => {
      factElement.style.opacity = 1;
    }, 300);
  }
}

/**
 * Toggles the mobile navigation menu
 */
function toggleMenu() {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('nav-open');
}

/**
 * Navigates to the specified page
 * @param {string} url - The URL to navigate to
 */
function goToPage(url) {
  window.location.href = url;
}

/**
 * Highlights the active navigation link based on current page
 */
function highlightActive() {
  const links = document.querySelectorAll('.nav-list a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Validates the submission form
 * @returns {boolean} - Whether the form is valid
 */
function validateForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  let isValid = true;
  
  if (nameInput && nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  }
  
  if (emailInput) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }
  }
  
  if (messageInput && messageInput.value.trim() === '') {
    showError(messageInput, 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Shows an error message for an input field
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(errorElement);
  }
  
  input.classList.add('error-input');
  
  input.addEventListener('input', function() {
    input.classList.remove('error-input');
    if (formGroup.querySelector('.error-message')) {
      formGroup.removeChild(errorElement);
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Show random fact if on homepage
  if (document.getElementById('fact')) {
    showRandomFact();
    
    // Change fact every 10 seconds
    setInterval(showRandomFact, 10000);
  }
  
  // Highlight active navigation link
  highlightActive();
  
  // Add event listener to navigation toggle button
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }
  
  // Add event listener to form submission if on get-started page
  const form = document.querySelector('.get-started-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      if (!validateForm()) {
        event.preventDefault();
      }
    });
  }
});
