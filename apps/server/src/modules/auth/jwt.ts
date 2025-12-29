import { env } from "@pm/env/server";
import { decode, sign, verify } from "hono/jwt";

interface JwtSignPayload {
  userId: string;
  userRole: string;
}

class JWT {
  SECRET: string;

  constructor() {
    console.log(env);

    this.SECRET = env.JWT_SECRET;
  }

  sign(payload: JwtSignPayload) {
    const jwtPayload = {
      sub: payload.userId,
      role: payload.userRole,
    };

    return sign(jwtPayload, this.SECRET);
  }

  async verify(token: string): Promise<{
    sub: string;
    role: string;
  }> {
    const d = await verify(token, this.SECRET);
    return d as {
      sub: string;
      role: string;
    };
  }

  static decode(token: string) {
    return decode(token);
  }
}

export { JWT };
