import { Hono } from "hono";
import { User } from "@pm/db";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import { env } from "@pm/env/server";
import { updateUserSchema } from "@/modules/user/schema";
import { Password } from "../password";

const passwdHelper = new Password();

const userProfileRouter = new Hono();

function cleanUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

userProfileRouter
  .use(
    jwt({
      secret: env.JWT_SECRET,
    }),
  )
  .get("/", async (c) => {
    const { sub: userId } = c.get("jwtPayload");

    const user = await User.findById(userId).exec();

    if (user === null) {
      return c.json(
        {
          error: "Unauthorized",
          message: "Unauthorized",
        },
        401,
      );
    }

    return c.json({ data: user });
  });
// .patch("/", zValidator("json", updateUserSchema), async (c) => {
//   const { sub: userId } = c.get("jwtPayload");
//   const body = c.req.valid("json");
//
//   const update: Record<string, unknown> = {};
//
//   if (body.fullName !== undefined) {
//     update.fullName = body.fullName;
//   }
//
//   if (body.status !== undefined) {
//     update.status = body.status;
//   }
//
//   if (body.email !== undefined) {
//     update.email = body.email.toLowerCase();
//   }
//
//   if (body.password !== undefined) {
//     update.password = await passwdHelper.hash(body.password);
//   }
//
//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $set: update },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//
//   if (!user) {
//     return c.json(
//       {
//         data: null,
//         message: "User doesn't exist",
//       },
//       400,
//     );
//   }
//
//   return c.json({
//     data: user,
//   });
// });

export { userProfileRouter };
