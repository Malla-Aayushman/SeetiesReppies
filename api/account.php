<?php
/* api/account.php — POST {name?, password?} → update account name and/or
   password from the "Edit profile" dropdown. Blank password = no change. */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth.php';

$db = db();
$uid = require_login();

$body = read_json_body();
$hasName = array_key_exists('name', $body);
$name = $hasName ? trim((string) $body['name']) : null;
$password = $body['password'] ?? '';

$sets = [];
$params = [];

if ($hasName) {
    if ($name === '') {
        json_out(['error' => 'Name cannot be empty'], 400);
    }
    if (!preg_match('/^[A-Za-z0-9_. -]{3,60}$/', $name)) {
        json_out(['error' => 'Name must be 3–60 characters (letters, numbers, spaces, . _ -)'], 400);
    }
    $st = $db->prepare('SELECT id FROM users WHERE username = ? AND id <> ?');
    $st->execute([$name, $uid]);
    if ($st->fetch() !== false) {
        json_out(['error' => 'That name is already taken'], 409);
    }
    $sets[] = 'username = ?';
    $params[] = $name;
}

if ($password !== '') {
    if (strlen($password) < 4) {
        json_out(['error' => 'Password must be at least 4 characters'], 400);
    }
    $sets[] = 'pass_hash = ?';
    $params[] = password_hash($password, PASSWORD_DEFAULT);
}

if (count($sets) > 0) {
    $params[] = $uid;
    $db->prepare('UPDATE users SET ' . implode(', ', $sets) . ' WHERE id = ?')
       ->execute($params);
}

$row = user_payload_row($db, $uid);
json_out([
    'ok' => true,
    'user' => [
        'id'       => (int) $row['id'],
        'username' => $row['username'],
        'profile'  => profile_from_row($row),
    ],
]);