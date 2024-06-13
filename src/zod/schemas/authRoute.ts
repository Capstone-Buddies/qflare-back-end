import { string, z } from "zod";
import { AuthenticatedTypedRequest, ExpressRequestSchema, TypedRequest } from "./expressRequest";

export const registerSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    username: z.string(),
    email: z.string().email(),
    schoolOrigin: z
      .string()
      // School origin must be in uppercase letters
      .refine((schoolOrigin) => schoolOrigin === schoolOrigin.toUpperCase(), {
        message: "School origin must be in uppercase letters",
      }),
    password: z
      .string()
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
        }
      ),
  }),
  queryParamsSchema: z.object({}),
});

export type RegisterRequest = TypedRequest<typeof registerSchema>;

export const loginSchema = new ExpressRequestSchema({
  paramsSchema: z.object({}),
  bodySchema: z.object({
    email: string().email(),
    password: string(),
  }),
  queryParamsSchema: z.object({}),
});

export type LoginRequest = TypedRequest<typeof loginSchema>;
