import { Context } from "hono";

export const setRole = async (c: Context) => {
  try {
    const { name } = await c.req.json();
    if (!name) return c.json({ error: "Name is required" }, 423);

    const roles = c.get("supabase").from("roles");

    const count = (await roles.select("id")).data?.length || 0;
    if (count >= 5) return c.json({ message: "You can't have more than 5 roles" }, 400);

    const { error, status } = await roles.insert({ name });

    if (status === 409) return c.json({ message: "Role already exists" }, 409);
    if (error) return c.json({ error }, 500);

    return c.json({ message: "Role created" }, 200);
  } catch (error) {
    return c.json({ message: error }, 500);
  }
}