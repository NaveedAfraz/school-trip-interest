'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateLoginForm } from '@/lib/validations';

export async function loginAction(formData) {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validation = validateLoginForm(raw);
  if (!validation.success) {
    return { success: false, message: validation.message };
  }

  const supabase = await createSupabaseServerClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (signInError) {
    if (signInError.message.toLowerCase().includes('email not confirmed')) {
      return {
        success: false,
        message: 'Email not confirmed in Supabase yet. Run the SQL snippet to instantly confirm admin@mblearning.com.',
      };
    }
    return {
      success: false,
      message: signInError.message || 'Invalid email or password.',
    };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Authentication failed. Please try again.' };
  }

  // Check admin role in public.users
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin') {
    await supabase.auth.signOut();
    return {
      success: false,
      message: 'Access denied: account exists but does not have admin privileges in public.users.',
    };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
