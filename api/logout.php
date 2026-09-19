<?php
/* api/logout.php — POST → destroy the PHP session. */
declare(strict_types=1);
require __DIR__ . '/../auth.php';

logout_user();
json_out(['ok' => true]);