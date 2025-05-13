// src/lib/databaseFunction.ts
import supabase from './supabaseClient'; // Asegúrate de que el path sea correcto

// 1. Seleccionar datos
export const selectData = async (tableName: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*'); // Selecciona todos los campos

  if (error) {
    console.error('Error selecting data:', error);
    return null;
  }

  console.log('Datos seleccionados:', data); 
  return data;
};

// 2. Insertar datos
export const insertData = async (tableName: string, values: object[]) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert(values); // Inserta los valores en la tabla

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }

  return data;
};

// 3. Actualizar datos
export const updateData = async (
  tableName: string,
  updatedValues: object,
  condition: object
) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedValues)
    .match(condition); // Actualiza con las condiciones dadas

  if (error) {
    console.error('Error updating data:', error);
    return null;
  }

  return data;
};

// 4. Eliminar datos
export const deleteData = async (tableName: string, condition: object) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .match(condition); // Elimina según la condición

  if (error) {
    console.error('Error deleting data:', error);
    return null;
  }

  return data;
};
 
// STRUCTURE of the Score table
export interface Score {
    id: number;          
    created_at: string;   
    name: string;        
    score: number;        
  }