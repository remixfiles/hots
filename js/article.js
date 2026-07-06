// Article page enhancements

document.addEventListener('DOMContentLoaded', () => {
// More Latest Posts
renderLatestPosts();

  // Share buttons
  initShareButtons();
});

async function renderLatestPosts() {

  const container = document.getElementById("latest-posts-grid");

  if (!container) return;

  const posts = await HOTS.loadPosts();

  if (!posts.length) return;

  const currentSlug = window.location.pathname
    .replace(/^\/|\/$/g, "");

  const currentPost = HOTS.getPostBySlug(posts, currentSlug);

  if (!currentPost) return;

  const latest = posts
    .filter(post =>
      post.year === currentPost.year &&
      post.slug !== currentPost.slug &&
      post.date >= currentPost.date
    );

  // Fisher-Yates Shuffle
  for (let i = latest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [latest[i], latest[j]] = [latest[j], latest[i]];
  }

  HOTS.renderArticleCards(
    container,
    latest.slice(0, 6)
  );

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
