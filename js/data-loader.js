// HOTS Data Loader
// Loads yearly JSON index and provides helper methods.
// Example:
//   const posts = await HOTS.loadPosts();
//   const july = HOTS.getPostsByMonth(posts, 7);
//   renderArticleCards(container, july);

(() => {

  let cache = {};

  // -----------------------------
  // Detect current year from URL
  // -----------------------------
  function getCurrentYear() {
    const match = window.location.pathname.match(/^\/(\d{4})\//);
    return match ? match[1] : null;
  }

  // -----------------------------
  // Load yearly JSON
  // -----------------------------
  async function loadPosts() {
    const year = getCurrentYear();

    if (!year) {
      console.error("HOTS: Could not detect year from URL.");
      return [];
    }

    if (cache[year]) {
      return cache[year];
    }

    try {
      const response = await fetch(`/${year}/hots${year}.json`);

      if (!response.ok) {
        throw new Error(`Unable to load /${year}/hots${year}.json`);
      }

      const posts = await response.json();

      cache[year] = posts;

      return posts;

    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // -----------------------------
  // Latest posts
  // -----------------------------
function getLatestPosts(posts, limit = 6) {
  return [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

  // -----------------------------
  // Category
  // -----------------------------
function getPostsByCategory(posts, categorySlug) {
  return posts.filter(post =>
    post.categorySlug === categorySlug
  );
}

  // -----------------------------
  // Month
  // month = 1 ~ 12
  // -----------------------------
function getPostsByMonth(posts, month) {
return posts.filter(post => {
return post.month === month;
});
}

  // -----------------------------
  // Year
  // -----------------------------
  function getPostsByYear(posts, year) {
    return posts.filter(post => {
return post.year === Number(year);
    });
  }

  // -----------------------------
  // Slug
  // -----------------------------
  function getPostBySlug(posts, slug) {
    return posts.find(post => post.slug === slug);
  }

  // -----------------------------
  // Related Posts
  // -----------------------------
  function getRelatedPosts(posts, currentSlug, limit = 3) {

    const current = getPostBySlug(posts, currentSlug);

    if (!current) return [];

    let related = posts
      .filter(post =>
        post.slug !== current.slug &&
        post.categorySlug === current.categorySlug
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);

    if (related.length < limit) {

      const extra = posts
        .filter(post =>
          post.slug !== current.slug &&
          !related.some(r => r.slug === post.slug)
        )
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit - related.length);

      related.push(...extra);

    }

    return related;
  }

  // -----------------------------
  // News Card
  // -----------------------------
  function renderNewsCard(post) {

    const card = document.createElement("a");

    card.href = "/" + post.slug + "/";

    card.className = "news-card";

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img
          src="${post.image}"
          alt="${post.title}"
          loading="lazy"
        >

        <span class="category-tag">
          ${post.category}
        </span>
      </div>

      <div class="card-content">

        <h3 class="card-title">
          ${post.title}
        </h3>

        <p class="card-excerpt">
          ${post.excerpt}
        </p>

        <div class="card-meta">

          <span class="meta-date">
            ${new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>

          <span class="meta-readtime">
            ${post.readTime || ""}
          </span>

        </div>

      </div>
    `;

    return card;
  }

  // -----------------------------
  // Render Cards
  // -----------------------------
  function renderArticleCards(container, posts) {

    container.innerHTML = "";

    if (!posts || posts.length === 0) {

      container.innerHTML =
        '<p class="no-results">No articles found in this section yet.</p>';

      return;
    }

    posts.forEach(post => {
      container.appendChild(
        renderNewsCard(post)
      );
    });

  }

  // -----------------------------
  // Public API
  // -----------------------------
  window.HOTS = window.HOTS || {};

  window.HOTS.loadPosts = loadPosts;

  window.HOTS.getLatestPosts = getLatestPosts;

  window.HOTS.getPostsByCategory = getPostsByCategory;

  window.HOTS.getPostsByMonth = getPostsByMonth;

  window.HOTS.getPostsByYear = getPostsByYear;

  window.HOTS.getPostBySlug = getPostBySlug;

  window.HOTS.getRelatedPosts = getRelatedPosts;

  window.HOTS.renderNewsCard = renderNewsCard;

  window.HOTS.renderArticleCards = renderArticleCards;

})();