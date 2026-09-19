<?php
/* auth.php — PHP session helpers shared by the API endpoints. */
declare(strict_types=1);

function ensure_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function current_user_id(): ?int {
    ensure_session();
    return isset($_SESSION['uid']) ? (int) $_SESSION['uid'] : null;
}

function login_user(int $id): void {
    ensure_session();
    session_regenerate_id(true);
    $_SESSION['uid'] = $id;
}

function logout_user(): void {
    ensure_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

function json_out($data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/* Map a users table row to the client's {profile} shape. */
function profile_from_row(array $row): array {
    return [
        'weight' => $row['weight'] !== null ? (float) $row['weight'] : null,
        'height' => $row['height'] !== null ? (float) $row['height'] : null,
        'age'    => $row['age'] !== null    ? (int) $row['age']    : null,
        'sex'    => $row['sex'] ?? 'm',
        'units'  => $row['units'] ?? 'kg',
    ];
}

function user_payload_row(PDO $db, int $id): ?array {
    $st = $db->prepare(
        'SELECT id, username, weight, height, age, sex, units FROM users WHERE id = ?'
    );
    $st->execute([$id]);
    $row = $st->fetch();
    return $row !== false ? $row : null;
}

/* API guard — sends 401 JSON and stops when not logged in. Returns the uid. */
function require_login(): int {
    $id = current_user_id();
    if ($id === null) {
        json_out(['error' => 'Not logged in'], 401);
    }
    return $id;
}