
-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings Table
-- Stores the single configuration row for the website
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    translations JSONB DEFAULT '{}', -- Stores nested JSON for ID/EN
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    logo_url TEXT,
    favicon_url TEXT,
    hero_image_url TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    appointment_template TEXT,
    default_language VARCHAR(10) DEFAULT 'id',
    theme_color VARCHAR(50),
    font_family VARCHAR(50),
    stats JSONB DEFAULT '{}', -- Stores yearsExperience, specialistDoctors, etc.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initialize with one default row (Application logic should ensure only one row exists)
INSERT INTO site_settings (name, tagline, email) VALUES ('Klinik Mitra Medika', 'Mitra Kesehatan Terpercaya Anda', 'contact@mitramedika.co.id');

-- 2. Admin Accounts Table
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (Password: 'password' hashed with bcrypt)
-- Note: You should update this hash via the Admin Panel immediately
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@mitramedika.co.id', '$2a$12$gpk1/Z4mBOinHwfvjUV3V.us0MUen30vHAr.xDf6TlzEb3.8rS44u');

-- 3. Blog Posts Table
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(100),
    category VARCHAR(100),
    cover_image_url TEXT,
    published_at DATE,
    translations JSONB DEFAULT '{}', -- Stores title/content translations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Services Table
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_name VARCHAR(100),
    translations JSONB DEFAULT '{}', -- Stores title/desc translations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
