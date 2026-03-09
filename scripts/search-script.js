const SEARCHABLE_FIELDS = ["name", "category", "description", "tags", "position"];

let activeCat = "all";
let activeDiff = "all";
let activeSort = "id";
let searchQuery = "";

// render cards 
function renderMoves(items) {
  const grid = document.getElementById("movesGrid");
  const meta = document.getElementById("resultsMeta");
  grid.innerHTML = "";

  meta.textContent = `${items.length} move${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-search"></i>
        <p>No moves found. Try a different search or filter.</p>
      </div>`;
    return;
  }

  items.forEach(move => {
    const card = document.createElement("div");
    card.className = "move-card";
    card.setAttribute("data-id", move.id);

    card.innerHTML = `
      <div class="card-top">
        <h3 class="move-name">${move.name}</h3>
        <span class="badge-diff diff-${move.difficulty}">${move.difficulty}</span>
      </div>
      <p class="card-desc">${move.description}</p>
      <div class="card-actions">
        <a class="btn-video" href="${move.videoUrl}" target="_blank" rel="noopener">
          <i class="bi bi-play-circle-fill"></i> Watch
        </a>
        <a class="btn-link" href="${move.externalLink}" target="_blank" rel="noopener">
          <i class="bi bi-book"></i> Article
        </a>
      </div>`;

    grid.appendChild(card);
  });

  console.log(`🥋 Rendered ${items.length} moves (cat: ${activeCat}, diff: ${activeDiff}, sort: ${activeSort}, q: "${searchQuery}")`);
}

// getting searched and filtered moves
function getFilteredMoves() {
  let results = [...bjjMoves];

  // difficulty filter
  if (activeDiff !== "all") {
    results = results.filter(m => m.difficulty === activeDiff);
  }

  // text search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    results = results.filter(move =>
      SEARCHABLE_FIELDS.some(field => {
        const val = Array.isArray(move[field])
          ? move[field].join(" ")
          : String(move[field] || "");
        return val.toLowerCase().includes(q);
      })
    );
  }

  // sort
  results = sortMoves(results, activeSort);

  return results;
}

function sortMoves(moves, sortKey) {
  const sorted = [...moves];
  if (sortKey === "name-az") sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortKey === "name-za") sorted.sort((a, b) => b.name.localeCompare(a.name));
  if (sortKey === "difficulty") {
    const order = { beginner: 0, intermediate: 1, advanced: 2 };
    sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }
  // default: id order 
  return sorted;
}

function applyFilters() {
  renderMoves(getFilteredMoves());
}

// event listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("🥋 BJJ DB initialized. Moves loaded:", bjjMoves.length);

  // page load render
  applyFilters();

  // search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function (e) {
    searchQuery = e.target.value.trim();
    console.log("🔎 Search query:", searchQuery);
    applyFilters();
  });

  // difficulty filter buttons
  document.querySelectorAll(".diff-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".diff-btn").forEach(b => {
        b.classList.remove("active", "active-beginner", "active-intermediate", "active-advanced");
      });
      this.classList.add("active", `active-${this.dataset.diff}`);
      activeDiff = this.dataset.diff;
      console.log("🎚️ Difficulty filter:", activeDiff);
      applyFilters();
    });
  });

  // sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      activeSort = this.value;
      console.log("🔃 Sort changed to:", activeSort);
      applyFilters();
    });
  }

  // navbar sign out
  const signoutBtn = document.getElementById("signout-btn");
  if (signoutBtn) signoutBtn.addEventListener("click", signOut);

  // inject username in navbar
  injectNavUser();
});