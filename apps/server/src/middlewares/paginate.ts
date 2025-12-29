import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import * as z from "zod";

const { createMiddleware } = createFactory<{
  Variables: {
    paginate: z.infer<typeof queryParamSchema> & { offset: number };
  };
}>();

interface GetPaginateResPayload {
  total: number;
  offset?: number;
  limit?: number;
}

export function getPaginateRes({
  total,
  offset = 0,
  limit = 10,
}: GetPaginateResPayload) {
  const hasMore = offset + limit < total;
  const nextPage = hasMore ? offset + limit + 1 : null;

  return { total, hasMore, nextPage };
}

export const paginate = createMiddleware(async (c, next) => {
  const queryParams: z.infer<typeof queryParamSchema> = c.req.valid("query");

  const offset =
    (Number(queryParams.page ?? 1) - 1) * (queryParams.limit ?? 10);

  c.set("paginate", { ...queryParams, offset });
  await next();
});

export const queryParamSchema = z.object({
  limit: z.coerce
    .number()
    .describe("The number of users to return")
    .optional()
    .default(10),
  page: z
    .string()
    .describe("The page to start from")
    .or(z.number())
    .optional()
    .default(1),
  sortBy: z.string().default("createdAt"),
  sortDirection: z
    .enum(["asc", "desc"])
    .describe("The direction to sort by")
    .default("desc"),
});
