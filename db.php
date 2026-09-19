<?php
/* db.php — PDO connection + automatic schema bootstrap (XAMPP defaults).
   Connect as root (no password) on localhost. Creates the `setreps`
   database and its tables on first request, so no manual SQL is needed. */
declare(strict_types=1);

function db(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $name = 'setreps';

    try {
        // Connect server-wide first so the database itself can be created.
        $server = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $server->exec(
            "CREATE DATABASE IF NOT EXISTS `$name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        );
        $server = null;

        $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);

        $pdo->exec(
            "CREATE TABLE IF NOT EXISTS users (
                id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                username    VARCHAR(60)  NOT NULL UNIQUE,
                pass_hash   VARCHAR(255) NOT NULL,
                weight      DECIMAL(6,2) NULL,
                height      DECIMAL(6,2) NULL,
                age         TINYINT UNSIGNED NULL,
                sex         ENUM('m','f') NOT NULL DEFAULT 'm',
                units       ENUM('kg','lb') NOT NULL DEFAULT 'kg',
                created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        $pdo->exec(
            "CREATE TABLE IF NOT EXISTS exercises (
                id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_id       INT UNSIGNED NOT NULL,
                name          VARCHAR(80)  NOT NULL,
                muscle_group  VARCHAR(20)  NOT NULL,
                is_custom     TINYINT(1)   NOT NULL DEFAULT 1,
                UNIQUE KEY uq_ex_user (user_id, name),
                CONSTRAINT fk_ex_user FOREIGN KEY (user_id)
                    REFERENCES users (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        $pdo->exec(
            "CREATE TABLE IF NOT EXISTS sessions (
                id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_id    INT UNSIGNED NOT NULL,
                exercise   VARCHAR(80)  NOT NULL,
                date       CHAR(10)     NOT NULL,
                sets_json  TEXT         NOT NULL,
                updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_sess_user_ex_date (user_id, exercise, date),
                CONSTRAINT fk_sess_user FOREIGN KEY (user_id)
                    REFERENCES users (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error' => 'Database connection failed. Check that MySQL (mysqld) is running in XAMPP: ' . $e->getMessage(),
        ]);
        exit;
    }

    return $pdo;
}