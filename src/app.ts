import { GetCurrentUserUseCase } from "./modules/auth/application/use-cases/get-current-user.use-case.js";
import { LoginUserUseCase } from "./modules/auth/application/use-cases/login-user.use-case.js";
import { RegisterUserUseCase } from "./modules/auth/application/use-cases/register-user.use-case.js";
import { AuthController } from "./modules/auth/infrastructure/http/controllers/auth.controller.js";
import { AuthMiddleware } from "./modules/auth/infrastructure/http/middlewares/auth.middleware.js";
import { createAuthroutes } from "./modules/auth/infrastructure/http/routes/auth.routes.js";
import { MongoAuthRepository } from "./modules/auth/infrastructure/repositories/mongo-auth.repository.js";
import { BcryptPasswordHasher } from "./modules/auth/infrastructure/security/bcrypt-password-hasher.service.js";
import { JwtTokenService } from "./modules/auth/infrastructure/security/jwt-token.service.js";
import { createServer } from "./server.js";
import { envs } from "./shared/config/envs.js";
import { MongoDatabase } from "./shared/database/mongo.database.js";

const bootstrap = async (): Promise<void> => {
  await MongoDatabase.connect({
    uri: envs.MONGO_URI,
    databaseName: envs.MONGO_DB_NAME,
  });

  const app = createServer();

  // Inyección de dependencias
  const passwordHasher = new BcryptPasswordHasher();
  const tokenService = new JwtTokenService();

  const authRepository = new MongoAuthRepository(passwordHasher);

  const registerUserUseCase = new RegisterUserUseCase(
    authRepository,
    tokenService,
  );

  const loginUserUseCase = new LoginUserUseCase(authRepository, tokenService);

  const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

  const authController = new AuthController(
    registerUserUseCase,
    loginUserUseCase,
    getCurrentUserUseCase,
  );

  const authMiddleware = new AuthMiddleware(tokenService);

  app.use("/api/auth", createAuthroutes(authController, authMiddleware));

  app.listen(envs.PORT, () => {
    console.log(`Server running on http://localhost:${envs.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Application failed to start", error);
  process.exit(1);
});
