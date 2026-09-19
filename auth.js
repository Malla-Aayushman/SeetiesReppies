/* auth.js — shared submit handler for login.php / register.php.
   mode is read from the script tag's data-mode attribute. */
(function () {
  var script = document.querySelector('script[data-mode]');
  var mode = (script && script.dataset.mode) || 'login';
  var form = document.getElementById('auth-form');
  var errEl = document.getElementById('auth-error');
  var btn = form.querySelector('.auth-btn');
  var idleLabel = mode === 'login' ? 'Log in' : 'Create account';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errEl.textContent = '';

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    if (!username || !password) {
      errEl.textContent = 'Fill in both fields.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Please wait…';
    try {
      var res = await fetch('api/' + (mode === 'login' ? 'login.php' : 'register.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });
      var data = await res.json();
      if (!res.ok || !data.ok || !data.user) {
        errEl.textContent = data.error || 'Something went wrong.';
        btn.disabled = false;
        btn.textContent = idleLabel;
        return;
      }
      window.location.href = 'SetReps.html';
    } catch (err) {
      errEl.textContent = 'Cannot reach the server. Is Apache + MySQL running in XAMPP?';
      btn.disabled = false;
      btn.textContent = idleLabel;
    }
  });
})();