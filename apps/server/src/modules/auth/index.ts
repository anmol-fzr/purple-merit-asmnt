import { Hono } from "hono";
import { User } from "@pm/db";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "./schema";
import { JWT } from "./jwt";
import { Password } from "./password";
import { userProfileRouter } from "./profile";

const jwtHelper = new JWT();
const passwdHelper = new Password();

const authRouter = new Hono();

authRouter
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const { fullName, email, password: rawPassword } = c.req.valid("json");

    try {
      const password = await passwdHelper.hash(rawPassword);
      const user = new User({ fullName, email, password, role: "admin" });

      const savedUser = await user.save();

      const token = await jwtHelper.sign({
        userRole: savedUser.role,
        userId: savedUser.id,
      });

      return c.json({ data: { token }, message: "Sign Up Successfull" });
    } catch (error) {
      if (error?.code === 11000) {
        return c.json(
          {
            message: "User with this email already exists",
          },
          400,
        );
      }
      return c.json(
        {
          message: "Something went wrong",
        },
        500,
      );
    }
  })
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const body = c.req.valid("json");

    const foundUser = await User.where({
      email: body.email,
    }).findOne();

    if (foundUser === null) {
      return c.json(
        {
          message: "User with this email don't exists",
        },
        400,
      );
    }

    const hashedPassword = foundUser.password;
    const isSame = await passwdHelper.compare(body.password, hashedPassword);
    if (!isSame) {
      return c.json(
        {
          message: "Incorrect Password",
        },
        400,
      );
    }

    const token = await jwtHelper.sign({
      userRole: foundUser.role,
      userId: foundUser.id,
    });

    return c.json({ data: { token }, message: "Sign In Successfull" });
  })
  .route("/profile", userProfileRouter);

export { authRouter };
