import { createClient } from '@supabase/supabase-js';
import type { Actions } from '@sveltejs/kit';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          status: 400,
          errors: { message: error.message },
        };
      }

      return {
        status: 200,
        data: { message: 'Registration successful', user: data.user },
      };
    } catch (err) {
      return {
        status: 500,
        errors: { message: 'Internal server error' },
      };
    }
  },
};
