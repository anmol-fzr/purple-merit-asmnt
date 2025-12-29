import { z } from "zod";

const userSchema = z.object({
  fullName: z.string().max(20),
  status: z.enum(["active", "inactive"]),
  email: z.email().toLowerCase(),
  password: z.string().min(5).max(21),
});

export const updateUserSchema = userSchema
  .partial()
  .transform((obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)),
  );
