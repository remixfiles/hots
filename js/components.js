// HOTS News - Shared Components & Interactions (Vanilla JS)

document.addEventListener('DOMContentLoaded', () => {
  loadNavbarAndFooter();
  initReadingProgress();
});

// Load navbar and footer from components folder
async function loadNavbarAndFooter() {
  // Navbar
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    try {
      const response = await fetch('/components/navbar.html');
      if (response.ok) {
        navbarPlaceholder.innerHTML = await response.text();

// Initialize navbar features after navbar is loaded
initDarkMode();
initMobileMenu();
initSearchHandlers();
      }
    } catch (e) {
      console.warn('Navbar component could not be loaded. Using fallback if present.');
    }
  }

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    try {
      const response = await fetch('/components/footer.html');
      if (response.ok) {
        footerPlaceholder.innerHTML = await response.text();
      }
    } catch (e) {
      console.warn('Footer component could not be loaded.');
    }
  }
}

// Dark mode toggle with localStorage
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');

// Prevent duplicate event listeners
if (toggle?.dataset.initialized) return;
if (toggle) toggle.dataset.initialized = "true";
  if (!toggle) return;

  // Set initial state
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    toggle.innerHTML = '☀️';
  } else {
    toggle.innerHTML = '🌙';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.innerHTML = isDark ? '☀️' : '🌙';
  });
}

// Mobile hamburger menu (simple show/hide, no heavy animation per spec)
function initMobileMenu() {
  const hamburger = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.innerHTML = '☰';
    });
  });
}

// Search form handling (nav + any large search)
function initSearchHandlers() {
// Navigation search button uses a direct link to /search/
// No JavaScript required here.

  // Any other search inputs with data-search attribute
  document.querySelectorAll('[data-search-form]').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const query = input.value.trim();
      if (query.length > 1) {
        window.location.href = `/search/?q=${encodeURIComponent(query)}`;
      }
    });
  });
}

// Reading progress bar for article pages
function initReadingProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  const articleBody = document.querySelector('.article-body');
  if (!articleBody) return;

  window.addEventListener('scroll', () => {
    const totalHeight = articleBody.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const articleTop = articleBody.getBoundingClientRect().top + window.scrollY;

    let progress = 0;
    if (scrollTop > articleTop) {
      const scrolled = scrollTop - articleTop;
      progress = Math.min((scrolled / (totalHeight - windowHeight)) * 100, 100);
    }
    progressBar.style.width = `${progress}%`;
  });
}

// Utility: Copy to clipboard (used in article share)
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = event.currentTarget ? event.currentTarget.textContent : '';
    if (event.currentTarget) event.currentTarget.textContent = 'Copied!';
    setTimeout(() => {
      if (event.currentTarget) event.currentTarget.textContent = originalText || 'Copy Link';
    }, 1800);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link copied to clipboard');
  });
}

// Expose for article pages if needed
window.HOTS = { copyToClipboard };

