// src/lib/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

// En una aplicación React con Vite, las variables de entorno deben tener el prefijo VITE_
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;
console.log("Supabase URL:", supabaseUrl);

// Verifica que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is not defined. Please check your environment variables."
  );
}

// Crea y exporta el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
