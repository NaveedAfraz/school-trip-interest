-- =============================================================================
-- MB School Trip Interest — Complete Database Setup
-- Run this single script in Supabase: SQL Editor -> New Query -> Run
-- =============================================================================

-- 1. USERS TABLE
-- Stores user profiles and assigns their role ('admin' or 'user').
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. TRIPS TABLE
-- Stores the educational trips shown on the homepage.
CREATE TABLE IF NOT EXISTS public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  destination text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  duration text,
  image_url text,
  target_grades text DEFAULT 'Grades 7 – 12',
  group_size text DEFAULT '15 – 45 Students',
  highlights text[] DEFAULT '{}',
  active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Upgrade existing trips tables if created earlier:
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS target_grades text DEFAULT 'Grades 7 – 12';
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS group_size text DEFAULT '15 – 45 Students';
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS highlights text[] DEFAULT '{}';

-- 3. TRIP INTERESTS TABLE
-- Stores registrations submitted by teachers from the website.
CREATE TABLE IF NOT EXISTS public.trip_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_name text NOT NULL,
  school_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  trip_id uuid NOT NULL REFERENCES public.trips(id),
  number_of_students integer NOT NULL CHECK (number_of_students > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trip_interests_created_at ON public.trip_interests (created_at DESC);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures data can only be accessed by authorized users.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read own profile"
  ON public.users FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Allow admin to read all profiles"
  ON public.users FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Allow public to view active trips"
  ON public.trips FOR SELECT
  USING (active = true);

CREATE POLICY "Allow admin full CRUD on trips"
  ON public.trips FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow public to insert interest"
  ON public.trip_interests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin to view all submissions"
  ON public.trip_interests FOR SELECT TO authenticated
  USING (public.is_admin());

-- =============================================================================
-- SAMPLE SEED DATA
-- The 3 educational school trips
-- =============================================================================

INSERT INTO public.trips (id, slug, name, destination, category, description, duration, active, display_order)
VALUES
  (
    '11111111-1111-4111-8111-111111111111',
    'singapore-stem',
    'Singapore STEM Explorer',
    'Singapore',
    'STEM',
    'An immersive sample itinerary exploring Singapore''s world-class science and technology landmarks. Students engage in interactive workshops and guided visits designed to spark curiosity in engineering, coding, and modern sciences.',
    '7 days',
    true,
    1
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'jaipur-heritage',
    'Jaipur Heritage & Culture',
    'Jaipur, India',
    'Heritage & Culture',
    'A sample cultural exploration through Rajasthan''s historic forts, palaces, and craft traditions. Designed to help students understand architecture, history, and craft heritage.',
    '8 days',
    true,
    2
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'london-universities',
    'London Universities Discovery',
    'London, United Kingdom',
    'Higher Education',
    'A sample university exploration programme featuring campus visits, open lecture experiences, and guidance sessions across London''s leading academic institutions.',
    '6 days',
    true,
    3
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  destination = EXCLUDED.destination,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration;

-- =============================================================================
-- ADMIN USER CONFIRMATION & ROLE ASSIGNMENT
-- Run this after admin@mblearning.com is registered
-- =============================================================================

-- Automatically confirms email if required
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email = 'admin@mblearning.com';

-- Automatically inserts into public.users with 'admin' role
INSERT INTO public.users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@mblearning.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

