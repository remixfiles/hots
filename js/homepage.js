// Homepage specific rendering logic

function renderHomepageSections() {
  if (typeof articlesData === 'undefined') {
    console.error('articlesData not loaded');
    return;
  }

  // 1. Hero Featured - most recent
  const heroContainer = document.getElementById('hero-featured');
  if (heroContainer) {
    const latest = [...articlesData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (latest) {
      heroContainer.innerHTML = `
        <a href="/${latest.slug}/" class="hero">
          <div class="hero-image">
            <img src="${latest.image}" alt="${latest.title}">
            <span class="category-tag">${latest.category}</span>
          </div>
          <div class="hero-content">
            <h1 class="hero-title">${latest.title}</h1>
            <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 1.05rem;">${latest.excerpt}</p>
            <div style="display:flex; align-items:center; gap:1rem; font-size:0.9rem; color:var(--text-muted);">
              <span><strong>${latest.author}</strong></span>
              <span>${new Date(latest.date).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})}</span>
              <span>${latest.readTime}</span>
            </div>
          </div>
        </a>
      `;
    }
  }

  // 2. Latest Headlines (6 newest)
  const latestGrid = document.getElementById('latest-grid');
  if (latestGrid) {
    const latestArticles = getLatestArticles(6);
    renderArticleCards(latestGrid, latestArticles);
  }

  // 3. World & Politics (mix)
  const worldGrid = document.getElementById('world-politics-grid');
  if (worldGrid) {
    const world = getArticlesByCategory('World News');
    const politics = getArticlesByCategory('Political News');
    const war = getArticlesByCategory('War Updates');
    const combined = [...world, ...politics, ...war].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0, 6);
    renderArticleCards(worldGrid, combined);
  }

  // 4. Tech & AI
  const techGrid = document.getElementById('tech-ai-grid');
  if (techGrid) {
    const tech = getArticlesByCategory('Technology');
    const ai = getArticlesByCategory('Artificial Intelligence');
    const combined = [...tech, ...ai].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0, 6);
    renderArticleCards(techGrid, combined);
  }

  // 5. Science, Space, Climate
  const sciGrid = document.getElementById('science-space-grid');
  if (sciGrid) {
    const science = getArticlesByCategory('Science');
    const space = getArticlesByCategory('Space');
    const climate = getArticlesByCategory('Climate');
    const combined = [...science, ...space, ...climate].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0, 6);
    renderArticleCards(sciGrid, combined);
  }

  // 6. Weird & Trending (Weird + Entertainment + Business as proxy for viral)
  const weirdGrid = document.getElementById('weird-grid');
  if (weirdGrid) {
    const weird = getArticlesByCategory('Weird News');
    const ent = getArticlesByCategory('Entertainment');
    const biz = getArticlesByCategory('Business');
    const combined = [...weird, ...ent, ...biz].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0, 6);
    renderArticleCards(weirdGrid, combined);
  }
}

// Auto-run when script loads (after data)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderHomepageSections);
} else {
  renderHomepageSections();
}
