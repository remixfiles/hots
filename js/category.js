// Category page renderer

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryPage();
});

function renderCategoryPage() {
  if (typeof articlesData === 'undefined') return;

  const grid = document.getElementById('category-grid');
  if (!grid) return;

  // Determine category from path or page title
  const path = window.location.pathname;
  let category = '';

  if (path.includes('artificial-intelligence')) category = 'Artificial Intelligence';
  else if (path.includes('world-news')) category = 'World News';
  else if (path.includes('political-news')) category = 'Political News';
  else if (path.includes('war-updates')) category = 'War Updates';
  else if (path.includes('technology')) category = 'Technology';
  else if (path.includes('science')) category = 'Science';
  else if (path.includes('business')) category = 'Business';
  else if (path.includes('entertainment')) category = 'Entertainment';
  else if (path.includes('sports')) category = 'Sports';
  else if (path.includes('health')) category = 'Health';
  else if (path.includes('climate')) category = 'Climate';
  else if (path.includes('space')) category = 'Space';
  else if (path.includes('weird-news')) category = 'Weird News';

  if (!category) {
    grid.innerHTML = '<p class="no-results">Category not recognized.</p>';
    return;
  }

  const filtered = getArticlesByCategory(category);
  renderArticleCards(grid, filtered);
}
