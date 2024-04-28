import { Context } from "hono";

export const employeeList = async (c: Context) => {
  const { data, error } = await c.get("supabase").from("employees").select("*");
  if (error) return c.json({ message: error.message }, 400);
  return c.json(data, 200);
}

export const employeeCreate = async (c: Context) => {
  try {
    const { name, email } = await c.req.json();
    if (!name) return c.json({ error: "Name is required" }, 423);

    const employees = c.get("supabase").from("employees");

    const count = (await employees.select("id")).data?.length || 0;
    if (count >= 10) return c.json({ message: "You can't have more than 10 employees" }, 400);

    const { error, status } = await employees.insert({ name, email });
    if (status === 409 || error) return c.json({ message: error?.message || "Employee already exists" }, 409);

    return c.json({ message: "Employee created" }, 200);
  } catch (error: any) {
    return c.json({ message: error }, 500);
  }
}

export const employeeDelete = async (c: Context) => {
  try {
    const id = c.req.param('id')
    if (!id) return c.json({ error: "Id is required" }, 423);

    const { error, status } = await c.get("supabase").from("employees").delete().eq("id", id);
    if (status === 409 || error) return c.json({ message: error?.message || "An error happened" }, 409);
    console.log(status);
    return c.json({ message: "Employee deleted" }, 200);
  } catch (error: any) {
    return c.json({ message: error }, 400);
  }
}