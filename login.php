<?php
/* login.php — standalone login page (same theme as the app). */

 // This enables strict type checking in PHP.
declare(strict_types=1);  
 //For example, if a function expects an integer,
 // PHP will be stricter about receiving something that isn't an integer.

// this loads your auth.php and db.php files
require __DIR__ . '/auth.php';
require __DIR__ . '/db.php';

// if already logged in ( i.e current_user_id has value) it will send the user to SetReps.html page 
if (current_user_id() !== null) {
    header('Location: SetReps.html');
    exit;
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SetReps — Log in</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="auth.css" />
  </head>


  <body>
    <div class="auth-shell">
      <div class="auth-brand">SET<span>REPS</span></div>
      <div class="auth-card">
        <h1 class="auth-title">Log in</h1>

        <!-- this is thr form  -->
        <form id="auth-form" novalidate>
          
          <label class="auth-label" for="username">Username</label>
          <input class="auth-input" type="text" id="username" autocomplete="username" required />
          
          <label class="auth-label" for="password">Password</label>
          <input class="auth-input" type="password" id="password" autocomplete="current-password" required />
          
          <div class="auth-error" id="auth-error"></div>
          
          <button class="auth-btn" type="submit">Log in</button>
        </form>
        
        
        <p class="auth-alt">No account yet? <a class="auth-link" href="register.php">Create one</a></p>
      </div>
    </div>

    <script src="auth.js" data-mode="login"></script>

  </body>
</html>