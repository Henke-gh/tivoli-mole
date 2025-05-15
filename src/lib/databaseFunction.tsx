
import supabase from './supabaseClient'; 

// 1.To select data from a table
export const selectData = async (tableName: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*'); // To choose all the fields

  if (error) {
    console.error('Error selecting data:', error);
    return null;
  }

  console.log('Datos seleccionados:', data); 
  return data;
};

// 2. To insert data into a table
export const insertData = async (tableName: string, values: object[]) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert(values); 

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }

  return data;
};

// 3. Uppdate data
export const updateData = async (
  tableName: string,
  updatedValues: object,
  condition: object
) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedValues)
    .match(condition); //Uppdate with the given conditions

  if (error) {
    console.error('Error updating data:', error);
    return null;
  }

  return data;
};

// 4.Eliminate data
export const deleteData = async (tableName: string, condition: object) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .match(condition); // eliminate with the given conditions
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