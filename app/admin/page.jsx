import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import AdminDashboard from '@/features/admin/components/AdminDashboard';
import { SAMPLE_TRIPS } from '@/features/trips/data/sampleTrips';
import { unpackTrip } from '@/lib/tripMetadata';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Verify user session
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect('/admin/login');
  }

  // 2. Check admin role in public.users table
  const { data: profile } = await supabase
    .from('users')
    .select('role, email')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin') {
    redirect('/admin/login');
  }

  // 3. Fetch all trips
  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .order('display_order', { ascending: true });

  const safeTrips = (trips && trips.length > 0 ? trips : SAMPLE_TRIPS).map((raw) => {
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

  // 4. Fetch all submissions
  const { data: submissions } = await supabase
    .from('trip_interests')
    .select(`
      id, teacher_name, school_name, email, phone,
      trip_id, number_of_students, created_at,
      trips ( id, name, destination )
    `)
    .order('created_at', { ascending: false });

  return (
    <AdminDashboard
      adminEmail={profile.email || user.email || ''}
      trips={safeTrips}
      allSubmissions={submissions || []}
    />
  );
}
