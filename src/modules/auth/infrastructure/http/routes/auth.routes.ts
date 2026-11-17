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

  router.get("/protected", authMiddleware.validate, (_req, res) => {
    res.json({
      message: "You have access to this protected route",
    });
  });

  return router;
};
