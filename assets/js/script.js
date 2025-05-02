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

function toggleMenu() {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('nav-open');
}

function goToPage(url) {
  window.location.href = url;
}

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

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('fact')) {
    showRandomFact();
    setInterval(showRandomFact, 10000);
  }
  highlightActive();
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }
  
  const form = document.querySelector('.get-started-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      if (!validateForm()) {
        event.preventDefault();
      }
    });
  }
});
