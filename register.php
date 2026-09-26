<?php
/* register.php — standalone registration page (same theme as the app). */
declare(strict_types=1);
require __DIR__ . '/auth.php';
require __DIR__ . '/db.php';

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
    <title>SetReps — Create account</title>
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
        <h1 class="auth-title">Create account</h1>

        <!--  Form  -->
          <!--  using this from we will validate the user input  -->
        <form id="auth-form" novalidate>
          <label class="auth-label" for="username">Username</label>
          <input class="auth-input" type="text" id="username" autocomplete="username" placeholder="3–60 characters" required />

          <label class="auth-label" for="password">Password</label>
          <input class="auth-input" type="password" id="password" autocomplete="new-password" placeholder="At least 4 characters" required />

          <div class="auth-error" id="auth-error"></div>
          <button class="auth-btn" type="submit">Create account</button>

        </form>

        <p class="auth-alt">Already registered? <a class="auth-link" href="login.php">Log in</a></p>
      </div>
    </div>


    <script src="auth.js" data-mode="register"></script>

     
  </body>
</html>