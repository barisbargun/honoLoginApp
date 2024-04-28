import { makeJWTCookie } from "@/config/cookieOptions";
import { verifyPassword } from "@/config/encodePassword";
import { createToken } from "@/config/jwtToken";
import { tokenExpireConfig } from "@/constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Context } from "hono";

const authController = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) return c.json({ message: "Username and password are required" }, 423);

    const db = c.get("supabase").from("users");

    const { data, error } =
      await db.select().eq("username", username).single() as
      { data: IUser, error: PostgrestError | null };

    if (!data) return c.json({ message: "User not found" }, 403);
    if (error) return c.json({ message: error.message }, 500);

    const storedHash = data.password;
    const isValid = await verifyPassword(storedHash, password);
    if (!isValid) return c.json({ message: "Invalid password" }, 401);

    const refreshToken = await createToken({ username: data.username }, c.env.REFRESH_TOKEN_SECRET, tokenExpireConfig.refreshToken);
    makeJWTCookie(c, refreshToken);
    
    const accessToken = await createToken({ username: data.username, role: Number(data.role_id) }, c.env.ACCESS_TOKEN_SECRET, tokenExpireConfig.accessToken);

    await db.update({ refresh_token: refreshToken }).eq("username", data.username);

    return c.json({ refreshToken: refreshToken, accessToken: accessToken }, 200);
  } catch (error: any) {
    console.log(error);
    return c.json({ message: error }, 400);
  }
}

export default authController;