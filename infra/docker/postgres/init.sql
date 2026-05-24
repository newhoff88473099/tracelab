-- TraceLab AI — PostgreSQL Initialization Script
-- Runs once when the container first starts.
-- Actual schema is managed by Prisma migrations (Phase 2).

-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Fuzzy text search
CREATE EXTENSION IF NOT EXISTS "btree_gin";      -- GIN index for composite queries

-- Create enum types (mirrors Prisma schema — Phase 2 will use Prisma migrations)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'lab_manager', 'analyst', 'viewer');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sample_status') THEN
        CREATE TYPE sample_status AS ENUM (
            'received', 'in_analysis', 'pending_review',
            'approved', 'rejected', 'archived'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'analysis_status') THEN
        CREATE TYPE analysis_status AS ENUM ('draft', 'completed', 'validated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_channel') THEN
        CREATE TYPE notification_channel AS ENUM ('whatsapp', 'email', 'push');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_status') THEN
        CREATE TYPE notification_status AS ENUM ('queued', 'sent', 'failed');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_format') THEN
        CREATE TYPE report_format AS ENUM ('pdf', 'xlsx');
    END IF;
END$$;
