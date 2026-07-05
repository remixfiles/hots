const articlesData = [
  {
    id: 1,
    slug: "2026/july/wimbledon-young-challenger-stuns-champion",
    title: "Wimbledon 2026: 19-Year-Old Phenom Stuns Defending Champion in Thrilling Upset",
    excerpt: "In a match that will be remembered for generations, the young British talent defeated the world number one in five grueling sets under the Centre Court roof.",
    category: "Sports",
    date: "2026-07-05",
    author: "Marcus Hale",
    image: "https://picsum.photos/id/1005/600/400",
    readTime: "6 min read"
  },
  {
    id: 2,
    slug: "2026/july/un-ai-ethics-framework-global-ai-governance",
    title: "Historic UN Framework Establishes First Global Standards for AI Development",
    excerpt: "After months of intense negotiations, the United Nations has adopted a comprehensive set of binding principles governing the ethical development and deployment of artificial intelligence worldwide.",
    category: "Artificial Intelligence",
    date: "2026-07-04",
    author: "Dr. Elena Voss",
    image: "https://picsum.photos/id/101/600/400",
    readTime: "9 min read"
  },
  {
    id: 3,
    slug: "2026/july/istanbul-peace-talks-russia-ukraine-ceasefire-agreement",
    title: "Russia and Ukraine Reach Framework Ceasefire Deal in Istanbul Peace Talks",
    excerpt: "In a significant diplomatic breakthrough, representatives from both nations have agreed to a temporary ceasefire and humanitarian corridors following weeks of closed-door negotiations in Turkey.",
    category: "War Updates",
    date: "2026-07-03",
    author: "Sophia Lang",
    image: "https://picsum.photos/id/160/600/400",
    readTime: "7 min read"
  },
  {
    id: 4,
    slug: "2026/july/nasa-artemis-iii-habitat-milestone-moon-colony",
    title: "NASA Achieves Key Milestone in Artemis Program with Lunar Habitat Deployment",
    excerpt: "The successful installation of the first long-term habitat modules marks a historic step toward establishing a permanent human presence on the Moon by the end of the decade.",
    category: "Space",
    date: "2026-07-02",
    author: "Dr. Raj Patel",
    image: "https://picsum.photos/id/251/600/400",
    readTime: "8 min read"
  },
  {
    id: 5,
    slug: "2026/july/giant-squid-beached-australia-marine-mystery",
    title: "Colossal Giant Squid Washes Ashore in Australia, Baffling Marine Biologists",
    excerpt: "A massive specimen measuring over 12 meters has appeared on a remote Western Australian beach, prompting urgent scientific investigation into possible environmental causes.",
    category: "Weird News",
    date: "2026-07-01",
    author: "Liam Chen",
    image: "https://picsum.photos/id/133/600/400",
    readTime: "5 min read"
  },
  {
    id: 6,
    slug: "2026/june/cop32-climate-summit-ambitious-emissions-cuts",
    title: "COP32: World Leaders Commit to Drastic Emissions Reductions in Landmark Deal",
    excerpt: "Negotiators in Geneva secured the most ambitious global climate agreement to date, with major economies pledging steep cuts and new funding mechanisms for vulnerable nations.",
    category: "Climate",
    date: "2026-06-28",
    author: "Isabella Moreau",
    image: "https://picsum.photos/id/201/600/400",
    readTime: "10 min read"
  },
  {
    id: 7,
    slug: "2026/june/apple-vision-pro-2-ai-spatial-computing-revolution",
    title: "Apple's Vision Pro 2 Promises to Redefine Spatial Computing with On-Device AI",
    excerpt: "The highly anticipated sequel introduces groundbreaking AI capabilities that process everything locally, raising new questions about privacy, productivity, and the future of personal computing.",
    category: "Technology",
    date: "2026-06-22",
    author: "Jordan Hale",
    image: "https://picsum.photos/id/30/600/400",
    readTime: "7 min read"
  },
  {
    id: 8,
    slug: "2026/june/tesla-robotaxi-launch-autonomous-future",
    title: "Tesla Unveils Robotaxi Fleet, Promises to Transform Urban Transportation Forever",
    excerpt: "Elon Musk's company revealed its production-ready autonomous vehicle designed specifically for ride-hailing, with initial deployments planned for major U.S. cities within 18 months.",
    category: "Business",
    date: "2026-06-15",
    author: "Priya Sharma",
    image: "https://picsum.photos/id/180/600/400",
    readTime: "6 min read"
  },
  {
    id: 9,
    slug: "2026/may/g7-tokyo-summit-global-trade-security-pact",
    title: "G7 Tokyo Summit Yields New Pact on Supply Chains and Indo-Pacific Security",
    excerpt: "Leaders from the world's largest economies agreed on coordinated strategies to secure critical minerals, semiconductor supply, and collective defense initiatives in the Asia-Pacific region.",
    category: "World News",
    date: "2026-05-18",
    author: "Thomas Reed",
    image: "https://picsum.photos/id/28/600/400",
    readTime: "8 min read"
  },
  {
    id: 10,
    slug: "2026/may/us-2026-midterms-key-battlegrounds-emerge",
    title: "2026 Midterm Elections: Battle for Congress Intensifies as Primaries Heat Up",
    excerpt: "With control of both chambers at stake, early primaries reveal fierce competition in key swing districts as both parties prepare for what could be a decisive electoral showdown.",
    category: "Political News",
    date: "2026-05-05",
    author: "Rachel Kim",
    image: "https://picsum.photos/id/29/600/400",
    readTime: "7 min read"
  },
  {
    id: 11,
    slug: "2026/april/crispr-gene-editing-cure-rare-disease-trial",
    title: "CRISPR Gene Editing Achieves First Successful Cure for Rare Genetic Disorder",
    excerpt: "Clinical trial results published today show complete remission in patients with a previously untreatable inherited condition, opening doors for wider application of precision medicine.",
    category: "Science",
    date: "2026-04-12",
    author: "Dr. Aisha Khan",
    image: "https://picsum.photos/id/201/600/400",
    readTime: "9 min read"
  },
  {
    id: 12,
    slug: "2026/march/hollywood-iconic-franchise-reboot-major-studios",
    title: "Hollywood's Biggest Franchise Reboot Confirmed with Star-Studded Cast and New Director",
    excerpt: "After years of speculation, the studio has officially greenlit a fresh take on the beloved science fiction saga, bringing together Oscar winners and visionary filmmakers for a 2028 release.",
    category: "Entertainment",
    date: "2026-03-08",
    author: "Natalie Brooks",
    image: "https://picsum.photos/id/251/600/400",
    readTime: "5 min read"
  }
];

