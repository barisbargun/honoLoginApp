import authController from "@/controllers/token/authController";
import refreshController from "@/controllers/token/refreshController";
import { employeeCreate, employeeDelete, employeeList } from "@/controllers/employeeController";
import { userRegister } from "@/controllers/userController";
import { Hono } from "hono";
import { verifyAdminRole, verifyJWT, verifyUserRole } from "@/middlewares";
import { setRole } from "@/controllers/roleController";

const routes = new Hono<{ Bindings: Bindings }>();


/**
 * 
 * Middleware test routes
 * 
 */
routes
  .post("/test_verifyJWT", verifyJWT, (c) => c.json({ message: "OK" }, 200))
  .post("/test_verifyRole", verifyJWT, verifyAdminRole, (c) => c.json({ message: "OK" }, 200))


  /**
   * 
   * Auth routes
   * 
   */

  .post("/auth", authController)
  .get("/refresh", refreshController)


  /**
   * 
   * Role routes
   * 
   */
  .post("/role", setRole)


  /**
   * 
   * User routes
   * 
   */
  .post("/user", userRegister)


  /**
   * 
   * Employee routes
   * 
   */

  .all("/employee/*", verifyJWT)
  .get("/employee", verifyUserRole, employeeList)
  .post("/employee", verifyAdminRole, employeeCreate)
  .delete("/employee/:id", verifyAdminRole, employeeDelete)

export default routes;