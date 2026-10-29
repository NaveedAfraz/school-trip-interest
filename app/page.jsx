import { createSupabaseServerClient } from '@/lib/supabase/server';
import LandingPage from '@/features/trips/components/LandingPage';
import { SAMPLE_TRIPS } from '@/features/trips/data/sampleTrips';
import { unpackTrip } from '@/lib/tripMetadata';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const { data: dbTrips, error } = await supabase
    .from('trips')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.warn('[Notice] Supabase trips table not yet initialized, using sample trips.');
  }

  // Merge database records with visual presentation metadata (images, highlights, cohort specs)
  const safeTrips = (dbTrips && dbTrips.length > 0 ? dbTrips : SAMPLE_TRIPS).map((raw) => {
    const t = unpackTrip(raw);
    const fallback = SAMPLE_TRIPS.find((s) => s.slug === t.slug || s.name === t.name) || {};
    return {
      ...fallback,
      ...t,
      image_url: t.image_url || fallback.image_url,
      highlights: t.highlights && t.highlights.length > 0 ? t.highlights : fallback.highlights,
      target_grades: t.target_grades || fallback.target_grades,
      group_size: t.group_size || fallback.group_size,
    };
  });

  // Check if current visitor has an active authenticated session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let adminProfile = null;
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role, email')
      .eq('id', user.id)
      .maybeSingle();
    adminProfile = profile;
  }

  const currentUser = user
    ? {
        id: user.id,
        email: adminProfile?.email || user.email || '',
        role: adminProfile?.role || 'user',
        isAdmin: adminProfile?.role === 'admin',
      }
    : null;

  return <LandingPage trips={safeTrips} currentUser={currentUser} />;
}
