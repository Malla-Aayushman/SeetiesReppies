<?php
/* api/register.php — POST {username, password} → create account, auto-login. */
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

if (!preg_match('/^[A-Za-z0-9_. -]{3,60}$/', $username)) {
    json_out(['error' => 'Username must be 3–60 characters (letters, numbers, spaces, . _ -)'], 400);
}
if (strlen($password) < 4) {
    json_out(['error' => 'Password must be at least 4 characters'], 400);
}

$db = db();

$st = $db->prepare('SELECT id FROM users WHERE username = ?');
$st->execute([$username]);
if ($st->fetch() !== false) {
    json_out(['error' => 'That username is already taken'], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$st = $db->prepare('INSERT INTO users (username, pass_hash) VALUES (?, ?)');
$st->execute([$username, $hash]);
$id = (int) $db->lastInsertId();

login_user($id);
json_out([
    'ok' => true,
    'user' => [
        'id'       => $id,
        'username' => $username,
        'profile'  => profile_from_row([
            'id' => $id, 'username' => $username,
            'weight' => null, 'height' => null, 'age' => null,
            'sex' => 'm', 'units' => 'kg',
        ]),
    ],
]);