/* auth.js — shared submit handler for login.php / register.php.
   mode is read from the script tag's data-mode attribute. */

console.log("AUTH.JS IS RUNNING");

(function () {
  var script = document.querySelector('script[data-mode]');
  var mode = (script && script.dataset.mode) || 'login';
  // this is for login page 
  var form = document.getElementById('auth-form');
  var errEl = document.getElementById('auth-error');
  var btn = form.querySelector('.auth-btn');
  var idleLabel = mode === 'login' ? 'Log in' : 'Create account';

  // form submission handler
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // removes previous error message ( by replacing with "")
    errEl.textContent = '';

    // assigning username and password
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    var re_passwordInput = document.getElementById('re_password');
    var re_password = re_passwordInput ? re_passwordInput.value : null;

    // for login
    // error handeling ( validation as all fields needs to be filled )
    if (mode == 'login') {
      if (!username) {
        errEl.textContent = 'username cannot be empty ';
        return;
      }
      if (!password) {
        errEl.textContent = ' password cannot be empty';
        return;
      }
      // if (!username || !password) {
      //    errEl.textContent = 'Fill in both fields.';
      //   return;
    }

    // REGISTRATION VALIDATION
    if (mode == 'register') {
      if (!username) {
        errEl.textContent = ' Please enter a username';
        return;
      }
      if (!password) {
        errEl.textContent = ' Please enter a password';
        return;
      }
      if (username.length < 4) {
        errEl.textContent = ' Username must be at least 4 characters long';
        return;
      }
      if (username.length > 20) {
        errEl.textContent = ' Username must be no more than 20 characters long';
        return;
      }
      if (password.length < 4) {
        errEl.textContent = ' Password must be at least 4 characters long';
        return;
      }
      if (password.length > 30) {
        errEl.textContent = ' Password must be no more than 30 characters long';
        return;
      }
      if (!/^[a-zA-Z_]+$/.test(username)) {
        errEl.textContent = ' Username can only contain letters and underscores';
        return;
      }
      if (/\s/.test(password)) {
        errEl.textContent = ' Password cannot contain spaces';
        return;
      }

      /* can use this to make the user life miserable
     if (!/[A-Z]/.test(password)) {
      errEl.textContent = 'Password must contain at least one uppercase letter.';
       return; }
     Must contain at least one lowercase letter 
     if (!/[a-z]/.test(password)) {
      errEl.textContent = 'Password must contain at least one lowercase letter.';
      return; } 
     
     Must contain at least one number
      if (!/[0-9]/.test(password)) {
      errEl.textContent = 'Password must contain at least one number.'; 
     return; } 
     
     Must contain at least one special character 
     if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~+=;' ]/.test(password)) {
      errEl.textContent = 'Password must contain at least one special character.';
      return; } */

      if (password !== re_password) {
        errEl.textContent = 'Passwords do not match';
        return;
      }
    } // we close the registration validation block


    // we disable button so user cant submit repeatedly
    btn.disabled = true;
    // shows please wait.... message in place of the submit button
    btn.textContent = 'Please wait…';

    try {
      // Decide which PHP file should receive the request
      var endpoint = ('api/' + (mode === 'login' ? 'login.php' : 'register.php'));
      // if login mode, send to login.php, if register mode, send to register.php

      // Send username and password to PHP
      var res = await fetch(endpoint, {
        method: 'POST',
        // Tell PHP that we are sending JSON
        headers: {
          'Content-Type': 'application/json'
        },
        // Convert JavaScript object into JSON
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      // Read PHP's JSON response
      var data = await res.json();

      if (!res.ok || !data.ok || !data.user) {
        errEl.textContent = data.error || 'Something went wrong.';
        btn.disabled = false;
        btn.textContent = idleLabel;
        return;
      }
      // Login/registration successful
      window.location.href = 'SetReps.html';

    } catch (err) {
      console.error('Server request failed:', err);

      errEl.textContent =
        'Cannot reach the server. Is Apache + MySQL running in XAMPP?';

      btn.disabled = false;
      btn.textContent = idleLabel;
    }
  });

})();
// here we closed the entire form validation block 
// Structure -> Form { (login) , (register), submit handler, validation, fetch request, error handling, success redirect } 

/*
                 auth.js
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       LOGIN              REGISTER
          │                   │
    Login validation    Register validation
          │                   │
          └─────────┬─────────┘
                    ↓
              Get username
              Get password
                    ↓
                  fetch()
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
   api/login.php       api/register.php
          │                   │
          └─────────┬─────────┘
                    ↓
                 MySQL
*/
