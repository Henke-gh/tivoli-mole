
import { createClient } from '@supabase/supabase-js';

// It is a React app with Vite,
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// Verify that the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o Key no definidas. Verifica tus variables de entorno.');
}

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
