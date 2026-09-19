<?php
/* api/profile.php — GET current profile; POST {weight,height,age,sex,units}
   (or wrapped as {profile: {...}}) updates it. */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth.php';

$db = db();
$uid = require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
    $row = user_payload_row($db, $uid);
    json_out(['ok' => true, 'profile' => profile_from_row($row)]);
}

$body = read_json_body();
$p = isset($body['profile']) && is_array($body['profile']) ? $body['profile'] : $body;

$weight = (isset($p['weight']) && $p['weight'] !== '' && $p['weight'] !== null) ? (float) $p['weight'] : null;
$height = (isset($p['height']) && $p['height'] !== '' && $p['height'] !== null) ? (float) $p['height'] : null;
$age    = (isset($p['age'])    && $p['age']    !== '' && $p['age']    !== null) ? (int) $p['age']    : null;
$sex    = in_array($p['sex'] ?? 'm', ['m', 'f'], true) ? $p['sex'] : 'm';
$units  = in_array($p['units'] ?? 'kg', ['kg', 'lb'], true) ? $p['units'] : 'kg';

if ($weight !== null && ($weight < 20 || $weight > 500)) $weight = null;
if ($height !== null && ($height < 60 || $height > 250)) $height = null;
if ($age !== null && ($age < 5 || $age > 120)) $age = null;

$db->prepare('UPDATE users SET weight = ?, height = ?, age = ?, sex = ?, units = ? WHERE id = ?')
   ->execute([$weight, $height, $age, $sex, $units, $uid]);

json_out(['ok' => true]);