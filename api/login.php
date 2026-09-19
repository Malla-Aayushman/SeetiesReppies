<?php
/* api/login.php — POST {username, password} → session login. */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth.php';

ensure_session();

// Already logged in — just hand back the current user.
if (current_user_id() !== null) {
    $row = user_payload_row(db(), current_user_id());
    if ($row !== null) {
        json_out([
            'ok' => true,
            'user' => [
                'id'       => (int) $row['id'],
                'username' => $row['username'],
                'profile'  => profile_from_row($row),
            ],
        ]);
    }
}

$body = read_json_body();
$username = trim((string) ($body['username'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($username === '' || $password === '') {
    json_out(['error' => 'Enter your username and password'], 400);
}

$st = db()->prepare(
    'SELECT id, username, pass_hash, weight, height, age, sex, units FROM users WHERE username = ?'
);
$st->execute([$username]);
$row = $st->fetch();

if ($row === false || !password_verify($password, $row['pass_hash'])) {
    json_out(['error' => 'Incorrect username or password'], 401);
}

login_user((int) $row['id']);
json_out([
    'ok' => true,
    'user' => [
        'id'       => (int) $row['id'],
        'username' => $row['username'],
        'profile'  => profile_from_row($row),
    ],
]);