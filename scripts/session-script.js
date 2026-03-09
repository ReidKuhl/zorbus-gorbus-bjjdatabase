// reads and logs session data
console.log("📦 Session check —",
  "authN:", sessionStorage.getItem("authN"),
  "| user:", sessionStorage.getItem("username"),
  "| loginTime:", sessionStorage.getItem("loginTime")
);


// redirect to login if not authenticated
function requireAuth() {
  const isAuthN = sessionStorage.getItem('authN');
  if (!isAuthN) {
    console.log("Not authenticated — redirecting to login");
    window.location.href = 'pages/login-page.html';
  }
}

// inject the username into a nav element if present
function injectNavUser() {
  const el = document.getElementById('nav-username');
  if (el) el.textContent = sessionStorage.getItem('username') || 'user';
}

// sign out
function signOut() {
  console.log("👋 Signing out — clearing session");
  sessionStorage.clear();
  window.location.href = 'pages/login-page.html';
}
