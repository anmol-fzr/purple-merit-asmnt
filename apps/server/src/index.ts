import { env } from "@pm/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRouter } from "./modules/auth";
import { userRouter } from "./modules/user";
import { swaggerUI } from "@hono/swagger-ui";
import { jwt } from "hono/jwt";
import { connectDb, closeDbConn } from "@pm/db";
import { User } from "@pm/db/models/user.model";
import { byRole } from "./middlewares/byRole";

connectDb();

const openApiDoc = {
  openapi: "3.0.0", // This is the required version field
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for your service",
  },
  paths: {
    // Add your API paths here
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
  },
};

const app = new Hono();

app.get("/doc", (c) => c.json(openApiDoc));
app.get("/ui", swaggerUI({ url: "/doc" }));

app.use(logger());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app
  .route("/auth", authRouter)
  .use(
    jwt({
      secret: env.JWT_SECRET,
    }),
  )
  .use(byRole("admin"))
  .route("/users", userRouter)
  .get("/health", async (c) => {
    return c.text("OK!");
  });

(["SIGINT", "SIGTERM", "SIGUSR2"] as const).forEach((signal) => {
  process.on(signal, closeDbConn);
});

export default app;
