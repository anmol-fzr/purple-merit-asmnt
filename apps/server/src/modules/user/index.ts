import { Hono } from "hono";
import { User } from "@pm/db";
import { zValidator } from "@hono/zod-validator";
import {
  getPaginateRes,
  paginate,
  queryParamSchema,
} from "@/middlewares/paginate";
import { updateUserSchema } from "./schema";

const userRouter = new Hono();

userRouter
  .get("/", zValidator("query", queryParamSchema), paginate, async (c) => {
    const { offset, limit } = c.get("paginate");

    const users = await User.find().skip(offset).limit(limit);
    const total = await User.countDocuments({});

    const paginate = getPaginateRes({ total, offset, limit });

    return c.json({
      paginate,
      data: users,
    });
  })
  .get("/:user_id", async (c) => {
    const userId = c.req.param("user_id");

    const user = await User.findById(userId);

    return c.json({
      data: user,
    });
  })
  .patch(
    "/:user_id",
    zValidator("json", updateUserSchema),
    // paginate,
    async (c) => {
      const userId = c.req.param("user_id");
      const body = c.req.valid("json");

      const user = await User.findByIdAndUpdate(userId, body, { new: true });
      if (!user) {
        return c.json(
          {
            data: null,
            message: "User doesn't exists",
          },
          400,
        );
      }

      return c.json({
        data: user,
      });
    },
  );

export { userRouter };
