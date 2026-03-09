# Jiujitsu Database

## Authorship & Attribution
- CIS 376 — Spring 2026 | Reid Kuhlers

- Technique descriptions: original writing informed by personal BJJ training
- Video links: YouTube (BJJ Fanatics, Stephan Kesting, various)
- Article links: [BJJ Heroes](https://bjjheroes.com), [Grappling Insider](https://grapplinginsider.com), [BJJ Fanatics Blog](https://bjjfanatics.com/blogs/news)
- CSS framework: [Bootstrap 5](https://getbootstrap.com)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com)
- Fonts: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue), [DM Sans](https://fonts.google.com/specimen/DM+Sans), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- General Reference: [W3Schools](https://www.w3schools.com)

---

> *"Every roll starts with a move. Know your moves."*

## User Story

As a BJJ practitioner, I want to search and filter a library of techniques by category and difficulty so I can quickly find instructionals to study between training sessions.

---

## Live App

🔗 **[Deployed App →](https://reidkuhl.github.io/zorbus-gorbus-bjjdatabase/pages/login-page.html)**
🔗 **[GitHub Repo →](https://github.com/ReidKuhl/zorbus-gorbus-bjjdatabase)**

> Tested on desktop Chrome + Firefox and mobile (iOS Safari). Login with `reid` / `lasagna`.

---

## Features

- **Login / Sign-out** with session storage and front-end password check
- **Search** across move name, description, category, tags, and position
- **Filter by category** (submissions, sweeps, passes, escapes, takedowns)
- **Filter by difficulty** (beginner / intermediate / advanced)
- **Sort** alphabetically or by difficulty
- **Modal** with embedded YouTube video + article link for each move
- **Session page** to view and clear stored session data

---

## Design Inspiration

![Liked how the only thing viewable in the login page was the login window itself.](/assets/login-inspo.png)

I liked how the only thing viewable in the login page was the login window itself.
- Design Inspiration: [SCS](https://account.speedcubeshop.com/authentication/login?client_id=22d6852a-023e-410e-ae94-b81b8aaa5191&locale=en&redirect_uri=%2Fauthentication%2Foauth%2Fauthorize%3Fclient_id%3D22d6852a-023e-410e-ae94-b81b8aaa5191%26locale%3Den%26nonce%3D2c6f225d-2570-4d20-b576-a979fb85a597%26redirect_uri%3Dhttps%253A%252F%252Faccount.speedcubeshop.com%252Fcallback%26region_country%3DUS%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3DhWN9eteyxdBU7dQzVIrFDD3i&region_country=US) 

![I liked this color scheme. It is simple and easy on the eyes.](/assets/color-inspo.png)

I liked this color scheme. It is simple and easy on the eyes.
- Color Inspiration: [HookAgency](https://hookagency.com/blog/luxury-website-colors/)
---

## Code Highlight

```javascript
// Multi-field search across an object array
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

**How it works:** When the user types in the search input, an `input` event fires and updates `searchQuery` in state. `getFilteredMoves()` then loops over the `bjjMoves` data array and checks whether any of the defined searchable fields contain the query string — including flattening tag arrays into a single string for comparison. Matching moves are passed to `renderMoves()`, which clears the DOM grid and re-injects a card element for each result. Category and difficulty filter buttons update their own state variables and call the same pipeline, so all three filters compose together on every render.

---

## Folder Structure

```
/
├── index.html             
├── assets/
│   └── data/
│       └── data.js       
├── pages/
│   ├── login.html          
│   └── session.html        
├── scripts/
│   ├── login-script.js     
│   ├── search.js           
│   └── session.js          
└── styles/
    ├── main.css            
    └── login-style.css     
```

## Verification

Tested on my personal mobile device. Known issues include some difficulties getting buttons at the links to move references. Also things are too close to the edges of the screen.