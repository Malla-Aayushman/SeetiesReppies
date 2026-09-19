-- ============================================================
--  SetReps — Gym Progress Tracker
--  Import this file in phpMyAdmin:
--    Database tab → Import → choose this file → Go
--  OR run from the XAMPP shell:
--    mysql -u root < setreps.sql
--
--  This creates the `setreps` database and all tables.
--  Safe to re-run: uses IF NOT EXISTS everywhere.
-- ============================================================

CREATE DATABASE IF NOT EXISTS `setreps`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `setreps`;

-- ── users ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `username`   VARCHAR(60)      NOT NULL,
  `pass_hash`  VARCHAR(255)     NOT NULL,
  `weight`     DECIMAL(6,2)     NULL     DEFAULT NULL,
  `height`     DECIMAL(6,2)     NULL     DEFAULT NULL,
  `age`        TINYINT UNSIGNED NULL     DEFAULT NULL,
  `sex`        ENUM('m','f')    NOT NULL DEFAULT 'm',
  `units`      ENUM('kg','lb')  NOT NULL DEFAULT 'kg',
  `created_at` TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_username` (`username`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ── exercises ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `exercises` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`      INT UNSIGNED NOT NULL,
  `name`         VARCHAR(80)  NOT NULL,
  `muscle_group` VARCHAR(20)  NOT NULL,
  `is_custom`    TINYINT(1)   NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ex_user` (`user_id`, `name`),
  CONSTRAINT `fk_ex_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ── sessions ──────────────────────────────────────────────
--  sets_json stores an array of {weight, reps} objects, e.g.:
--  [{"weight":80,"reps":8},{"weight":80,"reps":6}]
CREATE TABLE IF NOT EXISTS `sessions` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`    INT UNSIGNED NOT NULL,
  `exercise`   VARCHAR(80)  NOT NULL,
  `date`       CHAR(10)     NOT NULL   COMMENT 'YYYY-MM-DD',
  `sets_json`  TEXT         NOT NULL,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_sess_user_ex_date` (`user_id`, `exercise`, `date`),
  CONSTRAINT `fk_sess_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
