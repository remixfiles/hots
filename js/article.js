// Article page enhancements

document.addEventListener('DOMContentLoaded', () => {
  // Related articles
  renderRelatedArticles();

  // Share buttons
  initShareButtons();
});

function renderRelatedArticles() {
  const container = document.getElementById('related-grid');
  if (!container || typeof articlesData === 'undefined') return;

  // Get current article slug from URL
  const currentPath = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const currentArticle = articlesData.find(a => a.slug === currentPath);

  if (!currentArticle) return;

  // Filter same category, exclude current, take 3
  let related = articlesData
    .filter(a => a.category === currentArticle.category && a.slug !== currentArticle.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // If not enough in category, add latest others
  if (related.length < 3) {
    const others = articlesData
      .filter(a => a.slug !== currentArticle.slug && !related.includes(a))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3 - related.length);
    related = [...related, ...others];
  }

  container.innerHTML = '';
  related.forEach(article => {
    const card = renderNewsCard(article);
    container.appendChild(card);
  });
}

function initShareButtons() {
  const currentUrl = window.location.href;
  const title = document.querySelector('h1') ? document.querySelector('h1').textContent : 'HOTS News Article';

  // Twitter / X
  const twitterBtn = document.getElementById('share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', () => {
      const text = encodeURIComponent(title + ' | HOTS News');
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
    });
  }

  // Facebook
  const fbBtn = document.getElementById('share-facebook');
  if (fbBtn) {
    fbBtn.addEventListener('click', () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    });
  }

  // LinkedIn
  const liBtn = document.getElementById('share-linkedin');
  if (liBtn) {
    liBtn.addEventListener('click', () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
    });
  }

  // Copy link
  const copyBtn = document.getElementById('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (window.HOTS && window.HOTS.copyToClipboard) {
        window.HOTS.copyToClipboard(currentUrl);
      } else {
        navigator.clipboard.writeText(currentUrl).then(() => {
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = orig, 1600);
        });
      }
    });
  }
}
