import { createClient } from '@supabase/supabase-js';
// These can come from your .env file const SUPABASE_URL = process.env.SUPABASE_URL!;const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);