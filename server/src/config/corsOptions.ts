import { Context } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';


const corsOptions = () =>
  cors({
    origin: (origin, c: Context<{ Bindings: Bindings }>) => {
      if(!origin && c.env.NODE_ENV != "dev") throw new HTTPException(502, { message: 'NOT ALLOWED BY CORS', cause: "CORS" })
      return origin == "http://localhost:5173" ? origin : c.env.CLIENT_URL;
    },
    allowMethods: ['POST', 'GET', 'OPTIONS', "PATCH", "DELETE"],
    credentials: true,
  })


export default corsOptions;