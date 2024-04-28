import { createMiddleware } from "hono/factory";
import { verifyToken } from "@/config";
import { HonoContext } from "@/types/honoContext";
import { ROLE_LIST } from "@/constants/enum";
import { Next } from "hono";
import { hasEnumList } from "@/lib";

const verifyRoles = async (c: HonoContext, next: Next, selectedRole: ROLE_LIST) => {
  try {
    const { role } = c.get("user");
    if (!role || !hasEnumList(role, ROLE_LIST)) return c.json({ message: "Invalid role" }, 400);
    if (role <= selectedRole) {
      await next();
    } else {
      return c.json({ message: "You don't have permission for this role" }, 401);
    }
  } catch (error) {
    return c.json({ message: error }, 500);
  }
}

export const verifyAdminRole = createMiddleware(async (c: HonoContext, next) => {
  return await verifyRoles(c, next, ROLE_LIST.ADMIN);
});

export const verifyEditorRole = createMiddleware(async (c: HonoContext, next) => {
  return await verifyRoles(c, next, ROLE_LIST.EDITOR);
});

export const verifyUserRole = createMiddleware(async (c: HonoContext, next) => {
  return await verifyRoles(c, next, ROLE_LIST.USER);
});