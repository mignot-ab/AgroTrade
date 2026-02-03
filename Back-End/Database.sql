-- Create database
CREATE DATABASE IF NOT EXISTS AgroTrade;
USE AgroTrade;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    price_etb DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    description TEXT,
    category_id INT,
    is_famous TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_message_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;




INSERT INTO categories (category_name) VALUES
('Fertilizer'),
('Machinery'),
('Pesticides'),
('Livestock Products'),
('Farm Protection & Safety'),
('Post-Harvest & Storage'),
('Herbicides'),
('Seed & Seedlings');

INSERT INTO products
(product_name, price_etb, stock_quantity, category_id, is_famous, description)
VALUES
-- Fertilizer
('NPS+Zn/B Soil Blend', 4200.00, 500, 1, 1, 'Specialized Ethiopian soil-deficiency blend.'),
('Urea (Nitrogen)', 3850.00, 250, 1, 0, 'Standard nitrogen booster for cereal crops.'),
('Organic Vermicompost', 1100.00, 100, 1, 0, 'Natural nutrient-rich organic soil conditioner.'),

-- Machinery
('Massey Ferguson 200 Tractor', 1800000.00, 5, 2, 1, 'Most iconic tractor used in Ethiopia.'),
('Multi-crop Thresher', 95000.00, 15, 2, 0, 'Portable thresher for Teff and Wheat.'),
('Walk-behind Power Tiller', 130000.00, 8, 2, 0, 'Ideal for small-scale highland farming.'),

-- Pesticides
('Mancozeb Fungicide', 880.00, 200, 3, 1, 'Protects potato and tomato from blight.'),
('Malathion 50% EC', 650.00, 150, 3, 0, 'Broad-spectrum insecticide.'),
('Coffee Berry Borer Control', 1200.00, 75, 3, 0, 'Targeted coffee pest protection.'),

-- Livestock
('Borena Bull Semen/Breed', 2800.00, 1000, 4, 1, 'Elite genetics for beef production.'),
('Ethio-Chicken Feed', 1900.00, 80, 4, 0, 'High-protein poultry feed.'),
('Livestock Dewormer', 400.00, 350, 4, 0, 'Health treatment for sheep and goats.'),

-- Safety
('Heavy-Duty Rubber Boots', 950.00, 400, 5, 1, 'Durable waterproof boots for rainy season.'),
('Canvas Spraying Suit', 2400.00, 45, 5, 0, 'Chemical-resistant protective clothing.'),
('UV-Protected Shading Net', 3800.00, 20, 5, 0, 'Sun protection for nurseries.'),

-- Storage
('PICS Hermetic Bags', 160.00, 5000, 6, 1, 'Chemical-free grain storage.'),
('Improved Gotera Silo', 14000.00, 10, 6, 0, 'Enhanced traditional storage.'),
('Solar Grain Dryer', 18500.00, 5, 6, 0, 'Eco-friendly drying solution.'),

-- Herbicides
('2,4-D Selective Herbicide', 1300.00, 600, 7, 1, 'Broadleaf weed control for Teff.'),
('Glyphosate (Total Clear)', 1500.00, 120, 7, 0, 'Land clearing herbicide.'),
('Grass-Specific Herbicide', 1950.00, 85, 7, 0, 'Selective grass weed control.'),

-- Seeds
('Quncho Teff Seed', 5800.00, 150, 8, 1, 'High-yield white Teff seed.'),
('Yirgacheffe Coffee Seedlings', 85.00, 10000, 8, 0, 'Certified Arabica seedlings.'),
('Red Onion Seeds (Local)', 3100.00, 50, 8, 0, 'High-germination onion seeds.');
 
select * from products