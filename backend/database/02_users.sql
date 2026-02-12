-- SEED: User Profiles
-- Using placeholders for password_hash; in a real app, these would be bcrypt hashes.
INSERT INTO users (username, email, password_hash, name, bio, credit) VALUES 
('brutal_builder', 'alex@skillcast.com', 'hash_123', 'Alex Rivera', 'Design engineer obsessed with high-contrast UI.', 250),
('code_caster', 'dev_j@skillcast.com', 'hash_123', 'Jordan Tech', 'Full-stack developer teaching modern web.', 180),
('film_fanatic', 'sam@skillcast.com', 'hash_123', 'Sam Visuals', 'Capturing the city one frame at a time.', 95),
('green_thumb', 'grow@skillcast.com', 'hash_123', 'Casey Green', 'Urban gardener turning balconies into jungles.', 40),
('pixel_purist', 'pixel@skillcast.com', 'hash_123', 'Dana Dot', 'Illustrator and icon designer.', 120),
('chef_noir', 'kitchen@skillcast.com', 'hash_123', 'Marco Pierre', 'Experimental vegan cooking.', 65),
('sys_admin', 'root@skillcast.com', 'hash_123', 'Root User', 'Infrastructure and security specialist.', 300);