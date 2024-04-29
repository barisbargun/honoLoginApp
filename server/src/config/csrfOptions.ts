import { HonoContext } from '@/types/honoContext';
import { Context, Next } from 'hono';
import { csrf } from 'hono/csrf';


const csrfOptions = async (c: HonoContext, next:Next) => {
  csrf({
    origin: c.env.NODE_ENV == "dev" ? "http://localhost:5173" : c.env.CLIENT_URL 
  })
  await next();
}

export default csrfOptions;