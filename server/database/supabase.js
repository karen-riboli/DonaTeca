import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zeshlehgfnxlbbdedcvg.supabase.co';
const supabaseKey = 'sb_publishable_mckE84CT8c5MK79SVTzEKw_-mbh3nAa';

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;