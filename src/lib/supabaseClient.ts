// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Para Next.js, usar las variables NEXT_PUBLIC_ que ya tienes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key exists:", !!supabaseAnonKey);

// Verifica que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is not defined. Please check your environment variables."
  );
}

// Crea y exporta el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;