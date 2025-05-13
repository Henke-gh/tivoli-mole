// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// En una aplicación React con Vite, las variables de entorno deben tener el prefijo VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// Verifica que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o Key no definidas. Verifica tus variables de entorno.');
}

// Crea y exporta el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;