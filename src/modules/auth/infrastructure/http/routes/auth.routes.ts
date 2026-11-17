import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller.js";
import type { AuthMiddleware } from "../middlewares/auth.middleware.js";

export const createAuthroutes = (
  controller: AuthController,
  authMiddleware: AuthMiddleware,
): Router => {
  const router = Router();

  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.get("/me", authMiddleware.validate, controller.getCurrentUser);

  return router;
};
