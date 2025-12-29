import { z } from "zod";

const signUpSchema = z.object({
  fullName: z.string().max(20),
  email: z.email().toLowerCase(),
  password: z.string().min(5).max(21),
});

const signInSchema = signUpSchema.pick({ email: true, password: true });

export { signUpSchema, signInSchema };
