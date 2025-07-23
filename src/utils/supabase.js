import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  const options = {};

  if (supabaseAccessToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, options);
  return supabase;
};

export default supabaseClient;
export { supabaseUrl };
