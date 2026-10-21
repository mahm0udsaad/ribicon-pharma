-- Ribicon Pharma schema (MariaDB 10.6+ / MySQL 8+). Bilingual fields use _en / _fr suffixes.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  position INT NOT NULL DEFAULT 0,
  status ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  image VARCHAR(255) NOT NULL DEFAULT '',
  title_en VARCHAR(200) NOT NULL,
  title_fr VARCHAR(200) NOT NULL,
  eyebrow_en VARCHAR(200) NOT NULL DEFAULT '',
  eyebrow_fr VARCHAR(200) NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL,
  summary_fr TEXT NOT NULL,
  image_alt_en VARCHAR(300) NOT NULL DEFAULT '',
  image_alt_fr VARCHAR(300) NOT NULL DEFAULT '',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  category_id INT UNSIGNED NOT NULL,
  position INT NOT NULL DEFAULT 0,
  published TINYINT(1) NOT NULL DEFAULT 1,
  legacy_url VARCHAR(255) NOT NULL DEFAULT '',
  image VARCHAR(255) NOT NULL DEFAULT '',
  image_width INT NOT NULL DEFAULT 0,
  image_height INT NOT NULL DEFAULT 0,
  second_image VARCHAR(255) NULL,
  second_image_width INT NULL,
  second_image_height INT NULL,
  name_en VARCHAR(200) NOT NULL,
  name_fr VARCHAR(200) NOT NULL,
  category_label_en VARCHAR(200) NOT NULL DEFAULT '',
  category_label_fr VARCHAR(200) NOT NULL DEFAULT '',
  overview_en TEXT NOT NULL,
  overview_fr TEXT NOT NULL,
  legacy_context_en TEXT NOT NULL,
  legacy_context_fr TEXT NOT NULL,
  image_alt_en VARCHAR(300) NOT NULL DEFAULT '',
  image_alt_fr VARCHAR(300) NOT NULL DEFAULT '',
  second_image_alt_en VARCHAR(300) NULL,
  second_image_alt_fr VARCHAR(300) NULL,
  highlights_en JSON NOT NULL,
  highlights_fr JSON NOT NULL,
  how_it_works_en TEXT NULL,
  how_it_works_fr TEXT NULL,
  specs_note_en TEXT NULL,
  specs_note_fr TEXT NULL,
  specs_en JSON NULL,
  specs_fr JSON NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hero_slides (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  position INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  image VARCHAR(255) NOT NULL,
  image_alt_en VARCHAR(300) NOT NULL DEFAULT '',
  image_alt_fr VARCHAR(300) NOT NULL DEFAULT '',
  eyebrow_en VARCHAR(200) NOT NULL DEFAULT '',
  eyebrow_fr VARCHAR(200) NOT NULL DEFAULT '',
  title_en VARCHAR(200) NOT NULL,
  title_fr VARCHAR(200) NOT NULL,
  body_en TEXT NOT NULL,
  body_fr TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  locale CHAR(2) NOT NULL DEFAULT 'en',
  name VARCHAR(200) NOT NULL,
  email VARCHAR(254) NOT NULL,
  organization VARCHAR(200) NOT NULL DEFAULT '',
  subject VARCHAR(200) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  read_at TIMESTAMP NULL,
  INDEX idx_inquiries_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS site_content (
  content_key VARCHAR(120) NOT NULL PRIMARY KEY,
  value_en MEDIUMTEXT NULL,
  value_fr MEDIUMTEXT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Maps a cropped image (path used on the site) to the uncropped original it was cut from,
-- so the admin can re-crop later without losing quality.
CREATE TABLE IF NOT EXISTS image_sources (
  path VARCHAR(255) NOT NULL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
