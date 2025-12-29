import { MiddlewareOrderError } from "@/utils/error";
import { createFactory } from "hono/factory";

const { createMiddleware } = createFactory();

const roles = ["user", "admin"] as const;
export type Role = (typeof roles)[number];

export const byRole = (allowedRoles: Role | Role[]) =>
  createMiddleware(async (c, next) => {
    const user = c.get("jwtPayload");

    if (user === undefined || user === null) {
      throw new MiddlewareOrderError(
        "`byRole` middleware must be used after `jwt` middleware",
      );
    }

    const role = user.role;

    if (Array.isArray(allowedRoles)) {
      if (!allowedRoles.includes(role)) {
        return c.text("Forbidden", 403);
      }
    }
    if (allowedRoles !== role) {
      return c.text("Forbidden", 403);
    }

    return next();
  });
