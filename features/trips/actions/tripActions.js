'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateTripForm } from '@/lib/validations';
import { packTripDescription, unpackTrip, saveTripMetadata } from '@/lib/tripMetadata';

async function verifyAdminUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin') return null;

  return user;
}

/**
 * Create a new educational trip listing
 */
export async function createTripAction(formData) {
  const supabase = await createSupabaseServerClient();
  const admin = await verifyAdminUser(supabase);

  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin credentials required to perform this action.' };
  }

  const raw = {
    name: formData.name,
    slug: formData.slug,
    destination: formData.destination,
    category: formData.category,
    duration: formData.duration,
    description: formData.description,
    image_url: formData.image_url,
    target_grades: formData.target_grades,
    group_size: formData.group_size,
    highlights: formData.highlights,
    active: formData.active !== false && formData.active !== 'false',
  };

  const validation = validateTripForm(raw);
  if (!validation.success) {
    const firstErr = Object.values(validation.errors)[0] || 'Please complete all required fields.';
    return { success: false, errors: validation.errors, message: firstErr };
  }

  const cleanDescription = packTripDescription(validation.data.description);

  const fullPayload = {
    ...validation.data,
    description: cleanDescription,
  };

  let { data, error } = await supabase
    .from('trips')
    .insert([fullPayload])
    .select()
    .maybeSingle();

  // If table lacks new columns, fall back to core columns
  if (
    error &&
    (error.message?.includes('schema cache') ||
      error.message?.includes('column') ||
      error.message?.includes('does not exist'))
  ) {
    const baseData = {
      name: validation.data.name,
      slug: validation.data.slug,
      destination: validation.data.destination,
      category: validation.data.category,
      duration: validation.data.duration,
      description: cleanDescription,
      active: validation.data.active,
    };
    const retry = await supabase.from('trips').insert([baseData]).select().maybeSingle();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'A trip with this name or slug already exists.' };
    }
    return { success: false, message: error.message || 'Failed to create trip listing in database.' };
  }

  if (!data) {
    return {
      success: false,
      message: 'Database permission denied: Please run the "Allow admin full CRUD on trips" SQL policy in your Supabase SQL Editor.',
    };
  }

  // Persist visual metadata cleanly without polluting description
  saveTripMetadata(data.id, validation.data);
  saveTripMetadata(data.slug, validation.data);
  saveTripMetadata(data.name, validation.data);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, message: `"${validation.data.name}" trip listing created successfully.`, trip: unpackTrip(data) };
}

/**
 * Update an existing trip listing
 */
export async function updateTripAction(id, formData) {
  if (!id) return { success: false, message: 'Trip ID is required for editing.' };

  const supabase = await createSupabaseServerClient();
  const admin = await verifyAdminUser(supabase);

  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin credentials required to edit listings.' };
  }

  const raw = {
    name: formData.name,
    slug: formData.slug,
    destination: formData.destination,
    category: formData.category,
    duration: formData.duration,
    description: formData.description,
    image_url: formData.image_url,
    target_grades: formData.target_grades,
    group_size: formData.group_size,
    highlights: formData.highlights,
    active: formData.active !== false && formData.active !== 'false',
  };

  const validation = validateTripForm(raw);
  if (!validation.success) {
    const firstErr = Object.values(validation.errors)[0] || 'Please complete all required fields.';
    return { success: false, errors: validation.errors, message: firstErr };
  }

  const cleanDescription = packTripDescription(validation.data.description);

  const fullPayload = {
    ...validation.data,
    description: cleanDescription,
  };

  let { data, error } = await supabase
    .from('trips')
    .update(fullPayload)
    .eq('id', id)
    .select()
    .maybeSingle();

  // If table lacks new columns, fall back to core columns
  if (
    error &&
    (error.message?.includes('schema cache') ||
      error.message?.includes('column') ||
      error.message?.includes('does not exist'))
  ) {
    const baseData = {
      name: validation.data.name,
      slug: validation.data.slug,
      destination: validation.data.destination,
      category: validation.data.category,
      duration: validation.data.duration,
      description: cleanDescription,
      active: validation.data.active,
    };
    const retry = await supabase
      .from('trips')
      .update(baseData)
      .eq('id', id)
      .select()
      .maybeSingle();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    return { success: false, message: error.message || 'Failed to update trip listing in database.' };
  }

  if (!data) {
    return {
      success: false,
      message: 'Database permission denied: Please run the "Allow admin full CRUD on trips" SQL policy in your Supabase SQL Editor.',
    };
  }

  // Persist visual metadata cleanly without polluting description
  saveTripMetadata(data.id, validation.data);
  saveTripMetadata(data.slug, validation.data);
  saveTripMetadata(data.name, validation.data);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, message: `"${validation.data.name}" updated successfully.`, trip: unpackTrip(data) };
}

/**
 * Toggle active status (publish / unpublish)
 */
export async function toggleTripStatusAction(id, currentActive) {
  if (!id) return { success: false, message: 'Trip ID is required.' };

  const supabase = await createSupabaseServerClient();
  const admin = await verifyAdminUser(supabase);

  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin credentials required.' };
  }

  const newStatus = !currentActive;

  const { data, error } = await supabase
    .from('trips')
    .update({ active: newStatus })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    return { success: false, message: error.message || 'Failed to toggle listing status.' };
  }

  if (!data) {
    return {
      success: false,
      message: 'Database permission denied: Please ensure RLS policies allow admin UPDATE on trips.',
    };
  }

  revalidatePath('/');
  revalidatePath('/admin');

  return {
    success: true,
    message: `Trip is now ${newStatus ? 'Published on Homepage' : 'Hidden as Draft'}.`,
    trip: unpackTrip(data),
  };
}

/**
 * Delete a trip listing
 */
export async function deleteTripAction(id) {
  if (!id) return { success: false, message: 'Trip ID is required.' };

  const supabase = await createSupabaseServerClient();
  const admin = await verifyAdminUser(supabase);

  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin credentials required.' };
  }

  // Check if foreign key constraint exists with trip_interests
  const { data: interests } = await supabase
    .from('trip_interests')
    .select('id')
    .eq('trip_id', id)
    .limit(1);

  if (interests && interests.length > 0) {
    // Soft delete to protect teacher registration history
    const { error: softError } = await supabase
      .from('trips')
      .update({ active: false })
      .eq('id', id);

    if (softError) {
      return { success: false, message: softError.message || 'Failed to deactivate trip.' };
    }

    revalidatePath('/');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Trip has associated teacher registrations. It has been unpublished from homepage to protect data integrity.',
    };
  }

  // Hard delete if no registrations exist
  const { error } = await supabase.from('trips').delete().eq('id', id);

  if (error) {
    return { success: false, message: error.message || 'Failed to delete trip listing.' };
  }

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, message: 'Trip listing permanently deleted.' };
}
