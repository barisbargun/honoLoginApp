import { createMiddleware } from "hono/factory";
import { verifyToken } from "@/config";
import { HonoContext } from "@/types/honoContext";

const verifyJWT = createMiddleware(async (c: HonoContext, next) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) return c.json({ message: "Token not found" }, 423);

    const sub = (await verifyToken(token, c.env.ACCESS_TOKEN_SECRET))?.sub as ITokenSub

    if (!sub?.username) return c.json({ message: "Invalid token" }, 428);

    const db = c.get("supabase").from("users");

    const { data, error } = await db.select().eq("username", sub.username).single();
    if (!data) return c.json({ message: "Username not found" }, 403);
    if (error) return c.json({ message: error.message }, 500);

    c.set("user", { username: sub.username, role: sub.role });
    await next();
  } catch (error: any) {
    return c.json({ message: error }, 406);
  }

})

export default verifyJWT;