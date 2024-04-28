import { Hono } from 'hono'
import { SupabaseClient } from "@supabase/supabase-js";
import dbConnect from '@/config/dbConnect';
import routes from './routes';
import { corsOptions } from './config';

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient<any, "public", any>;
    user: ITokenSub;
  }
}
const app = new Hono<{ Bindings: Bindings }>()

app.use("*",corsOptions());

app.use(dbConnect);
app.route("/", routes)

export default app;