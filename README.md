# Node Auth API

API de autenticación desarrollada con Node.js, TypeScript, Express, MongoDB, Mongoose, bcrypt y JWT.

El proyecto utiliza una arquitectura limpia organizada por funcionalidad:

```text
src/
├── modules/
│   └── auth/
│       ├── domain/
│       ├── application/
│       └── infrastructure/
├── shared/
├── app.ts
└── server.ts
```

## Requisitos

- Node.js 20.6 o superior
- pnpm
- Docker y Docker Compose

## Instalación

Instala las dependencias:

```bash
pnpm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=clean-auth
JWT_SECRET=change-this-secret
```

Node.js carga este archivo mediante `process.loadEnvFile()`.

No subas `.env` al repositorio. Utiliza `.env.example` como referencia.

## MongoDB

Inicia MongoDB con Docker:

```bash
docker compose up -d
```

Comprueba el estado del contenedor:

```bash
docker compose ps
```

Para detener MongoDB:

```bash
docker compose down
```

## Ejecutar la aplicación

### Desarrollo

```bash
pnpm dev
```

### Compilar

```bash
pnpm build
```

### Producción

```bash
pnpm build
pnpm start
```

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Health check

```http
GET /health
```

Respuesta:

```json
{
  "ok": true,
  "message": "API funcionando"
}
```

### Registrar usuario

```http
POST /api/auth/register
Content-Type: application/json
```

Body:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

La contraseña se almacena utilizando bcrypt.

### Iniciar sesión

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "eyJ...",
  "user": {
    "id": "...",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "roles": ["USER_ROLE"]
  }
}
```

### Ruta protegida

```http
GET /api/auth/protected
Authorization: Bearer <token>
```

Ejemplo con `curl`:

```bash
curl http://localhost:3000/api/auth/protected \
  -H "Authorization: Bearer TU_TOKEN"
```

## Arquitectura

### Domain

Contiene las reglas y contratos del negocio:

- Entidades.
- Repositorios abstractos.
- Servicios abstractos.
- Errores de dominio.

El dominio no depende de Express, MongoDB, Mongoose, JWT ni bcrypt.

### Application

Contiene los casos de uso y los DTOs:

- Registrar usuario.
- Iniciar sesión.
- Validar datos de entrada.

Los casos de uso dependen de contratos, no de implementaciones concretas.

### Infrastructure

Contiene los detalles externos de la aplicación:

- Controladores HTTP.
- Rutas.
- Middlewares.
- Modelos de Mongoose.
- Repositorios MongoDB.
- Implementación de bcrypt.
- Implementación de JWT.

La dirección principal de dependencias es:

```text
Infrastructure → Application → Domain
```

## Inyección de dependencias

Las dependencias se ensamblan en `src/app.ts`:

```text
BcryptPasswordHasher
JwtTokenService
MongoAuthRepository
RegisterUserUseCase
LoginUserUseCase
AuthController
AuthMiddleware
```

Esto permite reemplazar implementaciones concretas sin modificar los casos de uso.

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Ejecuta la API en modo desarrollo |
| `pnpm build` | Compila TypeScript en `dist/` |
| `pnpm start` | Ejecuta la aplicación compilada |
