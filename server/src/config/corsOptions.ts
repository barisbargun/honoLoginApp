import { Context } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';


const corsOptions = () =>
  cors({
    origin: (origin, c: Context<{ Bindings: Bindings }>) => {
      if(c.env.NODE_ENV == "dev") return origin;
      if(!origin) throw new HTTPException(502, { message: 'NOT ALLOWED BY CORS', cause: "CORS" })
      return c.env.CLIENT_URL;
    },
    allowMethods: ['POST', 'GET', 'OPTIONS', "PATCH", "DELETE"],
    credentials: true,
  })


export default corsOptions;