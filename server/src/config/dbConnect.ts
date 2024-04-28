import { HonoContext } from '@/types/honoContext';
import { createClient } from '@supabase/supabase-js';
import { Next } from 'hono';


const dbConnect = async (c: HonoContext, next: Next) => {
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
  c.set("supabase", supabase);
  await next();
}

export default dbConnect;