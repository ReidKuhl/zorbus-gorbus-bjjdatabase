// setting password
const VALID_PASSWORD = "lasagna";

console.log("Login page loaded. Password is: lasagna");

document.addEventListener('DOMContentLoaded', function () {

  const loginBtn   = document.getElementById('login-button');
  const errorDiv   = document.getElementById('login-error');
  const toggleBtn  = document.getElementById('togglePw');
  const eyeIcon    = document.getElementById('eyeIcon');
  const pwInput    = document.getElementById('password');

  // password visibility toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isHidden = pwInput.type === 'password';
      pwInput.type = isHidden ? 'text' : 'password';
      eyeIcon.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
    });
  }

  // login button click handler
  loginBtn.addEventListener('click', function () {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    console.log("🔑 Login attempt — username:", username);

    // password check
    if (password === VALID_PASSWORD) {
      console.log("✅ Login SUCCESS — welcome,", username);

      // store session data
      sessionStorage.setItem('authN',      'true');
      sessionStorage.setItem('username',   username);
      sessionStorage.setItem('loginTime',  new Date().toISOString());
      sessionStorage.setItem('loginAttempts',
        String(parseInt(sessionStorage.getItem('loginAttempts') || '0') + 1)
      );

      console.log("📦 Session stored:", {
        authN:    sessionStorage.getItem('authN'),
        username: sessionStorage.getItem('username'),
        time:     sessionStorage.getItem('loginTime'),
      });

      // go to database page
      window.location.assign('../index.html');

    } else {
      console.log("❌ Login FAILED — bad credentials");
      errorDiv.textContent = 'Invalid username or password.';
    }
  });

  // clear error on input
  document.getElementById('username').addEventListener('input', () => errorDiv.textContent = '');
  document.getElementById('password').addEventListener('input', () => errorDiv.textContent = '');

  // allow enter key to submit form
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') loginBtn.click();
  });

});
