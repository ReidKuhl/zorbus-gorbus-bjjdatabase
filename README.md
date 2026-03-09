# BJJ DB

CIS 376 — Spring 2026 | Reid Kuhlers

## What is this?

A front-end jiujitsu move database for grapplers at my gym. Search, filter, and study techniques — submissions, sweeps, guard passes, escapes, and takedowns — each with an embedded YouTube instructional video and a link to a written reference article.

**User Story:** As a BJJ practitioner, I want to search and filter a library of techniques by category and difficulty so I can quickly find instructionals to study between training sessions.

---

## Live App

🔗 **[Deployed App →](https://your-github-username.github.io/zorbus-gorbus-html-intro/)**
🔗 **[GitHub Repo →](https://github.com/your-github-username/zorbus-gorbus-html-intro)**

> Tested on desktop Chrome + Firefox and mobile (iOS Safari). Login with `reid` / `lasagna`.

---

## Features

- **Login / Sign-out** with session storage and password check
- **Search** across move name, description, category, tags, and position
- **Filter** by technique category (submissions, sweeps, passes, escapes, takedowns)
- **Filter** by difficulty level (beginner / intermediate / advanced)
- **Sort** alphabetically or by difficulty
- **Modal** with embedded YouTube video + article link for each move
- **Session page** to view and clear stored session data

---

## Authorship & Attribution

- Technique descriptions: original writing informed by personal BJJ training
- Video links: YouTube (BJJ Fanatics, Stephan Kesting, various)
- Article links: [BJJ Heroes](https://bjjheroes.com), [Grappling Insider](https://grapplinginsider.com), [BJJ Fanatics Blog](https://bjjfanatics.com/blogs/news)
- CSS framework: [Bootstrap 5](https://getbootstrap.com)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com)
- Fonts: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue), [DM Sans](https://fonts.google.com/specimen/DM+Sans), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- CSS normalize: [normalize.css](https://github.com/necolas/normalize.css)

---

## Design Inspiration

Color scheme and layout inspiration: dark martial arts aesthetic, inspired by grappling competition websites and dark-mode developer tools UIs.

> *(Screenshots of inspiration pages linked in [Issue #1](https://github.com/your-github-username/zorbus-gorbus-html-intro/issues/1))*

---

## Code Highlight

```javascript
// Controlled search across multiple fields of an object array
const SEARCHABLE_FIELDS = ["name", "category", "description", "tags", "position"];

function getFilteredMoves() {
  const q = searchQuery.toLowerCase();

  return bjjMoves.filter(move =>
    SEARCHABLE_FIELDS.some(field => {
      const val = Array.isArray(move[field])
        ? move[field].join(" ")       // flatten tag arrays to string
        : String(move[field] || "");
      return val.toLowerCase().includes(q);
    })
  );
}
```

**How it works:** When the user types in the search input, an `input` event fires → `getFilteredMoves()` reads `searchQuery` from state → it loops over each move in the data array (`bjjMoves`) and checks whether any of the defined searchable fields contain the query string → matching moves are passed to `renderMoves()` which clears the DOM grid and re-injects card elements for each result. Category and difficulty filter buttons update their respective state variables and call the same pipeline, so all filters compose together.

---

## Folder Structure

```
/
├── index.html              ← protected home / move database
├── assets/
│   └── data/
│       └── data.js         ← 23 BJJ moves as JS object array
├── pages/
│   ├── login.html          ← sign-in page
│   └── session.html        ← session data viewer
├── scripts/
│   ├── login-script.js     ← auth + session storage
│   ├── search.js           ← search, filter, sort, modal
│   └── session.js          ← session utilities (requireAuth, signOut)
└── styles/
    └── main.css            ← all styles (dark theme, responsive)
```
