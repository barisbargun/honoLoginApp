import { Hono } from 'hono'
import { SupabaseClient } from "@supabase/supabase-js";
import dbConnect from '@/config/dbConnect';
import routes from './routes';
import { corsOptions } from './config';
import { rateLimiter } from './config/rateLimit';
import { csrf } from 'hono/csrf'
import csrfOptions from './config/csrfOptions';

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient<any, "public", any>;
    user: ITokenSub;
  }
}
const app = new Hono<{ Bindings: Bindings }>()

app
  .use("*", corsOptions())
  .use(csrfOptions)
  .use("*", rateLimiter)
  .use(dbConnect)
  .route("/", routes)


export default app;