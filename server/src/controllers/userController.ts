import { hashPassword } from "@/config/index";
import { Context } from "hono";

export const userRegister = async (c: Context) => {
  try {
    const { username, password, role } = await c.req.json();
    if (!username || !password || !role) return c.json({ error: "Username, password and role are required" }, 423);

    const hashed = await hashPassword(password);

    const users = c.get("supabase").from("users");

    const count = (await users.select("id")).data?.length || 0;
    if (count >= 5) return c.json({ message: "You can't have more than 5 users" }, 400);

    const { error, status } = await users.insert({ username, password: hashed, role_id: role });
    if (status === 409 || error) return c.json({ message: error?.message || "Username already exists" }, 409);

    return c.json({message:"Username created"}, 200);
  } catch (error: any) {
    return c.json({message:error}, 500);
  }
}

