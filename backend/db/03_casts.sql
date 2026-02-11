-- SEED: Live and Past Casts
INSERT INTO casts (creator_id, skill_id, title, description, meeting_link, is_live) VALUES 
(
  (SELECT id FROM users WHERE username = 'brutal_builder'),
  (SELECT id FROM skills WHERE name = 'Neo-Brutalist UI'),
  'BRUTAL_UI_LIVE_WORKSHOP',
  'Building high-contrast interfaces with thick borders.',
  'https://meet.skillcast.com/brutal-workshop',
  true
),
(
  (SELECT id FROM users WHERE username = 'code_caster'),
  (SELECT id FROM skills WHERE name = 'Advanced PostgreSQL'),
  'DEEP_DIVE_INTO_INDEXING',
  'Making your queries lightning fast with proper indexing.',
  'https://meet.skillcast.com/db-mastery',
  true
),
(
  (SELECT id FROM users WHERE username = 'green_thumb'),
  (SELECT id FROM skills WHERE name = 'Urban Gardening'),
  'WINTER_PROOF_YOUR_BALCONY',
  'Keep your plants alive during the cold months.',
  'https://meet.skillcast.com/garden-cast',
  true
),
(
  (SELECT id FROM users WHERE username = 'chef_noir'),
  (SELECT id FROM skills WHERE name = 'Plant-Based Cooking'),
  'UMAMI_WITHOUT_MEAT',
  'Mastering plant-based broth and ferments.',
  'https://meet.skillcast.com/vegan-chef',
  false
),
(
  (SELECT id FROM users WHERE username = 'pixel_purist'),
  (SELECT id FROM skills WHERE name = 'Figma Workflow Pro'),
  'AUTO_LAYOUT_FOR_DEVS',
  'How to hand off Figma files that actually make sense.',
  'https://meet.skillcast.com/figma-pro',
  true
),
(
  (SELECT id FROM users WHERE username = 'sys_admin'),
  (SELECT id FROM skills WHERE name = 'Docker Containerization'),
  'DOCKER_COMPOSE_MADE_EASY',
  'Stop installing things locally. Use containers.',
  'https://meet.skillcast.com/docker-live',
  false
);