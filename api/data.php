<?php
/* api/data.php — GET returns the user's full {profile, exercises, sessions}
   store (same shape as the client). POST replaces it (full sync). */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/../auth.php';

$db = db();
$uid = require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'GET') {
    $row = user_payload_row($db, $uid);

    $exSt = $db->prepare('SELECT name, muscle_group, is_custom FROM exercises WHERE user_id = ? ORDER BY id');
    $exSt->execute([$uid]);
    $exercises = array_map(static function (array $e) {
        return [
            'name'        => $e['name'],
            'muscleGroup' => $e['muscle_group'],
            'isCustom'    => (bool) $e['is_custom'],
        ];
    }, $exSt->fetchAll());

    $seSt = $db->prepare('SELECT id, exercise, date, sets_json FROM sessions WHERE user_id = ? ORDER BY date');
    $seSt->execute([$uid]);
    $sessions = [];
    foreach ($seSt->fetchAll() as $s) {
        $sets = json_decode((string) $s['sets_json'], true);
        if (!is_array($sets)) $sets = [];
        $sessions[] = [
            'id'       => 'db' . $s['id'],
            'exercise' => $s['exercise'],
            'date'     => $s['date'],
            'sets'     => $sets,
        ];
    }

    json_out([
        'ok' => true,
        'store' => [
            'profile'   => profile_from_row($row),
            'exercises' => $exercises,
            'sessions'  => $sessions,
        ],
    ]);
}

// ── POST: full sync (client store is the source of truth) ────────────────
$body = read_json_body();
$profile   = is_array($body['profile'] ?? null) ? $body['profile'] : [];
$exercises = is_array($body['exercises'] ?? null) ? $body['exercises'] : [];
$sessions  = is_array($body['sessions'] ?? null) ? $body['sessions'] : [];

// Profile → users table.
$weight = (isset($profile['weight']) && $profile['weight'] !== '' && $profile['weight'] !== null) ? (float) $profile['weight'] : null;
$height = (isset($profile['height']) && $profile['height'] !== '' && $profile['height'] !== null) ? (float) $profile['height'] : null;
$age    = (isset($profile['age'])    && $profile['age']    !== '' && $profile['age']    !== null) ? (int) $profile['age']    : null;
$sex    = in_array($profile['sex'] ?? 'm', ['m', 'f'], true) ? $profile['sex'] : 'm';
$units  = in_array($profile['units'] ?? 'kg', ['kg', 'lb'], true) ? $profile['units'] : 'kg';
$db->prepare('UPDATE users SET weight = ?, height = ?, age = ?, sex = ?, units = ? WHERE id = ?')
   ->execute([$weight, $height, $age, $sex, $units, $uid]);

// Replace exercises (all custom/added exercises carry is_custom = 1).
$db->prepare('DELETE FROM exercises WHERE user_id = ?')->execute([$uid]);
$insEx = $db->prepare('INSERT INTO exercises (user_id, name, muscle_group, is_custom) VALUES (?, ?, ?, ?)');
foreach ($exercises as $e) {
    if (!is_array($e)) continue;
    $name = trim((string) ($e['name'] ?? ''));
    if ($name === '') continue;
    $mg = (string) ($e['muscleGroup'] ?? 'chest');
    $insEx->execute([$uid, mb_substr($name, 0, 80), mb_substr($mg, 0, 20), 1]);
}

// Replace sessions.
$db->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$uid]);
$insSe = $db->prepare('INSERT INTO sessions (user_id, exercise, date, sets_json) VALUES (?, ?, ?, ?)');
foreach ($sessions as $s) {
    if (!is_array($s)) continue;
    $ex   = trim((string) ($s['exercise'] ?? ''));
    $date = (string) ($s['date'] ?? '');
    if ($ex === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) continue;
    $clean = [];
    foreach (is_array($s['sets'] ?? null) ? $s['sets'] : [] as $set) {
        if (!is_array($set)) continue;
        $w = (float) ($set['weight'] ?? 0);
        $r = (int) ($set['reps'] ?? 0);
        if ($w >= 0 && $r > 0) $clean[] = ['weight' => $w, 'reps' => $r];
    }
    foreach ($clean as $c) { // already numeric — just keep shape
        $c['weight'] = (float) $c['weight'];
        $c['reps']   = (int) $c['reps'];
    }
    try {
        $insSe->execute([$uid, $ex, $date, json_encode($clean)]);
    } catch (PDOException $e) {
        // Unique (user_id, exercise, date) collision — skip duplicate.
    }
}

json_out(['ok' => true]);


