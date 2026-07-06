// Archive pages (month and year)

// document.addEventListener('DOMContentLoaded', () => {
//   renderArchivePage();
// });

// function renderArchivePage() {
//   if (typeof articlesData === 'undefined') return;

//   const grid = document.getElementById('archive-grid');
//   if (!grid) return;

//   const path = window.location.pathname;
  
//   let filtered = [];

//   if (path.includes('/2026/july')) {
//     filtered = getArticlesByMonth(2026, 7);
//   } else if (path.includes('/2026/june')) {
//     filtered = getArticlesByMonth(2026, 6);
//   } else if (path.includes('/2026/may')) {
//     filtered = getArticlesByMonth(2026, 5);
//   } else if (path.includes('/2026')) {
//     // Year archive
//     filtered = getArticlesByYear(2026);
//   }

//   if (filtered.length === 0) {
//     grid.innerHTML = '<p class="no-results">No articles published in this period yet. Check back soon.</p>';
//     return;
//   }

//   // Sort newest first
//   filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
//   renderArticleCards(grid, filtered);
// }



// Archive pages (month and year)

document.addEventListener("DOMContentLoaded", renderArchivePage);

async function renderArchivePage() {

  const grid = document.getElementById("archive-grid");

  if (!grid) return;

  const posts = await HOTS.loadPosts();

  if (!posts.length) {
    grid.innerHTML =
      '<p class="no-results">No articles published in this period yet. Check back soon.</p>';
    return;
  }

  const path = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .split("/");

  const year = Number(path[0]);
  const monthName = path[1];

  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
  };

  let filtered = [];

  // /2026/
  if (path.length === 1) {

    filtered = HOTS.getPostsByYear(posts, year);

  }

  // /2026/july/
  else if (months[monthName]) {

    filtered = HOTS.getPostsByMonth(posts, months[monthName]);

  }

  filtered.sort((a, b) => b.date.localeCompare(a.date));

  HOTS.renderArticleCards(grid, filtered);

}