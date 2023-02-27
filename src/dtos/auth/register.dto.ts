import { z } from "zod";

export const SignupFormBody = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type SignupFormDto = z.infer<typeof SignupFormBody>;
