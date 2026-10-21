-- 002: editable page content + original files behind cropped images.
SET NAMES utf8mb4;

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
