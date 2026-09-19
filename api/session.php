<?php
/* api/session.php — GET current session state. Used by SetReps.html at boot
   to enforce login and to fetch the username for the top-right chip. */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth.php';

$uid = current_user_id();
if ($uid === null) {
    json_out(['logged_in' => false]);
}

$db = db();
$row = user_payload_row($db, $uid);
if ($row === null) {
    logout_user();
    json_out(['logged_in' => false]);
}

json_out([
    'logged_in' => true,
    'user' => [
        'id'       => (int) $row['id'],
        'username' => $row['username'],
        'profile'  => profile_from_row($row),
    ],
]);