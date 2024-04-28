import { verifyToken, createToken } from "@/config";
import { getJWTCookie } from "@/config/cookieOptions";
import { PostgrestError } from "@supabase/supabase-js";
import { Context } from "hono";


const refreshController = async (c: Context) => {
  try {
    const refreshToken = getJWTCookie(c);
    if (!refreshToken) return c.json({ message: "Refresh token is required" }, 423);

    const verify = await verifyToken(refreshToken, c.env.REFRESH_TOKEN_SECRET)
    const tokenInfo = verify?.sub as ITokenSub;
    if (!tokenInfo) return c.json({ message: "Invalid token" }, 406);

    const db = c.get("supabase").from("users");

    const { data, error } = await db.select().eq("refresh_token", refreshToken).single() as
    { data: IUser, error: PostgrestError | null };
    if (!data) return c.json({ message: "Refresh token not found" }, 403);
    if (error) return c.json({ message: error.message }, 500);

    const isEqual = data.username == tokenInfo.username;

    if (!isEqual) return c.json({ message: "Username not found" }, 401);

    const accessToken = await createToken({ username: data.username, role: Number(data.role_id) }, c.env.ACCESS_TOKEN_SECRET, 5);

    return c.json({ accessToken: accessToken }, 200);
  } catch (error: any) {
    return c.json({ message: error }, 400);
  }
}

export default refreshController;