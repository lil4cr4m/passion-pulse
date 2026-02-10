-- ===========================================================================
-- 1. EXTENSIONS & INITIAL CONFIG
-- ===========================================================================
-- pgcrypto is essential for gen_random_uuid() and internal hashing functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone to Singapore (matches your original requirement)
ALTER DATABASE passion_pulse_db SET timezone TO 'Asia/Singapore';

-- ===========================================================================
-- 2. CLEANUP
-- ===========================================================================
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS gratitude_notes CASCADE;
DROP TABLE IF EXISTS pulses CASCADE;
DROP TABLE IF EXISTS user_interests CASCADE;
DROP TABLE IF EXISTS interests CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===========================================================================
-- 3. CORE TABLES
-- ===========================================================================

-- USERS: Stores identity and community "Karma" (Social Currency)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL CHECK (char_length(username) >= 3),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(100),
    bio TEXT,
    karma INT DEFAULT 0, -- Requirement 1.6: Social Currency
    role VARCHAR(10) DEFAULT 'member' CHECK (role IN ('member', 'admin')), -- Requirement 1.3
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REFRESH_TOKENS: Supports Requirement 1.4 (Secure Authentication)
-- Allows users to stay logged in without frequent password re-entry
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INTERESTS: The "Vibe Catalog"
CREATE TABLE interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    vibe_category VARCHAR(50) NOT NULL -- e.g., 'Garden Hackers', 'Code Poets'
);

-- USER_INTERESTS: Persistent vibes pinned to a user profile (Many-to-Many)
CREATE TABLE user_interests (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest_id UUID REFERENCES interests(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, interest_id)
);

-- PULSES: The "Live Now" skill signals (Requirement 1.6 & 1.7)
CREATE TABLE pulses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest_id UUID REFERENCES interests(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    meeting_link TEXT NOT NULL, -- External link (Requirement 1.1)
    is_live BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GRATITUDE_NOTES: The social feedback loop
CREATE TABLE gratitude_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pulse_id UUID REFERENCES pulses(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================================================
-- 4. TRIGGERS & BUSINESS LOGIC
-- ===========================================================================

-- AUTOMATED TIMESTAMPS: Updates 'updated_at' on every row change
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER tr_update_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER tr_update_pulses BEFORE UPDATE ON pulses FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- KARMA TRIGGER: Automatically rewards pulse creators when they receive gratitude
CREATE OR REPLACE FUNCTION award_karma() RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET karma = karma + 10 
    WHERE id = (SELECT creator_id FROM pulses WHERE id = NEW.pulse_id);
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER tr_after_gratitude 
AFTER INSERT ON gratitude_notes 
FOR EACH ROW EXECUTE FUNCTION award_karma();