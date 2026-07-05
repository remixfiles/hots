// Archive pages (month and year)

document.addEventListener('DOMContentLoaded', () => {
  renderArchivePage();
});

function renderArchivePage() {
  if (typeof articlesData === 'undefined') return;

  const grid = document.getElementById('archive-grid');
  if (!grid) return;

  const path = window.location.pathname;
  
  let filtered = [];

  if (path.includes('/2026/july')) {
    filtered = getArticlesByMonth(2026, 7);
  } else if (path.includes('/2026/june')) {
    filtered = getArticlesByMonth(2026, 6);
  } else if (path.includes('/2026/may')) {
    filtered = getArticlesByMonth(2026, 5);
  } else if (path.includes('/2026')) {
    // Year archive
    filtered = getArticlesByYear(2026);
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No articles published in this period yet. Check back soon.</p>';
    return;
  }

  // Sort newest first
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderArticleCards(grid, filtered);
}