// Helper to get articles by category
function getArticlesByCategory(category) {
  return articlesData.filter(a => a.category.toLowerCase() === category.toLowerCase());
}

// Helper to get latest articles
function getLatestArticles(count = 6) {
  return [...articlesData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

// Helper to get articles for a specific month/year
function getArticlesByMonth(year, month) {
  return articlesData.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === year && (d.getMonth() + 1) === month;
  });
}

// Helper to get articles for year
function getArticlesByYear(year) {
  return articlesData.filter(a => new Date(a.date).getFullYear() === year);
}

// Render a single news card (used across homepage, categories, archives, search)
function renderNewsCard(article) {
  const card = document.createElement('a');
  card.href = `/${article.slug}/`;
  card.className = 'news-card';
  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${article.image}" alt="${article.title}" loading="lazy">
      <span class="category-tag">${article.category}</span>
    </div>
    <div class="card-content">
      <h3 class="card-title">${article.title}</h3>
      <p class="card-excerpt">${article.excerpt}</p>
      <div class="card-meta">
        <span class="meta-date">${new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <span class="meta-author">${article.author}</span>
      </div>
    </div>
  `;
  return card;
}

// Render multiple cards into a container
function renderArticleCards(container, articles) {
  container.innerHTML = '';
  if (!articles || articles.length === 0) {
    container.innerHTML = '<p class="no-results">No articles found in this section yet.</p>';
    return;
  }
  articles.forEach(article => {
    const card = renderNewsCard(article);
    container.appendChild(card);
  });
}
