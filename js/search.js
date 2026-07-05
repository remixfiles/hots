// Search functionality

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';

  const input = document.getElementById('search-input');
  if (input) input.value = query;

  performSearch(query);

  // Allow re-search from page
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newQuery = input.value.trim();
      if (newQuery) {
        window.location.href = `/search/?q=${encodeURIComponent(newQuery)}`;
      }
    });
  }
});

function performSearch(query) {
  const grid = document.getElementById('search-results-grid');
  const meta = document.getElementById('results-meta');
  if (!grid || typeof articlesData === 'undefined') return;

  if (!query || query.length < 2) {
    meta.innerHTML = 'Enter a search term above to find articles.';
    grid.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const results = articlesData.filter(article => 
    article.title.toLowerCase().includes(q) ||
    article.excerpt.toLowerCase().includes(q) ||
    article.category.toLowerCase().includes(q) ||
    article.author.toLowerCase().includes(q)
  );

  meta.innerHTML = `${results.length} result${results.length !== 1 ? 's' : ''} for “${query}”`;

  if (results.length === 0) {
    grid.innerHTML = '<p class="no-results" style="grid-column: 1 / -1;">No articles matched your search. Try different keywords or browse categories.</p>';
    return;
  }

  renderArticleCards(grid, results);
}
