import { string, z } from "zod";
import { ExpressRequestSchema, TypedRequest } from "./expressRequest";

export const registerSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    username: string(),
    email: string().email(),
    password: string()
      .min(6)
      .refine(
        // Password must contain at least one uppercase letter, one lowercase letter, and one number
        (password) => {
          return (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password)
          );
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
      ),
  }),
  queryParamsSchema: z.object({}),
});

export type RegisterRequest = TypedRequest<typeof registerSchema>;