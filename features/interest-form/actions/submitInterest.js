'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateInterestForm } from '@/lib/validations';

export async function submitInterest(formData) {
  // 1. Validate on server
  const validation = validateInterestForm(formData);
  if (!validation.success) {
    return {
      success: false,
      message: 'Please fill in all required fields correctly.',
      errors: validation.errors,
    };
  }

  const { data } = validation;
  const supabase = await createSupabaseServerClient();

  // 2. Verify trip exists and is active
  const { data: trip, error: tripError } = await supabase
    .from('trips')
    .select('id, name, active')
    .eq('id', data.trip_id)
    .eq('active', true)
    .maybeSingle();

  if (tripError || !trip) {
    return {
      success: false,
      message: 'The selected trip is currently not available. Please pick an active trip.',
      errors: { trip_id: 'Trip is not available.' },
    };
  }

  // 3. Insert record into database
  const { error: insertError } = await supabase.from('trip_interests').insert({
    teacher_name: data.teacher_name,
    school_name: data.school_name,
    email: data.email,
    phone: data.phone,
    trip_id: data.trip_id,
    number_of_students: data.number_of_students,
  });

  if (insertError) {
    console.error('Error saving interest submission:', insertError.message);
    return {
      success: false,
      message: 'Failed to submit interest. Please try again later.',
    };
  }

  return {
    success: true,
    message: `Thank you! Your interest in ${trip.name} has been recorded. Our team will contact you soon.`,
  };
}

